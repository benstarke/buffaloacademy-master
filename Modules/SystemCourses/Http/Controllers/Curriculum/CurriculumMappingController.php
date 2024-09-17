<?php

namespace Modules\SystemCourses\Http\Controllers\Curriculum;

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

class CurriculumMappingController extends Controller
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

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $mappings = DB::table('par_curriculum_mapping')->latest()->get();

        // Add duration field
        $mappings = $mappings->map(function ($mapping) {
            $createdDate = Carbon::parse($mapping->created_at);
            $mapping->duration = $createdDate->diffForHumans();
            return $mapping;
        });

        return response()->json([
            'success' => true,
            'data' => $mappings
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $mapping = DB::table('par_curriculum_mapping')
            ->join('par_users', 'par_curriculum_mapping.created_by', '=', 'par_users.id')
            ->select('par_curriculum_mapping.*', 'par_users.name_en as author')
            ->where('par_curriculum_mapping.id', $id)
            ->first();

        if (!$mapping) {
            return response()->json([
                'success' => false,
                'message' => 'Curriculum mapping not found'
            ], 404);
        }

        // Calculate the duration since the mapping was created using Carbon
        $createdDate = Carbon::parse($mapping->created_at);
        $mapping->duration = $createdDate->diffForHumans(); // Add duration field

        return response()->json([
            'success' => true,
            'data' => $mapping
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer|exists:par_courses,id',
            'course_category_id' => 'required|integer|exists:par_course_categories,id',
            'course_sub_category_id' => 'required|integer|exists:par_course_sub_categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
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

            // Insert the new curriculum mapping record
            $mappingId = DB::table('par_curriculum_mapping')->insertGetId([
                'course_id' => $request->input('course_id'),
                'course_category_id' => $request->input('course_category_id'),
                'course_sub_category_id' => $request->input('course_sub_category_id'),
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_curriculum_mapping',
                'table_action' => 'insert',
                'current_tabledata' => json_encode([
                    'id' => $mappingId,
                    'course_id' => $request->input('course_id'),
                    'course_category_id' => $request->input('course_category_id'),
                    'course_sub_category_id' => $request->input('course_sub_category_id'),
                    'created_by' => $userEmail,
                    'created_at' => now()->toDateTimeString()
                ]),
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
                'message' => 'Curriculum mapping created successfully',
                'data' => $mappingId
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
        // Fetch the current mapping record
        $mapping = DB::table('par_curriculum_mapping')->find($id);

        if (!$mapping) {
            return response()->json([
                'success' => false,
                'message' => 'Curriculum mapping not found'
            ], 404);
        }

        // Validate request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer|exists:par_courses,id',
            'course_category_id' => 'required|integer|exists:par_course_categories,id',
            'course_sub_category_id' => 'required|integer|exists:par_course_sub_categories,id',
            'updated_by' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
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

            // Store the previous data for audit trail
            $previousData = (array)$mapping;

            // Update the curriculum mapping record
            DB::table('par_curriculum_mapping')
                ->where('id', $id)
                ->update([
                    'course_id' => $request->input('course_id'),
                    'course_category_id' => $request->input('course_category_id'),
                    'course_sub_category_id' => $request->input('course_sub_category_id'),
                    'updated_by' => $request->input('updated_by', $userEmail), // Default to user email if not provided
                    'updated_at' => now(),
                ]);

            // Fetch the updated curriculum mapping data for audit trail
            $updatedMapping = DB::table('par_curriculum_mapping')->find($id);

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_curriculum_mapping',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedMapping),
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
                'message' => 'Curriculum mapping updated successfully',
                'data' => $updatedMapping
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
        // Fetch the current mapping record
        $mapping = DB::table('par_curriculum_mapping')->find($id);

        if (!$mapping) {
            return response()->json([
                'success' => false,
                'message' => 'Curriculum mapping not found'
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
            $previousData = (array)$mapping;

            $auditTrailData = [
                'table_name' => 'par_curriculum_mapping',
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

            // Delete the curriculum mapping record
            DB::table('par_curriculum_mapping')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Curriculum mapping deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }



    /**
     * Remove the specified resource from storage.
     * delete multiple records at a time
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

        $mappings = DB::table('par_curriculum_mapping')->whereIn('id', $ids)->get();

        if ($mappings->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Curriculum mappings not found'
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
            foreach ($mappings as $mapping) {
                $previousData = (array)$mapping;

                $auditTrailData = [
                    'table_name' => 'par_curriculum_mapping',
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
            $deletedCount = DB::table('par_curriculum_mapping')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Curriculum mapping(s) deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}
