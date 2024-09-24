<?php

namespace Modules\SystemInformation\Http\Controllers\General;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;
use Carbon\Carbon;

use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Exception;

class IconsInfoController extends Controller
{

    // first get the current id of the logged in user (admin/superadmin/writer) or instructor id
    private function getCurrentUserId(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            throw new \Exception('Token not provided', 401);
        }

        $payload = JWTAuth::setToken($token)->getPayload();
        return $payload['sub']; // Assuming 'sub' contains the user ID
    }


    public function index()
    {
        $iconsInfos = DB::table('par_icons')->latest()->get();
        // Add duration field 
        $iconsInfos = $iconsInfos->map(function ($iconsInfo) {
            $createdDate = Carbon::parse($iconsInfo->created_at);
            $iconsInfo->duration = $createdDate->diffForHumans();
            return $iconsInfo;
        });

        return response()->json([
            'success' => true,
            'data' => $iconsInfos
        ]);
    }

    public function show($id)
    {
        $iconInfo = DB::table('par_icons')->find($id);

        if (!$iconInfo) {
            return response()->json(['message' => 'Icon not found'], 404);
        }

        return response()->json($iconInfo);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:par_icons|max:255',
            'description' => 'nullable|max:255',
            'code' => 'nullable|max:150',
            'is_enabled' => 'nullable|max:150',
            'icon' => 'nullable|max:150',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Fetch user email from instructors or users
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Insert the new icon record
            $iconInfoId = DB::table('par_icons')->insertGetId([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'code' => $request->input('code'),
                'is_enabled' => $request->input('is_enabled'),
                'icon' => $request->input('icon'),
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_icons',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($iconInfoId),
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
                'message' => 'Icon created successfully',
                'data' => $iconInfoId
            ], 201);

        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    public function update(Request $request, $id): JsonResponse
    {
        // Fetch the existing icon info
        $iconInfo = DB::table('par_icons')->find($id);

        if (!$iconInfo) {
            return response()->json(['message' => 'Icon not found'], 404);
        }

        // Validate the request input
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:par_icons,name,' . $id . '|max:255',
            'description' => 'nullable|max:255',
            'code' => 'nullable|max:150',
            'is_enabled' => 'nullable|max:150',
            'icon' => 'nullable|max:150',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Fetch user email from either instructors or users
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array) $iconInfo;

            // Update the icon information
            DB::table('par_icons')->where('id', $id)->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'code' => $request->input('code'),
                'is_enabled' => $request->input('is_enabled'),
                'icon' => $request->input('icon'),
                'updated_by' => $userEmail,
                'updated_at' => now(),
            ]);

            // Fetch the updated icon info for audit trail
            $updatedIconInfo = DB::table('par_icons')->find($id);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_icons',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedIconInfo),
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
                'message' => 'Icon updated successfully',
                'data' => $updatedIconInfo,
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    public function destroy($id): JsonResponse
    {
        // Fetch icon info by ID
        $iconInfo = DB::table('par_icons')->find($id);

        if (!$iconInfo) {
            return response()->json(['success' => false, 'message' => 'Icon not found'], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId(request());

            // Get user email (check for instructor first, then fallback to regular user)
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array)$iconInfo;

            // Audit trail logic for deletion
            DbHelper::auditTrail(
                'par_icons',
                'delete',
                json_encode($previousData),
                null,
                $userEmail
            );

            // Delete the icon
            DB::table('par_icons')->where('id', $id)->delete();

            return response()->json(['success' => true, 'message' => 'Icon deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    public function destroyMultiple(Request $request): JsonResponse
    {
        $ids = $request->input('ids'); // Expecting an array of IDs

        // Check if the IDs array is empty or not provided
        if (empty($ids) || !is_array($ids)) {
            return response()->json([
                'success' => false,
                'message' => 'No valid IDs provided'
            ], 400);
        }

        // Fetch the icons based on the provided IDs
        $iconInfos = DB::table('par_icons')->whereIn('id', $ids)->get();

        if ($iconInfos->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Icons not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId(request());

            // Check if the user is an instructor
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');

            // If not found as an instructor, check if they are a regular user
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            // If email is still not found, return an error
            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Audit trail logic for each icon deletion
            foreach ($iconInfos as $iconInfo) {
                $previousData = (array)$iconInfo;

                $auditTrailData = [
                    'table_name' => 'par_icons',
                    'table_action' => 'delete',
                    'prev_tabledata' => json_encode($previousData),
                    'current_tabledata' => null,
                    'user_id' => $userEmail, // Use the user email for the audit trail
                ];

                DbHelper::auditTrail(
                    $auditTrailData['table_name'],
                    $auditTrailData['table_action'],
                    $auditTrailData['prev_tabledata'],
                    $auditTrailData['current_tabledata'],
                    $auditTrailData['user_id']
                );
            }

            // Delete the icons and get the count of deleted records
            $deletedCount = DB::table('par_icons')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Icon records deleted successfully'
            ], 200);
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}
