<?php

namespace Modules\SystemCourses\Http\Controllers\Courses;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;
use Carbon\Carbon;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;

class CourseTagController extends Controller
{
    // Get the current ID of the logged-in user (admin/superadmin/writer) or instructor ID
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
        $tags = DB::table('par_course_tag')->latest()->get();

        // Add duration field
        $tags = $tags->map(function ($tag) {
            $createdDate = Carbon::parse($tag->created_at);
            $tag->duration = $createdDate->diffForHumans();
            return $tag;
        });

        return response()->json([
            'success' => true,
            'data' => $tags
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $tag = DB::table('par_course_tag')
            ->join('par_users', 'par_course_tag.created_by', '=', 'par_users.id')
            ->select('par_course_tag.*', 'par_users.name as author')
            ->where('par_course_tag.id', $id)
            ->first();

        if (!$tag) {
            return response()->json([
                'success' => false,
                'message' => 'Tag not found'
            ], 404);
        }

        // Add duration field
        $createdDate = Carbon::parse($tag->created_at);
        $tag->duration = $createdDate->diffForHumans();

        return response()->json([
            'success' => true,
            'data' => $tag
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $userId = $this->getCurrentUserId($request);

            // Check if the user is an instructor
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            $tagId = DB::table('par_course_tag')->insertGetId([
                'name' => $request->name,
                'description' => $request->description,
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail for insertion
            DbHelper::auditTrail(
                'par_course_tag',
                'insert',
                null,
                json_encode($tagId),
                $userEmail
            );

            return response()->json([
                'success' => true,
                'message' => 'Tag created successfully',
                'data' => $tagId
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
        $tag = DB::table('par_course_tag')->find($id);

        if (!$tag) {
            return response()->json([
                'success' => false,
                'message' => 'Tag not found'
            ], 404);
        }

        try {
            $userId = $this->getCurrentUserId($request);

            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array)$tag;

            // Update the tag
            DB::table('par_course_tag')
                ->where('id', $id)
                ->update([
                    'name' => $request->name,
                    'updated_by' => $userEmail,
                    'updated_at' => now(),
                ]);

            $updatedTag = DB::table('par_course_tag')->find($id);

            // Audit trail for update
            DbHelper::auditTrail(
                'par_course_tag',
                'update',
                json_encode($previousData),
                json_encode($updatedTag),
                $userEmail
            );

            return response()->json([
                'success' => true,
                'message' => 'Tag updated successfully',
                'data' => $updatedTag
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
        $tag = DB::table('par_course_tag')->find($id);

        if (!$tag) {
            return response()->json([
                'success' => false,
                'message' => 'Tag not found'
            ], 404);
        }

        try {
            $userId = $this->getCurrentUserId(request());

            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Audit trail for deletion
            $previousData = (array)$tag;

            DbHelper::auditTrail(
                'par_course_tag',
                'delete',
                json_encode($previousData),
                null,
                $userEmail
            );

            // Delete the tag
            DB::table('par_course_tag')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Tag deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove multiple records at once.
     */
    public function destroyMultiple(Request $request): JsonResponse
    {
        $ids = $request->input('ids');

        if (empty($ids) || !is_array($ids)) {
            return response()->json([
                'success' => false,
                'message' => 'No valid IDs provided'
            ], 400);
        }

        $tags = DB::table('par_course_tag')->whereIn('id', $ids)->get();

        if ($tags->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tags not found'
            ], 404);
        }

        try {
            $userId = $this->getCurrentUserId(request());

            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Audit trail for deletion
            foreach ($tags as $tag) {
                $previousData = (array)$tag;

                DbHelper::auditTrail(
                    'par_course_tag',
                    'delete',
                    json_encode($previousData),
                    null,
                    $userEmail
                );
            }

            // Delete the tags
            $deletedCount = DB::table('par_course_tag')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Tag(s) deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
