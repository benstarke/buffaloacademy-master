<?php

namespace Modules\SystemCourses\Http\Controllers\Courses;

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

class CourseSubCategoriesController extends Controller
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
        $subCategories = DB::table('par_course_sub_categories')->latest()->get();
        // Add duration field
        $subCategories = $subCategories->map(function ($subcategory) {
            $createdDate = Carbon::parse($subcategory->created_at);
            $subcategory->duration = $createdDate->diffForHumans();
            return $subcategory;
        });

        return response()->json([
            'success' => true,
            'data' => $subCategories
        ]);
    }



    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $subCategory = DB::table('par_course_sub_categories')->find($id);

        if (!$subCategory) {
            return response()->json(['message' => 'Course sub-category not found'], 404);
        }

        return response()->json($subCategory, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the request inputs
        $validator = Validator::make($request->all(), [
            'sub_category_name' => 'required|string|max:255|unique:par_course_sub_categories',
            'sub_category_status' => 'required|integer|in:1,2',
            'sub_category_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
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

            // Handle the image upload if present
            $imagePath = null;
            if ($request->hasFile('sub_category_image')) {
                $image = $request->file('sub_category_image');
                $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/course-sub-categories');
                $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move($folderPath, $imageName);
                $imagePath = 'uploads/courses/course-sub-categories/' . $imageName;
            }

            // Insert the new sub-category record into the database
            $subCategoryId = DB::table('par_course_sub_categories')->insertGetId([
                'sub_category_name' => $request->input('sub_category_name'),
                'sub_category_status' => $request->input('sub_category_status'),
                'sub_category_image' => $imagePath,
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_course_sub_categories',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($subCategoryId),
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
                'message' => 'Course sub-category created successfully',
                'data' => $subCategoryId
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
        // Find the sub-category by ID
        $subCategory = DB::table('par_course_sub_categories')->find($id);

        // If sub-category not found, return 404 error
        if (!$subCategory) {
            return response()->json(['message' => 'Course sub-category not found'], 404);
        }

        // Validate the request inputs
        $validator = Validator::make($request->all(), [
            'sub_category_name' => 'required|string|max:255|unique:par_course_sub_categories,sub_category_name,' . $id,
            'sub_category_status' => 'required|integer|in:1,2',
            'sub_category_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // If validation fails, return validation errors
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
            $previousData = (array)$subCategory;

            // Handle the image upload if present
            $imagePath = $subCategory->sub_category_image;
            if ($request->hasFile('sub_category_image')) {
                $image = $request->file('sub_category_image');
                $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/course-sub-categories');
                $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move($folderPath, $imageName);
                $imagePath = 'uploads/courses/course-sub-categories/' . $imageName;
            }

            // Update the sub-category
            DB::table('par_course_sub_categories')
                ->where('id', $id)
                ->update([
                    'sub_category_name' => $request->input('sub_category_name'),
                    'sub_category_status' => $request->input('sub_category_status'),
                    'sub_category_image' => $imagePath,
                    'updated_by' => $userEmail,
                    'updated_at' => now(),
                ]);

            // Fetch the updated sub-category data for audit trail
            $updatedSubCategory = DB::table('par_course_sub_categories')->find($id);

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_course_sub_categories',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedSubCategory),
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
                'message' => 'Course sub-category updated successfully',
                'data' => $updatedSubCategory
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
        $subCategory = DB::table('par_course_sub_categories')->find($id);

        if (!$subCategory) {
            return response()->json(['message' => 'Course sub-category not found'], 404);
        }

        // Audit trail - store the data before deleting
        $oldData = json_encode($subCategory);

        DB::table('par_course_sub_categories')->where('id', $id)->delete();

        // Audit trail logic for delete
        $auditTrailData = [
            'table_name' => 'par_course_sub_categories',
            'table_action' => 'delete',
            'previous_tabledata' => $oldData,
            'current_tabledata' => null,
            'user_id' => auth()->id(),
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            $auditTrailData['previous_tabledata'],
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Course sub-category deleted successfully'
        ], 200);
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

        // Retrieve the sub-categories matching the provided IDs
        $subCategories = DB::table('par_course_sub_categories')->whereIn('id', $ids)->get();

        // If no sub-categories are found, return 404
        if ($subCategories->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Course sub-categories not found'
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
            foreach ($subCategories as $subCategory) {
                $previousData = (array)$subCategory;

                $auditTrailData = [
                    'table_name' => 'par_course_sub_categories',
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

            // Delete the sub-categories and return the count of deleted records
            $deletedCount = DB::table('par_course_sub_categories')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Course sub-category(ies) deleted successfully'
            ], 200);

        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}
