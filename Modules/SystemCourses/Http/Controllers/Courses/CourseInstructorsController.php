<?php

namespace Modules\SystemCourses\Http\Controllers\Courses;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;
use Carbon\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class CourseInstructorsController extends Controller
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
        $instructors = DB::table('par_course_instructors')->latest()->get();

        // Add duration field
        $instructors = $instructors->map(function ($instructor) {
            $createdDate = Carbon::parse($instructor->created_at);
            $instructor->duration = $createdDate->diffForHumans();
            return $instructor;
        });

        return response()->json([
            'success' => true,
            'data' => $instructors
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($course_id, $instructor_id): JsonResponse
    {
        $instructor = DB::table('par_course_instructors')
            ->where('course_id', $course_id)
            ->where('instructor_id', $instructor_id)
            ->first();

        if (!$instructor) {
            return response()->json([
                'success' => false,
                'message' => 'Instructor not found for the specified course'
            ], 404);
        }

        // Calculate the duration since the record was created using Carbon
        $createdDate = Carbon::parse($instructor->created_at);
        $instructor->duration = $createdDate->diffForHumans(); // Add duration field

        return response()->json([
            'success' => true,
            'data' => $instructor
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer|exists:par_courses,id',
            'instructor_id' => 'required|integer|exists:par_instructors,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $courseId = $request->input('course_id');

        // Check if the course already has an assigned instructor
        $existingEntry = DB::table('par_course_instructors')
            ->where('course_id', $courseId)
            ->exists();

        if ($existingEntry) {
            return response()->json([
                'success' => false,
                'message' => 'This course already has an assigned instructor'
            ], 409); // Conflict status code
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

            $instructorData = [
                'course_id' => $courseId,
                'instructor_id' => $request->input('instructor_id'),
                'created_by' => $userEmail,
                'created_at' => now(),
            ];

            DB::table('par_course_instructors')->insert($instructorData);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_course_instructors',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($instructorData),
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
                'message' => 'Instructor assigned to course successfully',
                'data' => $instructorData
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $course_id, $instructor_id): JsonResponse
    {
        // Find the existing instructor assignment using the composite key
        $instructor = DB::table('par_course_instructors')
            ->where('course_id', $course_id)
            ->where('instructor_id', $instructor_id)
            ->first();

        if (!$instructor) {
            return response()->json([
                'success' => false,
                'message' => 'Instructor not found for the specified course'
            ], 404);
        }

        // Validate the input data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer|exists:par_courses,id',
            'instructor_id' => 'required|integer|exists:par_instructors,id',
            'updated_by' => 'nullable|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Check if the updated course_id is unique for the instructor
        $existingAssignment = DB::table('par_course_instructors')
            ->where('course_id', $request->input('course_id'))
            ->where('instructor_id', '<>', $instructor_id) // Ensure it's not the current record being updated
            ->first();

        if ($existingAssignment) {
            return response()->json([
                'success' => false,
                'message' => 'This course is already assigned to another instructor'
            ], 400);
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
            $previousData = (array)$instructor;

            // Prepare the data for update
            $updateData = [
                'course_id' => $request->input('course_id'),
                'instructor_id' => $request->input('instructor_id'),
                'updated_by' => $request->input('updated_by'),
                'updated_at' => now(),
            ];

            DB::table('par_course_instructors')
                ->where('course_id', $course_id)
                ->where('instructor_id', $instructor_id)
                ->update($updateData);

            // Fetch the updated instructor assignment data for audit trail
            $updatedInstructor = DB::table('par_course_instructors')
                ->where('course_id', $course_id)
                ->where('instructor_id', $instructor_id)
                ->first();

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_course_instructors',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedInstructor),
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
                'message' => 'Instructor assignment updated successfully',
                'data' => $updatedInstructor
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($course_id, $instructor_id): JsonResponse
    {
        $instructor = DB::table('par_course_instructors')
            ->where('course_id', $course_id)
            ->where('instructor_id', $instructor_id)
            ->first();

        if (!$instructor) {
            return response()->json([
                'success' => false,
                'message' => 'Instructor assignment not found'
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

            // Store the previous data for audit trail
            $previousData = (array)$instructor;

            // Delete the instructor assignment
            DB::table('par_course_instructors')
                ->where('course_id', $course_id)
                ->where('instructor_id', $instructor_id)
                ->delete();

            // Audit trail logic for deletion
            $auditTrailData = [
                'table_name' => 'par_course_instructors',
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
                'message' => 'Instructor assignment removed successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove multiple resources from storage.
     */
    public function destroyMultiple(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'course_ids' => 'required|array',
            'course_ids.*' => 'integer|exists:par_courses,id',
            'instructor_ids' => 'required|array',
            'instructor_ids.*' => 'integer|exists:par_instructors,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $courseIds = $request->input('course_ids');
        $instructorIds = $request->input('instructor_ids');

        try {
            $deletedRecords = [];

            foreach ($courseIds as $courseId) {
                foreach ($instructorIds as $instructorId) {
                    $instructor = DB::table('par_course_instructors')
                        ->where('course_id', $courseId)
                        ->where('instructor_id', $instructorId)
                        ->first();

                    if ($instructor) {
                        // Store the previous data for audit trail
                        $previousData = (array)$instructor;

                        // Delete the instructor assignment
                        DB::table('par_course_instructors')
                            ->where('course_id', $courseId)
                            ->where('instructor_id', $instructorId)
                            ->delete();

                        // Record the deletion for audit trail
                        $deletedRecords[] = $previousData;
                    }
                }
            }

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

            // Audit trail logic for deletions
            foreach ($deletedRecords as $record) {
                $auditTrailData = [
                    'table_name' => 'par_course_instructors',
                    'table_action' => 'delete',
                    'prev_tabledata' => json_encode($record),
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

            return response()->json([
                'success' => true,
                'message' => 'Instructor assignments removed successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}
