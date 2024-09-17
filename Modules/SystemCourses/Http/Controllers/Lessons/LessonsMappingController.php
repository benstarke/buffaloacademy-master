<?php

namespace Modules\SystemCourses\Http\Controllers\Lessons;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Renderable;
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

class LessonsMappingController extends Controller
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
        $lessonsMapping = DB::table('par_lessons_mapping')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $lessonsMapping
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $lessonMapping = DB::table('par_lessons_mapping')->find($id);

        if (!$lessonMapping) {
            return response()->json([
                'success' => false,
                'message' => 'Lesson Mapping not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $lessonMapping
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer',
            'course_category_id' => 'required|integer',
            'course_sub_category_id' => 'required|integer',
            'course_curriculum_id' => 'required|integer',
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

            // Insert the new record and get the ID
            $lessonMappingId = DB::table('par_lessons_mapping')->insertGetId([
                'course_id' => $request->input('course_id'),
                'course_category_id' => $request->input('course_category_id'),
                'course_sub_category_id' => $request->input('course_sub_category_id'),
                'course_curriculum_id' => $request->input('course_curriculum_id'),
                'created_by' => $userEmail, // Use the user email for the record
                'created_at' => now(), // Automatically set the created_at timestamp
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_lessons_mapping',
                'table_action' => 'insert',
                'current_tabledata' => json_encode([
                    'id' => $lessonMappingId,
                    'course_id' => $request->input('course_id'),
                    'course_category_id' => $request->input('course_category_id'),
                    'course_sub_category_id' => $request->input('course_sub_category_id'),
                    'course_curriculum_id' => $request->input('course_curriculum_id'),
                    'created_by' => $userEmail,
                    'created_at' => now(),
                ]),
                'user_id' => $userEmail, // Use the user email for the audit trail
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
                'message' => 'Lesson Mapping created successfully',
                'data' => $lessonMappingId
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
        // Fetch the existing lesson mapping record
        $lessonMapping = DB::table('par_lessons_mapping')->find($id);

        if (!$lessonMapping) {
            return response()->json([
                'success' => false,
                'message' => 'Lesson Mapping not found'
            ], 404);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer',
            'course_category_id' => 'required|integer',
            'course_sub_category_id' => 'required|integer',
            'course_curriculum_id' => 'required|integer',
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
            $previousData = (array)$lessonMapping;

            // Update the lesson mapping
            DB::table('par_lessons_mapping')
                ->where('id', $id)
                ->update([
                    'course_id' => $request->input('course_id'),
                    'course_category_id' => $request->input('course_category_id'),
                    'course_sub_category_id' => $request->input('course_sub_category_id'),
                    'course_curriculum_id' => $request->input('course_curriculum_id'),
                    'updated_by' => $userEmail, // Use user email for updated_by field
                    'updated_at' => now(), // Automatically set the updated_at timestamp
                ]);

            // Fetch the updated lesson mapping data for audit trail
            $updatedLessonMapping = DB::table('par_lessons_mapping')->find($id);

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_lessons_mapping',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedLessonMapping),
                'user_id' => $userEmail, // Use user email for the audit trail
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
                'message' => 'Lesson Mapping updated successfully',
                'data' => $updatedLessonMapping
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
        // Fetch the lesson mapping record
        $lessonMapping = DB::table('par_lessons_mapping')->find($id);

        if (!$lessonMapping) {
            return response()->json([
                'success' => false,
                'message' => 'Lesson Mapping not found'
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
            $previousData = (array)$lessonMapping;

            $auditTrailData = [
                'table_name' => 'par_lessons_mapping',
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

            // Delete the lesson mapping
            DB::table('par_lessons_mapping')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Lesson Mapping deleted successfully'
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

        // Fetch the lesson mapping records
        $lessonMappings = DB::table('par_lessons_mapping')->whereIn('id', $ids)->get();

        if ($lessonMappings->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Lesson Mappings not found'
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
            foreach ($lessonMappings as $lessonMapping) {
                $previousData = (array)$lessonMapping;

                $auditTrailData = [
                    'table_name' => 'par_lessons_mapping',
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
            }

            // Delete the records and get the count of deleted records
            $deletedCount = DB::table('par_lessons_mapping')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Lesson Mapping(s) deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}
