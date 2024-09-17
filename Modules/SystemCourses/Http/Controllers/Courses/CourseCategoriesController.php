<?php

namespace Modules\SystemCourses\Http\Controllers\Courses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;
use Carbon\Carbon;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;

class CourseCategoriesController extends Controller
{
    // Get current user ID from JWT token
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
        $categories = DB::table('par_course_categories')->latest()->get();

        // Add duration field
        $categories = $categories->map(function ($category) {
            $createdDate = Carbon::parse($category->created_at);
            $category->duration = $createdDate->diffForHumans();
            return $category;
        });

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $category = DB::table('par_course_categories')
            ->where('id', $id)
            ->first();

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        // Add duration field
        $createdDate = Carbon::parse($category->created_at);
        $category->duration = $createdDate->diffForHumans();

        return response()->json([
            'success' => true,
            'data' => $category
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

            // Fetch user email from instructors or users
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            $categoryId = DB::table('par_course_categories')->insertGetId([
                'category_name' => $request->category_name,
                'category_image' => $request->category_image,
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_course_categories',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($categoryId),
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
                'message' => 'Category created successfully',
                'data' => $categoryId
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
        $category = DB::table('par_course_categories')->find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Fetch user email
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array)$category;

            // Update the category
            DB::table('par_course_categories')
                ->where('id', $id)
                ->update([
                    'category_name' => $request->category_name,
                    'category_image' => $request->category_image,
                    'updated_by' => $userEmail,
                    'updated_at' => now(),
                ]);

            // Fetch updated category data for audit trail
            $updatedCategory = DB::table('par_course_categories')->find($id);

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_course_categories',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedCategory),
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
                'message' => 'Category updated successfully',
                'data' => $updatedCategory
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * Delete one record at a time
     */
    public function destroy($id): JsonResponse
    {
        $category = DB::table('par_course_categories')->find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId(request());

            // Fetch user email
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = (array)$category;

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_course_categories',
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

            // Delete the category
            DB::table('par_course_categories')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Category deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove multiple resources from storage.
     * Delete multiple records at a time
     */
    public function destroyMultiple(Request $request): JsonResponse
    {
        $ids = $request->input('ids'); // Expecting an array of IDs

        // Validate IDs array
        if (empty($ids) || !is_array($ids)) {
            return response()->json([
                'success' => false,
                'message' => 'No valid IDs provided'
            ], 400);
        }

        $categories = DB::table('par_course_categories')->whereIn('id', $ids)->get();

        if ($categories->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Categories not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId(request());

            // Fetch user email
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store previous data for audit trail
            $previousData = $categories->map(function ($category) {
                return (array)$category;
            });

            // Audit trail logic
            $auditTrailData = [
                'table_name' => 'par_course_categories',
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

            // Delete the categories
            DB::table('par_course_categories')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Categories deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
