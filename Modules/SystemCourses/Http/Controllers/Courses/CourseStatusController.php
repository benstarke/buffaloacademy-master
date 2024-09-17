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

class CourseStatusController extends Controller
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
        $statuses = DB::table('par_course_status')->latest()->get();

        // Add duration field
        $statuses = $statuses->map(function ($status) {
            $createdDate = Carbon::parse($status->created_at);
            $status->duration = $createdDate->diffForHumans();
            return $status;
        });

        return response()->json([
            'success' => true,
            'data' => $statuses
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $status = DB::table('par_course_status')
            ->where('id', $id)
            ->first();

        if (!$status) {
            return response()->json([
                'success' => false,
                'message' => 'Course status not found'
            ], 404);
        }

        // Calculate duration using Carbon
        $createdDate = Carbon::parse($status->created_at);
        $status->duration = $createdDate->diffForHumans(); // Add duration field

        return response()->json([
            'success' => true,
            'data' => $status
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

            $coursestatusId = DB::table('par_course_status')->insertGetId([
                'name' => $request->name,
                'description' => $request->description,
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_course_status',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($coursestatusId),
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
                'message' => 'Course status created successfully',
                'data' => $coursestatusId
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
        $coursestatus = DB::table('par_course_status')->find($id);

        if (!$coursestatus) {
            return response()->json([
                'success' => false,
                'message' => 'Course status not found'
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
            $previousData = (array)$coursestatus;

            // Update the course status
            DB::table('par_course_status')
                ->where('id', $id)
                ->update([
                    'name' => $request->name,
                    'description' => $request->description,
                    'updated_by' => $userEmail,
                    'updated_at' => now(),
                ]);

            // Fetch updated course status data for audit trail
            $updatedCoursestatus = DB::table('par_course_status')->find($id);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_course_status',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedCoursestatus),
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
                'message' => 'Course status updated successfully',
                'data' => $updatedCoursestatus
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
        $coursestatus = DB::table('par_course_status')->find($id);

        if (!$coursestatus) {
            return response()->json([
                'success' => false,
                'message' => 'Course status not found'
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
            $previousData = (array)$coursestatus;

            // Audit trail logic for deletion
            $auditTrailData = [
                'table_name' => 'par_course_status',
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

            // Delete the course status
            DB::table('par_course_status')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Course status deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove multiple course statuses from storage.
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

        $coursestatuses = DB::table('par_course_status')->whereIn('id', $ids)->get();

        if ($coursestatuses->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Course statuses not found'
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
            $previousData = $coursestatuses->map(function ($status) {
                return (array)$status;
            });

            // Delete the course statuses
            DB::table('par_course_status')->whereIn('id', $ids)->delete();

            // Audit trail logic for multiple deletions
            $auditTrailData = [
                'table_name' => 'par_course_status',
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
                'message' => 'Course statuses deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
