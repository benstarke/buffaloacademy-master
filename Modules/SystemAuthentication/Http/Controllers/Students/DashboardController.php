<?php

namespace Modules\SystemAuthentication\Http\Controllers\Students;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Validator;
use JWTAuth;
use Exception;

class DashboardController extends Controller
{
    public function getAllCourses()
    {
        try {
            $courses = DB::table('par_courses')->whereNull('altered_at')->get();

            if ($courses->isEmpty()) {
                return response()->json(['message' => 'No courses found'], 200);
            }

            return response()->json($courses, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to fetch courses', 'error' => $e->getMessage()], 500);
        }
    }

    public function getEnrolledCourses(Request $request)
    {
        try {
            // Retrieve and validate the token
            $token = $request->bearerToken();
            if (!$token) {
                return response()->json(['message' => 'Token not provided'], 401);
            }

            // Decode the token to get the student ID
            $payload = JWTAuth::setToken($token)->getPayload();
            $studentId = $payload['sub']; // Assuming 'sub' is the key holding the student ID

            // Fetch the enrolled courses for the student
            $enrolledCourses = DB::table('par_enrollments')
                ->join('par_courses', 'par_enrollments.course_id', '=', 'par_courses.id')
                ->join('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
                ->join('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
                ->where('par_enrollments.student_id', $studentId)
                ->select(
                    'par_courses.*', 
                    'par_enrollments.enrollment_date',
                    'par_instructors.name_en as instructor_name',
                    'par_instructors.email as instructor_email',
                    'par_instructors.title as instructor_title',
                    'par_instructors.bio as instructor_bio',
                    'par_instructors.image as instructor_image'
                )
                ->get();

            if ($enrolledCourses->isEmpty()) {
                return response()->json(['message' => 'Imagine, you have never enrolled in any courses'], 200);
            }

            return response()->json($enrolledCourses, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch enrolled courses', 'error' => $e->getMessage()], 500);
        }
    }


    public function getActiveCourses(Request $request)
    {
        try {
            // Retrieve and validate the token
            $token = $request->bearerToken();
            if (!$token) {
                return response()->json(['message' => 'Token not provided'], 401);
            }

            // Decode the token to get the student ID
            $payload = JWTAuth::setToken($token)->getPayload();
            $studentId = $payload['sub']; // Assuming 'sub' is the key holding the student ID

            // Fetch the active courses for the student
            $activeCourses = DB::table('par_enrollments')
                ->join('par_courses', 'par_enrollments.course_id', '=', 'par_courses.id')
                ->join('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
                ->join('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
                ->where('par_enrollments.student_id', $studentId)
                ->whereNull('par_enrollments.altered_at')
                ->where(function ($query) {
                    $query->whereNotNull('par_enrollments.updated_at')
                        ->where('par_enrollments.updated_at', '>=', DB::raw('DATE_SUB(NOW(), INTERVAL 1 WEEK)'));
                })
                ->select(
                    'par_courses.*', 
                    'par_enrollments.enrollment_date',
                    'par_instructors.name_en as instructor_name',
                    'par_instructors.email as instructor_email',
                    'par_instructors.title as instructor_title',
                    'par_instructors.bio as instructor_bio',
                    'par_instructors.image as instructor_image'
                )
                ->get();

            if ($activeCourses->isEmpty()) {
                return response()->json(['message' => 'Oh, we are sorry! No active courses found for you.'], 200);
            }

            return response()->json($activeCourses, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch active courses', 'error' => $e->getMessage()], 500);
        }
    }




    public function getCompletedCourses(Request $request)
    {
        try {
            // Retrieve and validate the token
            $token = $request->bearerToken();
            if (!$token) {
                return response()->json(['message' => 'Token not provided'], 401);
            }

            // Decode the token to get the student ID
            $payload = JWTAuth::setToken($token)->getPayload();
            $studentId = $payload['sub']; // Assuming 'sub' is the key holding the student ID

            // Fetch the completed courses for the student
            $completedCourses = DB::table('par_enrollments')
                ->join('par_courses', 'par_enrollments.course_id', '=', 'par_courses.id')
                ->join('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
                ->join('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
                ->where('par_enrollments.student_id', $studentId)
                ->whereNull('par_enrollments.altered_at')
                ->where('par_enrollments.end_date', '<', now())
                ->select(
                    'par_courses.*',
                    'par_enrollments.enrollment_date',
                    'par_enrollments.start_date',
                    'par_enrollments.end_date',
                    'par_instructors.name_en as instructor_name',
                    'par_instructors.email as instructor_email',
                    'par_instructors.title as instructor_title',
                    'par_instructors.bio as instructor_bio',
                    'par_instructors.image as instructor_image'
                )
                ->get();

            if ($completedCourses->isEmpty()) {
                return response()->json(['message' => 'You have not completed any course. Keep learning to acquire your certificate. Good luck!'], 200);
            }

            return response()->json($completedCourses, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch completed courses', 'error' => $e->getMessage()], 500);
        }
    }

    // public function getStudentProfile(Request $request)
    // {
    //     try {
    //         // Retrieve and validate the token
    //         $token = $request->bearerToken();
    //         if (!$token) {
    //             return response()->json(['message' => 'Token not provided'], 401);
    //         }

    //         // Decode the token to get the student ID
    //         $payload = JWTAuth::setToken($token)->getPayload();
    //         $studentId = $payload['sub']; // Assuming 'sub' is the key holding the student ID

    //         // Fetch the student profile details
    //         $studentInfo = DB::table('par_students')
    //             ->where('id', $studentId)
    //             ->first();

    //         if (!$studentInfo) {
    //             return response()->json(['message' => 'Student not found'], 404);
    //         }

    //         // Fetch enrolled courses count
    //         $enrolledCount = DB::table('par_enrollments')
    //             ->where('student_id', $studentId)
    //             ->count();

    //         // Fetch completed courses count
    //         $completedCount = DB::table('par_enrollments')
    //             ->where('student_id', $studentId)
    //             ->where('end_date', '<', now())
    //             ->count();

    //         return response()->json([
    //             'student_info' => $studentInfo,
    //             'enrolled_count' => $enrolledCount,
    //             'completed_count' => $completedCount,
    //         ], 200);
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => 'Failed to fetch student profile', 'error' => $e->getMessage()], 500);
    //     }
    // }

    public function getStudentProfile(Request $request)
{
    try {
        // Retrieve and validate the token from the Authorization header
        $token = $request->bearerToken();
        Log::info('Received Token: ', ['token' => $token]);
        if (!$token) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        // Decode the token to get the student ID
        $payload = JWTAuth::setToken($token)->getPayload();
        Log::info('Decoded Payload: ', ['payload' => $payload]);
        $studentId = $payload['sub']; // Assuming 'sub' is the key holding the student ID

        // Fetch the student profile details
        $studentInfo = DB::table('par_students')
            ->where('id', $studentId)
            ->first();

        if (!$studentInfo) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        // Fetch enrolled courses count
        $enrolledCount = DB::table('par_enrollments')
            ->where('student_id', $studentId)
            ->count();

        // Fetch completed courses count
        $completedCount = DB::table('par_enrollments')
            ->where('student_id', $studentId)
            ->where('end_date', '<', now())
            ->count();

        return response()->json([
            'student_info' => $studentInfo,
            'enrolled_count' => $enrolledCount,
            'completed_count' => $completedCount,
        ], 200);
    } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
        return response()->json(['message' => 'Token has expired'], 401);
    } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
        return response()->json(['message' => 'Token is invalid'], 401);
    } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
        return response()->json(['message' => 'Token not provided'], 401);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Failed to fetch student profile', 'error' => $e->getMessage()], 500);
    }
}




    public function getPurchaseHistory(Request $request)
    {
        try {
            // Retrieve and validate the token
            $token = $request->bearerToken();
            if (!$token) {
                return response()->json(['message' => 'Token not provided'], 401);
            }
    
            // Decode the token to get the student ID
            $payload = JWTAuth::setToken($token)->getPayload();
            $studentId = $payload['sub']; // Assuming 'sub' is the key holding the student ID
    
            // Fetch the purchase history for the student
            $purchaseHistory = DB::table('par_checkouts')
                ->where('student_id', $studentId)
                ->whereNull('altered_at')
                ->get();
    
            if ($purchaseHistory->isEmpty()) {
                return response()->json(['message' => 'No purchase history found for you. Subscribe to one course today and get yourself a disount of 20%!'], 200);
            }
    
            return response()->json($purchaseHistory, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch purchase history', 'error' => $e->getMessage()], 500);
        }
    }
}