<?php

namespace Modules\SystemInformation\Http\Controllers\About;

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

class AboutInfoController extends Controller
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
        $aboutInfos = DB::table('par_about_info')->get();
       
        // Add duration field 
        $aboutInfos = $aboutInfos->map(function ($aboutInfo) {
            $createdDate = Carbon::parse($aboutInfo->created_at);
            $aboutInfo->duration = $createdDate->diffForHumans();
            return $aboutInfo;
        });

        return response()->json([
            'success' => true,
            'data' => $aboutInfos
        ]);
    }

    public function show($id)
    {
        $aboutInfo = DB::table('par_about_info')->find($id);

        if (!$aboutInfo) {
            return response()->json(['message' => 'About info not found'], 404);
        }

        return response()->json($aboutInfo);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'about_image_path' => 'nullable|max:500',
            'title' => 'required|unique:par_about_info|max:255',
            'description' => 'required|max:500',
            'who_we_are' => 'required|max:1000',
            'our_mission' => 'required|max:1000',
            // 'created_by' => 'required|max:50',
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

            // Insert the new record
            $aboutInfoId = DB::table('par_about_info')->insertGetId([
                'about_image_path' => $request->input('about_image_path'),
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'who_we_are' => $request->input('who_we_are'),
                'our_mission' => $request->input('our_mission'),
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_about_info',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($aboutInfoId),
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
                'message' => 'About info created successfully',
                'data' => $aboutInfoId
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    public function update(Request $request, $id): JsonResponse
    {
        $aboutInfo = DB::table('par_about_info')->find($id);

        if (!$aboutInfo) {
            return response()->json(['message' => 'About info not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'about_image_path' => 'nullable|max:500',
            'title' => 'required|unique:par_about_info,title,' . $id . '|max:255',
            'description' => 'nullable|max:500',
            'who_we_are' => 'nullable|max:1000',
            'our_mission' => 'nullable|max:1000',
            // 'updated_by' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Fetch user email
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array)$aboutInfo;

            // Update the record
            DB::table('par_about_info')->where('id', $id)->update([
                'about_image_path' => $request->input('about_image_path'),
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'who_we_are' => $request->input('who_we_are'),
                'our_mission' => $request->input('our_mission'),
                'updated_by' => $userEmail,
                'updated_at' => now(),
            ]);

            // Fetch updated data for audit trail
            $updatedAboutInfo = DB::table('par_about_info')->find($id);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_about_info',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedAboutInfo),
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
                'message' => 'About info updated successfully',
                'data' => $updatedAboutInfo
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        $aboutInfo = DB::table('par_about_info')->find($id);

        if (!$aboutInfo) {
            return response()->json(['success' => false, 'message' => 'About info not found'], 404);
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
            $previousData = (array)$aboutInfo;

            // Audit trail logic for deletion
            DbHelper::auditTrail(
                'par_about_info',
                'delete',
                json_encode($previousData),
                null,
                $userEmail
            );

            // Delete the about info
            DB::table('par_about_info')->where('id', $id)->delete();

            return response()->json(['success' => true, 'message' => 'About info deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroyMultiple(Request $request): JsonResponse
    {
        $ids = $request->input('ids'); // Expecting an array of IDs

        // Validate if IDs are provided
        if (empty($ids) || !is_array($ids)) {
            return response()->json([
                'success' => false,
                'message' => 'No valid IDs provided'
            ], 400);
        }

        $aboutInfos = DB::table('par_about_info')->whereIn('id', $ids)->get();

        if ($aboutInfos->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'About info records not found'
            ], 404);
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

            // Audit trail logic for deletion
            foreach ($aboutInfos as $aboutInfo) {
                $previousData = (array)$aboutInfo;

                DbHelper::auditTrail(
                    'par_about_info',
                    'delete',
                    json_encode($previousData),
                    null,
                    $userEmail
                );
            }

            // Delete the records and get the count of deleted records
            $deletedCount = DB::table('par_about_info')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' about info records deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


}
