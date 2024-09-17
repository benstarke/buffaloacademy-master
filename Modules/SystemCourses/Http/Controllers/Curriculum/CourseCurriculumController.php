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
use Illuminate\Validation\Rule;


class CourseCurriculumController extends Controller
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
        $curriculums = DB::table('par_course_curriculum')->latest()->get();

        // Add duration field
        $curriculums = $curriculums->map(function ($curriculum) {
            $createdDate = Carbon::parse($curriculum->created_at);
            $curriculum->duration = $createdDate->diffForHumans();
            return $curriculum;
        });

        return response()->json([
            'success' => true,
            'data' => $curriculums
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $curriculum = DB::table('par_course_curriculum')
            ->join('par_users', 'par_course_curriculum.created_by', '=', 'par_users.id')
            ->select('par_course_curriculum.*', 'par_users.name_en as author')
            ->where('par_course_curriculum.id', $id)
            ->first();

        if (!$curriculum) {
            return response()->json([
                'success' => false,
                'message' => 'Course curriculum not found'
            ], 404);
        }

        // Calculate the duration since the curriculum was created using Carbon
        $createdDate = Carbon::parse($curriculum->created_at);
        $curriculum->duration = $createdDate->diffForHumans(); // Add duration field

        return response()->json([
            'success' => true,
            'data' => $curriculum
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer',
            'name' => 'required|string|max:50|unique:par_course_curriculum',
            'description' => 'nullable|string|max:255',
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

            $curriculumId = DB::table('par_course_curriculum')->insertGetId([
                'course_id' => $request->input('course_id'),
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'created_by' => $userEmail,
                'created_at' => now(), // Automatically set the created_at timestamp
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_course_curriculum',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($curriculumId),
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
                'message' => 'Course curriculum created successfully',
                'data' => $curriculumId
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
        $curriculum = DB::table('par_course_curriculum')->find($id);

        if (!$curriculum) {
            return response()->json([
                'success' => false,
                'message' => 'Course curriculum not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'course_id' => 'required|integer',
            'name' => [
                'required',
                'string',
                'max:50',
                Rule::unique('par_course_curriculum')->ignore($id),
            ],
            'description' => 'nullable|string|max:255',
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
            $previousData = (array)$curriculum;

            // Update the course curriculum
            DB::table('par_course_curriculum')
                ->where('id', $id)
                ->update([
                    'course_id' => $request->input('course_id'),
                    'name' => $request->input('name'),
                    'description' => $request->input('description'),
                    'updated_by' => $userEmail,
                    'updated_at' => now(), // Automatically set the updated_at timestamp
                ]);

            // Fetch the updated curriculum data for audit trail
            $updatedCurriculum = DB::table('par_course_curriculum')->find($id);

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_course_curriculum',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedCurriculum),
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
                'message' => 'Course curriculum updated successfully',
                'data' => $updatedCurriculum
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
        $curriculum = DB::table('par_course_curriculum')->find($id);

        if (!$curriculum) {
            return response()->json([
                'success' => false,
                'message' => 'Course curriculum not found'
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
            $previousData = (array)$curriculum;

            $auditTrailData = [
                'table_name' => 'par_course_curriculum',
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

            // Delete the course curriculum
            DB::table('par_course_curriculum')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Course curriculum deleted successfully'
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

        $curriculums = DB::table('par_course_curriculum')->whereIn('id', $ids)->get();

        if ($curriculums->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Course curriculums not found'
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
            foreach ($curriculums as $curriculum) {
                $previousData = (array)$curriculum;

                $auditTrailData = [
                    'table_name' => 'par_course_curriculum',
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
            $deletedCount = DB::table('par_course_curriculum')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Course curriculum(s) deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


}
