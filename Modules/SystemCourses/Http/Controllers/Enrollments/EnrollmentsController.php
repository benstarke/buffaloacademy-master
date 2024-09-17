<?php

namespace Modules\SystemCourses\Http\Controllers\Enrollments;

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
use Illuminate\Database\QueryException;

class EnrollmentsController extends Controller
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
        $enrollments = DB::table('par_enrollments')->latest()->get();

        // Add duration field
        $enrollments = $enrollments->map(function ($enrollment) {
            $createdDate = Carbon::parse($enrollment->created_at);
            $enrollment->duration = $createdDate->diffForHumans();
            return $enrollment;
        });

        return response()->json([
            'success' => true,
            'data' => $enrollments
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $enrollment = DB::table('par_enrollments')
            ->join('par_students', 'par_enrollments.student_id', '=', 'par_students.id')
            ->join('par_courses', 'par_enrollments.course_id', '=', 'par_courses.id')
            ->select('par_enrollments.*', 'par_students.name as student_name', 'par_courses.name as course_name')
            ->where('par_enrollments.id', $id)
            ->first();

        if (!$enrollment) {
            return response()->json([
                'success' => false,
                'message' => 'Enrollment not found'
            ], 404);
        }

        // Calculate the duration since the enrollment was created using Carbon
        $createdDate = Carbon::parse($enrollment->created_at);
        $enrollment->duration = $createdDate->diffForHumans(); // Add duration field

        return response()->json([
            'success' => true,
            'data' => $enrollment
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|integer|exists:par_students,id',
            'course_id' => 'required|integer|exists:par_courses,id',
            // 'enrollment_date' => 'required|date',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Ensure the token is provided and valid
            if (!$userId) {
                return response()->json(['error' => 'Token not provided'], 401); // 401 Unauthorized status code
            }

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

            // Insert the new enrollment record and get the ID
            $enrollmentId = DB::table('par_enrollments')->insertGetId([
                'student_id' => $request->input('student_id'),
                'course_id' => $request->input('course_id'),
                'enrollment_date' => now(),
                'start_date' => $request->input('start_date'),
                'end_date' => $request->input('end_date'),
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_enrollments',
                'table_action' => 'insert',
                'current_tabledata' => json_encode([
                    'id' => $enrollmentId,
                    'student_id' => $request->input('student_id'),
                    'course_id' => $request->input('course_id'),
                    'enrollment_date' => $request->input('enrollment_date'),
                    'start_date' => $request->input('start_date'),
                    'end_date' => $request->input('end_date'),
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
                'message' => 'Enrollment created successfully',
                'data' => $enrollmentId
            ], 201);

        } catch (\Illuminate\Database\QueryException $e) {
            // Check for duplicate entry error
            if ($e->getCode() === '23000') {
                return response()->json([
                    'error' => 'This student is already enrolled in this course.'
                ], 409); // 409 Conflict status code
            }

            // Handle other potential query exceptions
            return response()->json([
                'error' => 'An error occurred while creating the enrollment. Please try again.'
            ], 500);
        } catch (Exception $e) {
            // Handle other potential exceptions
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $enrollment = DB::table('par_enrollments')->find($id);

        if (!$enrollment) {
            return response()->json([
                'success' => false,
                'message' => 'Enrollment not found'
            ], 404);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|integer|exists:par_students,id',
            'course_id' => 'required|integer|exists:par_courses,id',
            // 'enrollment_date' => 'required|date',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Store the previous data for audit trail
        $previousData = (array)$enrollment;

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

            // Update the enrollment record
            DB::table('par_enrollments')
                ->where('id', $id)
                ->update([
                    'student_id' => $request->input('student_id'),
                    'course_id' => $request->input('course_id'),
                    'enrollment_date' => now(),
                    'start_date' => $request->input('start_date'),
                    'end_date' => $request->input('end_date'),
                    'updated_by' => $userEmail,
                    'updated_at' => now(),
                ]);

            // Fetch the updated enrollment data for audit trail
            $updatedEnrollment = DB::table('par_enrollments')->find($id);

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_enrollments',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedEnrollment),
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
                'message' => 'Enrollment updated successfully',
                'data' => $updatedEnrollment
            ], 200);

        } catch (QueryException $e) {
            // Check for duplicate entry error
            if ($e->getCode() === '23000') {
                return response()->json([
                    'error' => 'This student is already enrolled in the specified course.'
                ], 409); // 409 Conflict status code
            }

            // Handle other potential query exceptions
            return response()->json([
                'error' => 'An error occurred while updating the enrollment. Please try again.'
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $enrollment = DB::table('par_enrollments')->find($id);

        if (!$enrollment) {
            return response()->json([
                'success' => false,
                'message' => 'Enrollment not found'
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
            $previousData = (array)$enrollment;

            $auditTrailData = [
                'table_name' => 'par_enrollments',
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

            // Delete the enrollment
            DB::table('par_enrollments')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Enrollment deleted successfully'
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

        // Fetch the enrollments that will be deleted
        $enrollments = DB::table('par_enrollments')->whereIn('id', $ids)->get();

        if ($enrollments->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Enrollments not found'
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

            // Audit trail logic for deletion
            foreach ($enrollments as $enrollment) {
                $previousData = (array)$enrollment;

                $auditTrailData = [
                    'table_name' => 'par_enrollments',
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
            $deletedCount = DB::table('par_enrollments')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Enrollment(s) deleted successfully'
            ], 200);

        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}
