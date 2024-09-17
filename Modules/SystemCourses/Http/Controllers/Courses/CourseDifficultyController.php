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

class CourseDifficultyController extends Controller
{
    // Fetch the current user ID from the JWT token
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
        $difficulties = DB::table('par_course_difficulty')->latest()->get();

        // Add duration field
        $difficulties = $difficulties->map(function ($difficulty) {
            $createdDate = Carbon::parse($difficulty->created_at);
            $difficulty->duration = $createdDate->diffForHumans();
            return $difficulty;
        });

        return response()->json([
            'success' => true,
            'data' => $difficulties
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $difficulty = DB::table('par_course_difficulty')->find($id);

        if (!$difficulty) {
            return response()->json([
                'success' => false,
                'message' => 'Course difficulty not found'
            ], 404);
        }

        // Add duration field
        $createdDate = Carbon::parse($difficulty->created_at);
        $difficulty->duration = $createdDate->diffForHumans();

        return response()->json([
            'success' => true,
            'data' => $difficulty
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

            // Get user email (check for instructor first, then fallback to regular user)
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Insert new course difficulty
            $courseDifficultyId = DB::table('par_course_difficulty')->insertGetId([
                'name' => $request->name,
                'description' => $request->description,
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            DbHelper::auditTrail(
                'par_course_difficulty',
                'insert',
                null,
                json_encode($courseDifficultyId),
                $userEmail
            );

            return response()->json([
                'success' => true,
                'message' => 'Course difficulty created successfully',
                'data' => $courseDifficultyId
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
        $difficulty = DB::table('par_course_difficulty')->find($id);

        if (!$difficulty) {
            return response()->json([
                'success' => false,
                'message' => 'Course difficulty not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Get user email (check for instructor first, then fallback to regular user)
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array) $difficulty;

            // Update course difficulty
            DB::table('par_course_difficulty')
                ->where('id', $id)
                ->update([
                    'name' => $request->name,
                    'description' => $request->description,
                    'updated_by' => $userEmail,
                    'updated_at' => now(),
                ]);

            // Fetch updated data for audit trail
            $updatedDifficulty = DB::table('par_course_difficulty')->find($id);

            // Audit trail logic for update
            DbHelper::auditTrail(
                'par_course_difficulty',
                'update',
                json_encode($previousData),
                json_encode($updatedDifficulty),
                $userEmail
            );

            return response()->json([
                'success' => true,
                'message' => 'Course difficulty updated successfully',
                'data' => $updatedDifficulty
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage (delete one record at a time).
     */
    public function destroy($id): JsonResponse
    {
        $difficulty = DB::table('par_course_difficulty')->find($id);

        if (!$difficulty) {
            return response()->json([
                'success' => false,
                'message' => 'Course difficulty not found'
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

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array) $difficulty;

            // Audit trail logic for deletion
            DbHelper::auditTrail(
                'par_course_difficulty',
                'delete',
                json_encode($previousData),
                null,
                $userEmail
            );

            // Delete the difficulty
            DB::table('par_course_difficulty')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Course difficulty deleted successfully'
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
        $ids = $request->input('ids'); // Expecting an array of IDs

        // Validate if IDs are provided
        if (empty($ids) || !is_array($ids)) {
            return response()->json([
                'success' => false,
                'message' => 'No valid IDs provided'
            ], 400);
        }

        $difficulties = DB::table('par_course_difficulty')->whereIn('id', $ids)->get();

        if ($difficulties->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Course difficulties not found'
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

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Audit trail logic for deletion
            foreach ($difficulties as $difficulty) {
                $previousData = (array)$difficulty;

                DbHelper::auditTrail(
                    'par_course_difficulty',
                    'delete',
                    json_encode($previousData),
                    null,
                    $userEmail
                );
            }

            // Delete the records and get the count of deleted records
            $deletedCount = DB::table('par_course_difficulty')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' course difficulties deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
