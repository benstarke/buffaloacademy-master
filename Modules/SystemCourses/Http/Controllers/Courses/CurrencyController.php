<?php

namespace Modules\SystemCourses\Http\Controllers\Courses;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;
use Carbon\Carbon;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;

class CurrencyController extends Controller
{
    // Get the current ID of the logged-in user (admin/superadmin/writer) or instructor ID
    private function getCurrentUserId(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            throw new \Exception('Token not provided', 401);
        }

        $payload = JWTAuth::setToken($token)->getPayload();
        return $payload['sub']; // Assuming 'sub' contains the user ID
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $currencies = DB::table('par_currency')->latest()->get();

        // Add duration field
        $currencies = $currencies->map(function ($currency) {
            $createdDate = Carbon::parse($currency->created_at);
            $currency->duration = $createdDate->diffForHumans();
            return $currency;
        });

        return response()->json([
            'success' => true,
            'data' => $currencies
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $currency = DB::table('par_currency')
            ->join('par_users', 'par_currency.created_by', '=', 'par_users.id')
            ->select('par_currency.*', 'par_users.name as author')
            ->where('par_currency.id', $id)
            ->first();

        if (!$currency) {
            return response()->json([
                'success' => false,
                'message' => 'currency not found'
            ], 404);
        }

        // Add duration field
        $createdDate = Carbon::parse($currency->created_at);
        $currency->duration = $createdDate->diffForHumans();

        return response()->json([
            'success' => true,
            'data' => $currency
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $userId = $this->getCurrentUserId($request);

            // Check if the user is an instructor
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            $currencyId = DB::table('par_currency')->insertGetId([
                'name' => $request->name,
                'description' => $request->description,
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail for insertion
            DbHelper::auditTrail(
                'par_currency',
                'insert',
                null,
                json_encode($currencyId),
                $userEmail
            );

            return response()->json([
                'success' => true,
                'message' => 'currency created successfully',
                'data' => $currencyId
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $currency = DB::table('par_currency')->find($id);

        if (!$currency) {
            return response()->json([
                'success' => false,
                'message' => 'currency not found'
            ], 404);
        }

        try {
            $userId = $this->getCurrentUserId($request);

            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array)$currency;

            // Update the currency
            DB::table('par_currency')
                ->where('id', $id)
                ->update([
                    'name' => $request->name,
                    'updated_by' => $userEmail,
                    'updated_at' => now(),
                ]);

            $updatedcurrency = DB::table('par_currency')->find($id);

            // Audit trail for update
            DbHelper::auditTrail(
                'par_currency',
                'update',
                json_encode($previousData),
                json_encode($updatedcurrency),
                $userEmail
            );

            return response()->json([
                'success' => true,
                'message' => 'currency updated successfully',
                'data' => $updatedcurrency
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $currency = DB::table('par_currency')->find($id);

        if (!$currency) {
            return response()->json([
                'success' => false,
                'message' => 'currency not found'
            ], 404);
        }

        try {
            $userId = $this->getCurrentUserId(request());

            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Audit trail for deletion
            $previousData = (array)$currency;

            DbHelper::auditTrail(
                'par_currency',
                'delete',
                json_encode($previousData),
                null,
                $userEmail
            );

            // Delete the currency
            DB::table('par_currency')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'currency deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove multiple records at once.
     */
    public function destroyMultiple(Request $request): JsonResponse
    {
        $ids = $request->input('ids');

        if (empty($ids) || !is_array($ids)) {
            return response()->json([
                'success' => false,
                'message' => 'No valid IDs provided'
            ], 400);
        }

        $currencies = DB::table('par_currency')->whereIn('id', $ids)->get();

        if ($currencies->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'currencies not found'
            ], 404);
        }

        try {
            $userId = $this->getCurrentUserId(request());

            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Audit trail for deletion
            foreach ($currencies as $currency) {
                $previousData = (array)$currency;

                DbHelper::auditTrail(
                    'par_currency',
                    'delete',
                    json_encode($previousData),
                    null,
                    $userEmail
                );
            }

            // Delete the currencies
            $deletedCount = DB::table('par_currency')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' currency(s) deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
