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

class PartnersInfoController extends Controller
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
        $partnersInfos = DB::table('par_partners_info')->latest()->get();
        // Add duration field 
        $partnersInfos = $partnersInfos->map(function ($partnersInfo) {
            $createdDate = Carbon::parse($partnersInfo->created_at);
            $partnersInfo->duration = $createdDate->diffForHumans();
            return $partnersInfo;
        });

        return response()->json([
            'success' => true,
            'data' => $partnersInfos
        ]);
    }

    public function show($id)
    {
        $partnerInfo = DB::table('par_partners_info')->find($id);

        if (!$partnerInfo) {
            return response()->json(['message' => 'Partner not found'], 404);
        }

        return response()->json($partnerInfo);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:par_partners_info|max:255',
            'description' => 'nullable|max:255',
            'partner_logo_path' => 'nullable|max:500',
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

            // Insert new partner information
            $partnerInfoId = DB::table('par_partners_info')->insertGetId([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'partner_logo_path' => $request->input('partner_logo_path'),
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Fetch the newly inserted data
            $newPartnerInfo = DB::table('par_partners_info')->find($partnerInfoId);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_partners_info',
                'table_action' => 'insert',
                'prev_tabledata' => null,
                'current_tabledata' => json_encode($newPartnerInfo),
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
                'message' => 'Partner created successfully',
                'data' => $newPartnerInfo
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        // Fetch the partner info by ID
        $partnerInfo = DB::table('par_partners_info')->find($id);

        if (!$partnerInfo) {
            return response()->json(['message' => 'Partner not found'], 404);
        }

        // Validate request input
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:par_partners_info,name,' . $id . '|max:255',
            'description' => 'nullable|max:255',
            'partner_logo_path' => 'nullable|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Fetch the user email based on the user ID
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array)$partnerInfo;

            // Update the partner record
            DB::table('par_partners_info')->where('id', $id)->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'partner_logo_path' => $request->input('partner_logo_path'),
                'updated_by' => $userEmail,
                'updated_at' => now(),
            ]);

            // Fetch updated data for audit trail
            $updatedPartnerInfo = DB::table('par_partners_info')->find($id);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_partners_info',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedPartnerInfo),
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
                'message' => 'Partner updated successfully',
                'data' => $updatedPartnerInfo
            ], 200);

        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        // Fetch partner info by ID
        $partnerInfo = DB::table('par_partners_info')->find($id);

        if (!$partnerInfo) {
            return response()->json(['success' => false, 'message' => 'Partner not found'], 404);
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
            $previousData = (array)$partnerInfo;

            // Audit trail logic for deletion
            DbHelper::auditTrail(
                'par_partners_info',
                'delete',
                json_encode($previousData),
                null,
                $userEmail
            );

            // Delete the partner info
            DB::table('par_partners_info')->where('id', $id)->delete();

            return response()->json(['success' => true, 'message' => 'Partner deleted successfully'], 200);
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

        $partnerInfos = DB::table('par_partners_info')->whereIn('id', $ids)->get();

        if ($partnerInfos->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Partner info not found'
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

            // Audit trail logic for deletion
            foreach ($partnerInfos as $partnerInfo) {
                $previousData = (array)$partnerInfo;

                $auditTrailData = [
                    'table_name' => 'par_partners_info',
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

            // Delete the records and get the count of deleted records
            $deletedCount = DB::table('par_partners_info')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Partner info records deleted successfully'
            ], 200);
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}
