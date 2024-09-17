<?php

namespace Modules\SystemAuthentication\Http\Controllers\Setting;

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


class RoleController extends Controller
{

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
        $par_roles = DB::table('par_roles')->latest()->get();

        // Add duration field
        $par_roles = $par_roles->map(function ($role) {
            $createdDate = Carbon::parse($role->created_at);
            $role->duration = $createdDate->diffForHumans();
            return $role;
        });

        return response()->json([
            'success' => true,
            'data' => $par_roles
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $role = DB::table('par_roles')
            ->join('users', 'par_roles.created_by', '=', 'users.id')
            ->select('par_roles.*', 'users.name_en as author')
            ->where('par_roles.id', $id)
            ->first();

        if (!$role) {
            return response()->json([
                'success' => false,
                'message' => 'Role not found'
            ], 404);
        }

        // Calculate the duration since the role was created using Carbon
        $createdDate = Carbon::parse($role->created_at);
        $role->duration = $createdDate->diffForHumans(); // Add duration field

        return response()->json([
            'success' => true,
            'data' => $role
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
     
             // Validate request data
             $validator = Validator::make($request->all(), [
                 'name' => 'required|string|max:255|unique:par_roles', // Add the unique rule here
                 'identity' => 'nullable|string',
             ]);
     
             if ($validator->fails()) {
                 return response()->json(['error' => $validator->errors()], 400);
             }
     
             // Insert the role data into the table
             $roleId = DB::table('par_roles')->insertGetId([
                 'name' => $request->input('name'),
                 'identity' => $request->input('name'),
                 'created_at' => now(), // Manually set the created_at timestamp
                 'created_by' => $userEmail,
             ]);
     
             // Audit trail logic for creation
             $auditTrailData = [
                 'table_name' => 'par_roles',
                 'table_action' => 'insert',
                 'current_tabledata' => json_encode($roleId),
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
                 'message' => 'Role created successfully',
                 'data' => $roleId
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
        $blogStatus = DB::table('par_roles')->find($id);

        if (!$blogStatus) {
            return response()->json([
                'success' => false,
                'message' => 'Roles not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

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

            // Validate request data
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                // 'identity' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            // Store the previous data for audit trail
            $previousData = (array)$blogStatus;

            // Update the roles
            DB::table('par_roles')
                ->where('id', $id)
                ->update([
                    'name' => $request->input('name'),
                    'identity' => $request->input('name'),
                    'updated_by' => $userEmail,
                    'updated_at' => now(), // Manually set the updated_at timestamp
                ]);

            // Fetch the updated roles data for audit trail
            $updatedBlogStatus = DB::table('par_roles')->find($id);

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_roles',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedBlogStatus),
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
                'message' => 'Roles updated successfully',
                'data' => $updatedBlogStatus
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     * delete one record
     */
    
     public function destroy($id): JsonResponse
     {
         $role = DB::table('par_roles')->find($id);
     
         if (!$role) {
             return response()->json([
                 'success' => false,
                 'message' => 'Role not found'
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
             $previousData = (array)$role;
     
             $auditTrailData = [
                 'table_name' => 'par_roles',
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
     
             // Delete the role
             DB::table('par_roles')->where('id', $id)->delete();
     
             return response()->json([
                 'success' => true,
                 'message' => 'Role deleted successfully'
             ], 200);
         } catch (Exception $e) {
             return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
         }
     }   
     
     /**
     * Remove the specified resource from storage.
     * delete multiple records
     */
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

        $roles = DB::table('par_roles')->whereIn('id', $ids)->get();

        if ($roles->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Roles not found'
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
            foreach ($roles as $role) {
                $previousData = (array)$role;

                $auditTrailData = [
                    'table_name' => 'par_roles',
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

            // Delete the roles and get the count of deleted records
            $deletedCount = DB::table('par_roles')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Role(s) deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}
