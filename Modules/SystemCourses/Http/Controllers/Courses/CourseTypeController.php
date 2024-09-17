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

class CourseTypeController extends Controller
{
    // Function to get the current logged-in user ID from the JWT token
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
        $types = DB::table('par_course_type')->latest()->get();

        // Add duration field
        $types = $types->map(function ($type) {
            $createdDate = Carbon::parse($type->created_at);
            $type->duration = $createdDate->diffForHumans();
            return $type;
        });

        return response()->json([
            'success' => true,
            'data' => $types
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $type = DB::table('par_course_type')
            ->where('id', $id)
            ->first();

        if (!$type) {
            return response()->json([
                'success' => false,
                'message' => 'Course type not found'
            ], 404);
        }

        // Calculate duration using Carbon
        $createdDate = Carbon::parse($type->created_at);
        $type->duration = $createdDate->diffForHumans(); // Add duration field

        return response()->json([
            'success' => true,
            'data' => $type
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
            
            // Check if the user is an instructor or a regular user
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email') 
                ?? DB::table('par_users')->where('id', $userId)->value('email');

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            $courseTypeId = DB::table('par_course_type')->insertGetId([
                'name' => $request->name,
                'description' => $request->description,
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_course_type',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($courseTypeId),
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
                'message' => 'Course type created successfully',
                'data' => $courseTypeId
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
        $courseType = DB::table('par_course_type')->find($id);

        if (!$courseType) {
            return response()->json([
                'success' => false,
                'message' => 'Course type not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Check if the user is an instructor or a regular user
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email') 
                ?? DB::table('par_users')->where('id', $userId)->value('email');

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array)$courseType;

            // Update the course type
            DB::table('par_course_type')
                ->where('id', $id)
                ->update([
                    'name' => $request->name,
                    'description' => $request->description,
                    'updated_by' => $userEmail,
                    'updated_at' => now(),
                ]);

            // Fetch updated course type data for audit trail
            $updatedCourseType = DB::table('par_course_type')->find($id);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_course_type',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedCourseType),
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
                'message' => 'Course type updated successfully',
                'data' => $updatedCourseType
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
        $courseType = DB::table('par_course_type')->find($id);

        if (!$courseType) {
            return response()->json([
                'success' => false,
                'message' => 'Course type not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId(request());

            // Check if the user is an instructor or a regular user
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email') 
                ?? DB::table('par_users')->where('id', $userId)->value('email');

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array)$courseType;

            // Audit trail logic for deletion
            $auditTrailData = [
                'table_name' => 'par_course_type',
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

            // Delete the course type
            DB::table('par_course_type')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Course type deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove multiple course types from storage.
     */
    public function destroyMultiple(Request $request): JsonResponse
    {
        $ids = $request->input('ids'); // Expecting an array of IDs

        if (empty($ids) || !is_array($ids)) {
            return response()->json([
                'success' => false,
                'message' => 'No valid IDs provided'
            ], 400);
        }

        $courseTypes = DB::table('par_course_type')->whereIn('id', $ids)->get();

        if ($courseTypes->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Course types not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Check if the user is an instructor or a regular user
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email') 
                ?? DB::table('par_users')->where('id', $userId)->value('email');

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = $courseTypes->map(function ($type) {
                return (array)$type;
            });

            // Delete the course types
            DB::table('par_course_type')->whereIn('id', $ids)->delete();

            // Audit trail logic for multiple deletions
            $auditTrailData = [
                'table_name' => 'par_course_type',
                'table_action' => 'delete-multiple',
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
                'message' => 'Course types deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
