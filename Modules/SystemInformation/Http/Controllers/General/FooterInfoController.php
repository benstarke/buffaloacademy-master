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

class FooterInfoController extends Controller
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
        $footerInfos = DB::table('par_footer_info')->latest()->get();
        // Add duration field 
        $footerInfos = $footerInfos->map(function ($footerInfo) {
            $createdDate = Carbon::parse($footerInfo->created_at);
            $footerInfo->duration = $createdDate->diffForHumans();
            return $footerInfo;
        });

        return response()->json([
            'success' => true,
            'data' => $footerInfos
        ]);
    }

    public function show($id)
    {
        $footerInfo = DB::table('par_footer_info')->find($id);

        if (!$footerInfo) {
            return response()->json(['message' => 'Footer info not found'], 404);
        }

        return response()->json($footerInfo);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:par_footer_info|max:250',
            'description' => 'required|max:500',
            'year' => 'required|max:20',
            'logo' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Image uploads
        $imagePath = null;
        
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/footer');
            $imageName = uniqid() . '.' . $logo->getClientOriginalExtension();
            $logo->move($folderPath, $imageName);
            $imagePath = 'assets/uploads/footer/' . $imageName;
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
            $footerInfoId = DB::table('par_footer_info')->insertGetId([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'year' => $request->input('year'),
                'logo' => $imagePath,
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_footer_info',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($footerInfoId),
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
                'message' => 'Footer info created successfully',
                'data' => $footerInfoId,
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    public function update(Request $request, $id): JsonResponse
    {
        $footerInfo = DB::table('par_footer_info')->find($id);

        if (!$footerInfo) {
            return response()->json(['message' => 'Footer info not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:par_footer_info,title,' . $id . '|max:250',
            'description' => 'nullable|max:500',
            'year' => 'nullable|max:20',
            'logo' => 'nullable|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Image uploads
        $imagePath = null;
        
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/footer');
            $imageName = uniqid() . '.' . $logo->getClientOriginalExtension();
            $logo->move($folderPath, $imageName);
            $imagePath = 'assets/uploads/footer/' . $imageName;
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
            $previousData = (array)$footerInfo;

            // Update the record
            DB::table('par_footer_info')->where('id', $id)->update([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'year' => $request->input('year'),
                'logo'  => $imagePath,
                'updated_by' => $userEmail,
                'updated_at' => now(),
            ]);

            // Fetch updated data for audit trail
            $updatedFooterInfo = DB::table('par_footer_info')->find($id);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_footer_info',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedFooterInfo),
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
                'message' => 'Footer info updated successfully',
                'data' => $updatedFooterInfo
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    public function destroy($id): JsonResponse
    {
        $footerInfo = DB::table('par_footer_info')->find($id);

        if (!$footerInfo) {
            return response()->json(['success' => false, 'message' => 'Footer info not found'], 404);
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
            $previousData = (array)$footerInfo;

            // Audit trail logic for deletion
            DbHelper::auditTrail(
                'par_footer_info',
                'delete',
                json_encode($previousData),
                null,
                $userEmail
            );

            // Delete the footer info
            DB::table('par_footer_info')->where('id', $id)->delete();

            return response()->json(['success' => true, 'message' => 'Footer info deleted successfully'], 200);
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

        $footerInfos = DB::table('par_footer_info')->whereIn('id', $ids)->get();

        if ($footerInfos->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Footer info not found'
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

            // If email is still not found, return an error
            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Audit trail logic for deletion
            foreach ($footerInfos as $footerInfo) {
                $previousData = (array)$footerInfo;

                $auditTrailData = [
                    'table_name' => 'par_footer_info',
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
            $deletedCount = DB::table('par_footer_info')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Footer info records deleted successfully'
            ], 200);
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}
