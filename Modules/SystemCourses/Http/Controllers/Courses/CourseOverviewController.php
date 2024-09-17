<?php

namespace Modules\SystemCourses\Http\Controllers\Courses;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;
use Carbon\Carbon;

use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Exception;

class CourseOverviewController extends Controller
{
    // Method to get the current user ID from the JWT token
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
        $overviews = DB::table('par_course_overview')->latest()->get();

        // Add duration field
        $overviews = $overviews->map(function ($overview) {
            $createdDate = Carbon::parse($overview->created_at);
            $overview->duration = $createdDate->diffForHumans();
            return $overview;
        });

        return response()->json([
            'success' => true,
            'data' => $overviews
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $overview = DB::table('par_course_overview')
                ->join('par_users', 'par_course_overview.created_by', '=', 'par_users.id')
                ->select('par_course_overview.*', 'par_users.name_en as author')
                ->where('par_course_overview.id', $id)
                ->first();

        if (!$overview) {
            return response()->json([
                'success' => false,
                'message' => 'Course overview not found'
            ], 404);
        }

        $createdDate = Carbon::parse($overview->created_at);
        $overview->duration = $createdDate->diffForHumans(); // Add duration field

        return response()->json([
            'success' => true,
            'data' => $overview
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');

            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            $overviewId = DB::table('par_course_overview')->insertGetId([
                'name' => $request->name,
                'description' => $request->description,
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_course_overview',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($overviewId),
                'user_id' => $userEmail,
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                null,
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            return response()->json([
                'success' => true,
                'message' => 'Course overview created successfully',
                'data' => $overviewId
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
        $overview = DB::table('par_course_overview')->find($id);

        if (!$overview) {
            return response()->json([
                'success' => false,
                'message' => 'Course overview not found'
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
            $previousData = (array)$overview;

            // Update course overview
            DB::table('par_course_overview')->where('id', $id)->update([
                'name' => $request->name,
                'description' => $request->description,
                'updated_by' => $userEmail,
                'updated_at' => now(),
            ]);

            // Fetch updated data for audit trail
            $updatedOverview = DB::table('par_course_overview')->find($id);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_course_overview',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedOverview),
                'user_id' => $userEmail,
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                $auditTrailData['prev_tabledata'],
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            return response()->json([
                'success' => true,
                'message' => 'Course overview updated successfully',
                'data' => $updatedOverview
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
        $overview = DB::table('par_course_overview')->find($id);

        if (!$overview) {
            return response()->json([
                'success' => false,
                'message' => 'Course overview not found'
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

            // Audit trail logic for deletion
            $previousData = (array)$overview;

            $auditTrailData = [
                'table_name' => 'par_course_overview',
                'table_action' => 'delete',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => null,
                'user_id' => $userEmail,
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                $auditTrailData['prev_tabledata'],
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            DB::table('par_course_overview')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Course overview deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove multiple records from storage.
     */
    public function destroyMultiple(Request $request): JsonResponse
    {
        $ids = $request->input('ids'); // Expecting an array of IDs

        if (empty($ids) || !is_array($ids)) {
            return response()->json([
                'success' => false,
                'message' => 'No valid IDs provided'
            ], 400);
        }

        $overviews = DB::table('par_course_overview')->whereIn('id', $ids)->get();

        if ($overviews->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Course overviews not found'
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

            // Store data for audit trail
            $previousData = $overviews->toArray();

            // Perform deletion
            DB::table('par_course_overview')->whereIn('id', $ids)->delete();

            // Audit trail logic for deletion
            $auditTrailData = [
                'table_name' => 'par_course_overview',
                'table_action' => 'delete',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => null,
                'user_id' => $userEmail,
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                $auditTrailData['prev_tabledata'],
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            return response()->json([
                'success' => true,
                'message' => 'Course overviews deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
