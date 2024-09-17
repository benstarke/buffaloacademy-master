<?php

namespace Modules\SystemBlog\Http\Controllers;

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

class BlogCategoriesController extends Controller
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
        $blog_categories = DB::table('par_blog_categories')->latest()->get();

        // Add duration field
        $blog_categories = $blog_categories->map(function ($blog_category) {
            $createdDate = Carbon::parse($blog_category->created_at);
            $blog_category->duration = $createdDate->diffForHumans();
            return $blog_category;
        });

        return response()->json([
            'success' => true,
            'data' => $blog_categories
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $blog_categories = DB::table('par_blog_categories')
                ->join('users', 'par_blog_categories.created_by', '=', 'users.id')
                ->select('par_blog_categories.*', 'users.name_en as author')
                ->where('par_blog_categories.id', $id)
                ->first();

        if (!$blog_categories) {
            return response()->json([
                'success' => false,
                'message' => 'Blog Category not found'
            ], 404);
        }

        // Calculate the duration since the blog was created using Carbon
        $createdDate = Carbon::parse($blog_categories->created_at);
        $blog_categories->duration = $createdDate->diffForHumans(); // Add duration field

        return response()->json([
            'success' => true,
            'data' => $blog_categories
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

            $categoryId = DB::table('par_blog_categories')->insertGetId([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_blog_categories',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($categoryId),
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
                'message' => 'Blog Category created successfully',
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
        $blogCategory = DB::table('par_blog_categories')->find($id);

        if (!$blogCategory) {
            return response()->json(['message' => 'Blog Category not found'], 404);
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

            $previousData = (array)$blogCategory;

            DB::table('par_blog_categories')->where('id', $id)->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'updated_by' => $userEmail,
                'updated_at' => now(),
            ]);

            // Fetch the updated category data for audit trail
            $updatedBlogCategory = DB::table('par_blog_categories')->find($id);

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_blog_categories',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedBlogCategory),
                'user_id' => $userEmail, // Use the user email for the audit trail
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
                'message' => 'Blog Category updated successfully',
                'data' => $updatedBlogCategory
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }



    /**
     * Remove the specified resource from storage.
     * delete one record at a time
     */
    public function destroy($id): JsonResponse
    {
        $blogCategory = DB::table('par_blog_categories')->find($id);

        if (!$blogCategory) {
            return response()->json([
                'success' => false,
                'message' => 'Blog Category not found'
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
            $previousData = (array)$blogCategory;

            $auditTrailData = [
                'table_name' => 'par_blog_categories',
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

            DB::table('par_blog_categories')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Blog Category deleted successfully'
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

        $blogCategories = DB::table('par_blog_categories')->whereIn('id', $ids)->get();

        if ($blogCategories->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Blog Categories not found'
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
            foreach ($blogCategories as $blogCategory) {
                $previousData = (array)$blogCategory;

                $auditTrailData = [
                    'table_name' => 'par_blog_categories',
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
            $deletedCount = DB::table('par_blog_categories')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Blog Category(ies) deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }



    // SEARCH course
    public function search(Request $request): JsonResponse
    {
        try {
            $query = DB::table('par_blog_categories');

            if ($request->has('searchText') && !empty($request->searchText)) {
                $searchText = $request->searchText;
                $query->where(function ($q) use ($searchText) {
                    $q->where('name', 'like', '%' . $searchText . '%')
                    ->orWhere('description', 'like', '%' . $searchText . '%');
                });
            }

            $categories = $query->get();

            if ($categories->isEmpty()) {
                return response()->json(['message' => 'No blog categories found'], 404);
            }

            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}



