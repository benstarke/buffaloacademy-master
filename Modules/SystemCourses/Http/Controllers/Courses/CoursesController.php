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

class CoursesController extends Controller
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
        $courses = DB::table('par_courses')->latest()->get();

        // Add duration field 
        $courses = $courses->map(function ($course) {
            $createdDate = Carbon::parse($course->created_at);
            $course->duration = $createdDate->diffForHumans();
            return $course;
        });

        return response()->json([
            'success' => true,
            'data' => $courses
        ]);
    }
    
    

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $course = DB::table('par_courses')->find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        return response()->json($course);
    }

    /**
     * Method to check if course category and sub-category combination exists
     */
    public function checkCategorySubCategoryCombination(Request $request)
    {
        $courseCategoryId = $request->query('course_category_id');
        $courseSubCategoryId = $request->query('course_sub_category_id');

        // Validate inputs
        if (is_null($courseCategoryId) || is_null($courseSubCategoryId)) {
            return response()->json(['error' => 'Category and Sub-Category IDs are required'], 400);
        }

        // Check if the combination exists in the database using DB query
        $combinationExists = DB::table('par_category_sub_category_mapping')
            ->where('course_category_id', $courseCategoryId)
            ->where('course_sub_category_id', $courseSubCategoryId)
            ->exists();

        // Return the result as a JSON response
        return response()->json(['exists' => $combinationExists], 200);
    }


    /**
     * Method to get all sub-categories under a selected course category
     */
    public function getSubCategoriesByCategory($courseCategoryId)
    {
        // Fetch sub-category IDs that are mapped to the selected category
        $subCategories = DB::table('par_category_sub_category_mapping')
            ->where('course_category_id', $courseCategoryId)
            ->select('course_sub_category_id')
            ->get();

        // Return the result as a JSON response
        return response()->json($subCategories, 200);
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

            // Validate the request data
            $validator = Validator::make($request->all(), [
                'title_en' => 'required|string|max:255|unique:par_courses',
                'title_bn' => 'nullable|string|max:255',
                'course_category_id' => 'required|integer|exists:par_course_categories,id',
                'course_sub_category_id' => 'required|integer|exists:par_course_sub_categories,id',
                'course_type_id' => 'required|integer|exists:par_course_type,id',
                'course_difficulty_id' => 'required|integer|exists:par_course_difficulty,id',
                'course_tag_id' => 'required|integer|exists:par_course_tag,id',
                'course_status_id' => 'required|integer|exists:par_course_status,id',
                'currency_id'  => 'required|integer|exists:par_currency,id',
                'price' => 'nullable|numeric',
                'old_price' => 'nullable|numeric',
                'subscription_price' => 'required|numeric',
                'start_from' => 'nullable|date',
                'duration' => 'required|integer',
                'lesson' => 'nullable|integer',
                'course_code' => 'nullable|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:205824',
                'thumbnail_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:205824',
                'thumbnail_video' => 'nullable|mimetypes:video/mp4,video/avi,video/mpeg|max:205824',
                'language' => 'nullable|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            // Check if the course category and sub-category combination exists
            $courseCategoryId = $request->input('course_category_id');
            $courseSubCategoryId = $request->input('course_sub_category_id');
            $combinationExists = DB::table('par_category_sub_category_mapping')
                ->where('course_category_id', $courseCategoryId)
                ->where('course_sub_category_id', $courseSubCategoryId)
                ->exists();

            if (!$combinationExists) {
                // Ensure uniqueness of sub-category across the table
                $subCategoryExists = DB::table('par_category_sub_category_mapping')
                    ->where('course_sub_category_id', $courseSubCategoryId)
                    ->exists();

                if ($subCategoryExists) {
                    return response()->json(['error' => 'Course sub-category ID is already associated with another category.'], 400);
                }

                // Insert new category-sub-category combination
                DB::table('par_category_sub_category_mapping')->insert([
                    'course_category_id' => $courseCategoryId,
                    'course_sub_category_id' => $courseSubCategoryId,
                    'created_by' => $userEmail,
                    'created_at' => now(),
                ]);
            }

            // Image uploads
            $imagePath = null;
            $thumbnailImagePath = null;
            $thumbnailVideoPath = null;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/course-images');
                $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move($folderPath, $imageName);
                $imagePath = 'assets/uploads/courses/course-images/' . $imageName;
            }

            if ($request->hasFile('thumbnail_image')) {
                $thumbnailImage = $request->file('thumbnail_image');
                $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/course-thumbnails-images');
                $thumbnailImageName = uniqid() . '.' . $thumbnailImage->getClientOriginalExtension();
                $thumbnailImage->move($folderPath, $thumbnailImageName);
                $thumbnailImagePath = 'assets/uploads/courses/course-thumbnails-images/' . $thumbnailImageName;
            }

            if ($request->hasFile('thumbnail_video')) {
                $thumbnailVideo = $request->file('thumbnail_video');
                $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/course-thumbnails-videos');
                $videoName = uniqid() . '.' . $thumbnailVideo->getClientOriginalExtension();
                $thumbnailVideo->move($folderPath, $videoName);
                $thumbnailVideoPath = 'assets/uploads/courses/course-thumbnails-videos/' . $videoName;
            }

            // Create course record
            $courseData = [
                'title_en' => $request->input('title_en'),
                'title_bn' => $request->input('title_bn'),
                'course_category_id' => $courseCategoryId,
                'course_sub_category_id' => $courseSubCategoryId,
                'course_type_id' => $request->input('course_type_id'),
                'course_difficulty_id' => $request->input('course_difficulty_id'),
                'course_tag_id' => $request->input('course_tag_id'),
                'course_status_id' => $request->input('course_status_id'),
                'currency_id'  => $request->input('currency_id'),
                'price' => $request->input('price'),
                'old_price' => $request->input('old_price'),
                'subscription_price' => $request->input('subscription_price'),
                'start_from' => $request->input('start_from'),
                'duration' => $request->input('duration'),
                'lesson' => $request->input('lesson'),
                'course_code' => $request->input('course_code'),
                'image' => $imagePath,
                'thumbnail_image' => $thumbnailImagePath,
                'thumbnail_video' => $thumbnailVideoPath,
                'language' => $request->input('language'),
                'created_by' => $userEmail,
                'created_at' => now(),
            ];

            // Insert the course and get the ID
            $courseId = DB::table('par_courses')->insertGetId($courseData);

            // Audit trail logic for course creation
            $auditTrailData = [
                'table_name' => 'par_courses',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($courseData),
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
                'message' => 'Course created successfully',
                'data' => $courseId
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
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'title_en' => 'required|string|max:255|unique:par_courses,title_en,' . $id,
            'title_bn' => 'nullable|string|max:255',
            'course_category_id' => 'required|integer|exists:par_course_categories,id',
            'course_sub_category_id' => 'required|integer|exists:par_course_sub_categories,id',
            'course_type_id' => 'required|integer',
            'course_difficulty_id' => 'required|integer',
            'course_tag_id' => 'required|integer',
            'price' => 'nullable|numeric',
            'old_price' => 'nullable|numeric',
            'subscription_price' => 'nullable|numeric',
            'start_from' => 'nullable|date',
            'duration' => 'nullable|integer',
            'lesson' => 'nullable|integer',
            'course_code' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'thumbnail_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'thumbnail_video' => 'nullable|mimetypes:video/mp4,video/avi,video/mpeg|max:10000',
            'status' => 'required|integer|in:0,1,2',
            'language' => 'nullable|string|max:255',
            'updated_by' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Find the course by ID
        $course = DB::table('par_courses')->find($id);

        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
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

            // Store previous data for audit trail
            $previousData = (array)$course;

            // Handle image uploads if new files are provided
            $imagePath = $course->image;
            $thumbnailImagePath = $course->thumbnail_image;
            $thumbnailVideoPath = $course->thumbnail_video;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/course-images');
                $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move($folderPath, $imageName);
                $imagePath = 'assets/uploads/courses/course-images/' . $imageName;
            }

            if ($request->hasFile('thumbnail_image')) {
                $thumbnailImage = $request->file('thumbnail_image');
                $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/course-thumbnails-images');
                $thumbnailImageName = uniqid() . '.' . $thumbnailImage->getClientOriginalExtension();
                $thumbnailImage->move($folderPath, $thumbnailImageName);
                $thumbnailImagePath = 'assets/uploads/courses/course-thumbnails-images/' . $thumbnailImageName;
            }

            if ($request->hasFile('thumbnail_video')) {
                $thumbnailVideo = $request->file('thumbnail_video');
                $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/course-thumbnails-videos');
                $videoName = uniqid() . '.' . $thumbnailVideo->getClientOriginalExtension();
                $thumbnailVideo->move($folderPath, $videoName);
                $thumbnailVideoPath = 'assets/uploads/courses/course-thumbnails-videos/' . $videoName;
            }

            // Update course data
            $courseData = [
                'title_en' => $request->input('title_en'),
                'title_bn' => $request->input('title_bn'),
                'course_category_id' => $request->input('course_category_id'),
                'course_sub_category_id' => $request->input('course_sub_category_id'),
                'course_type_id' => $request->input('course_type_id'),
                'course_difficulty_id' => $request->input('course_difficulty_id'),
                'course_tag_id' => $request->input('course_tag_id'),
                'price' => $request->input('price'),
                'old_price' => $request->input('old_price'),
                'subscription_price' => $request->input('subscription_price'),
                'start_from' => $request->input('start_from'),
                'duration' => $request->input('duration'),
                'lesson' => $request->input('lesson'),
                'course_code' => $request->input('course_code'),
                'image' => $imagePath,
                'thumbnail_image' => $thumbnailImagePath,
                'thumbnail_video' => $thumbnailVideoPath,
                'status' => $request->input('status'),
                'language' => $request->input('language'),
                'updated_by' => $userEmail,
                'updated_at' => now(),
            ];

            DB::table('par_courses')->where('id', $id)->update($courseData);

            // Fetch the updated course data for audit trail
            $updatedCourse = DB::table('par_courses')->find($id);

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_courses',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedCourse),
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
                'message' => 'Course updated successfully',
                'data' => $updatedCourse
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
        $course = DB::table('par_courses')->find($id);

        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
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
            $previousData = (array)$course;

            $auditTrailData = [
                'table_name' => 'par_courses',
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

            // Delete the course
            DB::table('par_courses')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Course deleted successfully'
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

        $courses = DB::table('par_courses')->whereIn('id', $ids)->get();

        if ($courses->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Courses not found'
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
            foreach ($courses as $course) {
                $previousData = (array)$course;

                $auditTrailData = [
                    'table_name' => 'par_courses',
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
            $deletedCount = DB::table('par_courses')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Course(s) deleted successfully'
            ], 200);

        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


}
