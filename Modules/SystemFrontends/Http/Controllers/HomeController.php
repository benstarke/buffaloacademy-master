<?php

namespace Modules\SystemFrontends\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    // Method 1: Queries only courses
    public function getCourses()
    {
        $courses = DB::table('par_courses')->get();

        return response()->json($courses, 200);
    }

    // Method 2: Queries only course categories
    public function getCourseCategories()
    {
        $courseCategories = DB::table('par_course_categories')->get();

        return response()->json($courseCategories, 200);
    }

    // return course category with its respective courses
    public function getCourseCategoriesWithCourses()
    {
        $courseCategories = DB::table('par_course_categories')
            ->leftJoin('par_courses', 'par_course_categories.id', '=', 'par_courses.course_category_id')
            ->select(
                'par_course_categories.id',
                'par_course_categories.category_name',
                'par_course_categories.category_status',
                'par_course_categories.category_image',
                'par_course_categories.created_by',
                'par_course_categories.created_at',
                'par_course_categories.updated_by',
                'par_course_categories.updated_at',
                'par_course_categories.altered_by',
                'par_course_categories.altered_at',
                DB::raw('COUNT(par_courses.id) as course_count')
            )
            ->groupBy(
                'par_course_categories.id',
                'par_course_categories.category_name',
                'par_course_categories.category_status',
                'par_course_categories.category_image',
                'par_course_categories.created_by',
                'par_course_categories.created_at',
                'par_course_categories.updated_by',
                'par_course_categories.updated_at',
                'par_course_categories.altered_by',
                'par_course_categories.altered_at'
            )
            ->get();

        $courseCategories = $courseCategories->map(function ($category) {
            $category->courses = DB::table('par_courses')
                ->leftJoin('par_course_categories', 'par_courses.course_category_id', '=', 'par_course_categories.id')
                ->leftJoin('par_course_sub_categories', 'par_courses.course_sub_category_id', '=', 'par_course_sub_categories.id')
                ->leftJoin('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
                ->leftJoin('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
                ->leftJoin('par_course_type', 'par_courses.course_type_id', '=', 'par_course_type.id')
                ->leftJoin('par_course_tag', 'par_courses.course_tag_id', '=', 'par_course_tag.id')
                ->leftJoin('par_course_difficulty', 'par_courses.course_difficulty_id', '=', 'par_course_difficulty.id')
                ->select(
                    'par_courses.id',
                    'par_courses.title_en',
                    'par_courses.title_bn',
                    // 'par_courses.description_en',
                    // 'par_courses.description_bn',
                    'par_courses.course_category_id',
                    'par_courses.course_sub_category_id',
                    'par_courses.course_type_id',
                    'par_courses.course_difficulty_id',
                    'par_courses.course_tag_id',
                    'par_courses.price',
                    'par_courses.old_price',
                    'par_courses.subscription_price',
                    'par_courses.start_from',
                    'par_courses.duration',
                    'par_courses.lesson',
                    // 'par_courses.prerequisites_en',
                    // 'par_courses.prerequisites_bn',
                    'par_courses.course_code',
                    'par_courses.image',
                    'par_courses.thumbnail_image',
                    'par_courses.thumbnail_video',
                    'par_courses.status',
                    'par_courses.language',
                    'par_courses.created_by',
                    'par_courses.created_at',
                    'par_courses.updated_by',
                    'par_courses.updated_at',
                    'par_courses.altered_by',
                    'par_courses.altered_at',
                    'par_course_categories.category_name',
                    'par_course_sub_categories.sub_category_name',
                    'par_instructors.id as instructor_id',
                    'par_instructors.name_en as instructor_name',
                    'par_instructors.email as instructor_email',
                    'par_instructors.image as instructor_image',
                    'par_course_type.name as course_type_name',
                    'par_course_tag.name as course_tag_name',
                    'par_course_difficulty.name as course_difficulty_name'
                )
                ->where('par_courses.course_category_id', $category->id)
                ->whereNotNull('par_instructors.id') // REMOVE/ADD THIS TO GET COURSES WITH ATLEAST AN INSTRUCTOR
                ->get();
            return $category;
        });

        return response()->json($courseCategories, 200);
    }


    // return all the courses that belong to the "Design" category
    public function getCoursesForDesignCategory()
    {
        $designCategoryName = 'Design'; // Specify the category name here

        // Fetch the courses for the specified category
        $courses = DB::table('par_courses')
            ->leftJoin('par_course_categories', 'par_courses.course_category_id', '=', 'par_course_categories.id')
            ->leftJoin('par_course_sub_categories', 'par_courses.course_sub_category_id', '=', 'par_course_sub_categories.id')
            ->leftJoin('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
            ->leftJoin('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
            ->leftJoin('par_course_type', 'par_courses.course_type_id', '=', 'par_course_type.id')
            ->leftJoin('par_course_tag', 'par_courses.course_tag_id', '=', 'par_course_tag.id')
            ->leftJoin('par_course_difficulty', 'par_courses.course_difficulty_id', '=', 'par_course_difficulty.id')
            ->select(
                'par_courses.id',
                'par_courses.title_en',
                'par_courses.title_bn',
                // 'par_courses.description_en',
                // 'par_courses.description_bn',
                'par_courses.course_category_id',
                'par_courses.course_sub_category_id',
                'par_courses.course_type_id',
                'par_courses.course_difficulty_id',
                'par_courses.course_tag_id',
                'par_courses.price',
                'par_courses.old_price',
                'par_courses.subscription_price',
                'par_courses.start_from',
                'par_courses.duration',
                'par_courses.lesson',
                // 'par_courses.prerequisites_en',
                // 'par_courses.prerequisites_bn',
                'par_courses.course_code',
                'par_courses.image',
                'par_courses.thumbnail_image',
                'par_courses.thumbnail_video',
                'par_courses.status',
                'par_courses.language',
                'par_courses.created_by',
                'par_courses.created_at',
                'par_courses.updated_by',
                'par_courses.updated_at',
                'par_courses.altered_by',
                'par_courses.altered_at',
                'par_course_categories.category_name',
                'par_course_sub_categories.sub_category_name',
                'par_instructors.id as instructor_id',
                'par_instructors.name_en as instructor_name',
                'par_instructors.email as instructor_email',
                'par_instructors.image as instructor_image',
                'par_course_type.name as course_type_name',
                'par_course_tag.name as course_tag_name',
                'par_course_difficulty.name as course_difficulty_name'
            )
            ->where('par_course_categories.category_name', $designCategoryName)
            ->whereNotNull('par_instructors.id') // REMOVE/ADD THIS TO GET COURSES WITH ATLEAST AN INSTRUCTOR
            ->get();

        return response()->json($courses, 200);
    }


    // return all the courses that belong to the "Business" category
    public function getCoursesForBusinessCategory()
    {
        $businessCategoryName = 'Business'; // Specify the category name here

        // Fetch the courses for the specified category
        $courses = DB::table('par_courses')
            ->leftJoin('par_course_categories', 'par_courses.course_category_id', '=', 'par_course_categories.id')
            ->leftJoin('par_course_sub_categories', 'par_courses.course_sub_category_id', '=', 'par_course_sub_categories.id')
            ->leftJoin('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
            ->leftJoin('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
            ->leftJoin('par_course_type', 'par_courses.course_type_id', '=', 'par_course_type.id')
            ->leftJoin('par_course_tag', 'par_courses.course_tag_id', '=', 'par_course_tag.id')
            ->leftJoin('par_course_difficulty', 'par_courses.course_difficulty_id', '=', 'par_course_difficulty.id')
            ->select(
                'par_courses.id',
                'par_courses.title_en',
                'par_courses.title_bn',
                // 'par_courses.description_en',
                // 'par_courses.description_bn',
                'par_courses.course_category_id',
                'par_courses.course_sub_category_id',
                'par_courses.course_type_id',
                'par_courses.course_difficulty_id',
                'par_courses.course_tag_id',
                'par_courses.price',
                'par_courses.old_price',
                'par_courses.subscription_price',
                'par_courses.start_from',
                'par_courses.duration',
                'par_courses.lesson',
                // 'par_courses.prerequisites_en',
                // 'par_courses.prerequisites_bn',
                'par_courses.course_code',
                'par_courses.image',
                'par_courses.thumbnail_image',
                'par_courses.thumbnail_video',
                'par_courses.status',
                'par_courses.language',
                'par_courses.created_by',
                'par_courses.created_at',
                'par_courses.updated_by',
                'par_courses.updated_at',
                'par_courses.altered_by',
                'par_courses.altered_at',
                'par_course_categories.category_name',
                'par_course_sub_categories.sub_category_name',
                'par_instructors.id as instructor_id',
                'par_instructors.name_en as instructor_name',
                'par_instructors.email as instructor_email',
                'par_instructors.image as instructor_image',
                'par_course_type.name as course_type_name',
                'par_course_tag.name as course_tag_name',
                'par_course_difficulty.name as course_difficulty_name'
            )
            ->where('par_course_categories.category_name', $businessCategoryName)
            ->whereNotNull('par_instructors.id') // REMOVE/ADD THIS TO GET COURSES WITH ATLEAST AN INSTRUCTOR
            ->get();

        return response()->json($courses, 200);
    }


    // return all the courses that belong to the "Development" category
    public function getCoursesForDevelopmentCategory()
    {
        $developmentCategoryName = 'Development'; // Specify the category name here

        // Fetch the courses for the specified category
        $courses = DB::table('par_courses')
            ->leftJoin('par_course_categories', 'par_courses.course_category_id', '=', 'par_course_categories.id')
            ->leftJoin('par_course_sub_categories', 'par_courses.course_sub_category_id', '=', 'par_course_sub_categories.id')
            ->leftJoin('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
            ->leftJoin('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
            ->leftJoin('par_course_type', 'par_courses.course_type_id', '=', 'par_course_type.id')
            ->leftJoin('par_course_tag', 'par_courses.course_tag_id', '=', 'par_course_tag.id')
            ->leftJoin('par_course_difficulty', 'par_courses.course_difficulty_id', '=', 'par_course_difficulty.id')
            ->select(
                'par_courses.id',
                'par_courses.title_en',
                'par_courses.title_bn',
                // 'par_courses.description_en',
                // 'par_courses.description_bn',
                'par_courses.course_category_id',
                'par_courses.course_sub_category_id',
                'par_courses.course_type_id',
                'par_courses.course_difficulty_id',
                'par_courses.course_tag_id',
                'par_courses.price',
                'par_courses.old_price',
                'par_courses.subscription_price',
                'par_courses.start_from',
                'par_courses.duration',
                'par_courses.lesson',
                // 'par_courses.prerequisites_en',
                // 'par_courses.prerequisites_bn',
                'par_courses.course_code',
                'par_courses.image',
                'par_courses.thumbnail_image',
                'par_courses.thumbnail_video',
                'par_courses.status',
                'par_courses.language',
                'par_courses.created_by',
                'par_courses.created_at',
                'par_courses.updated_by',
                'par_courses.updated_at',
                'par_courses.altered_by',
                'par_courses.altered_at',
                'par_course_categories.category_name',
                'par_course_sub_categories.sub_category_name',
                'par_instructors.id as instructor_id',
                'par_instructors.name_en as instructor_name',
                'par_instructors.email as instructor_email',
                'par_instructors.image as instructor_image',
                'par_course_type.name as course_type_name',
                'par_course_tag.name as course_tag_name',
                'par_course_difficulty.name as course_difficulty_name'
            )
            ->where('par_course_categories.category_name', $developmentCategoryName)
            ->whereNotNull('par_instructors.id') // REMOVE/ADD THIS TO GET COURSES WITH ATLEAST AN INSTRUCTOR
            ->get();

        return response()->json($courses, 200);
    }



    // return all the courses that belong to the "Software" category
    public function getCoursesForSoftwareCategory()
    {
        $softwareCategoryName = 'Software'; // Specify the category name here

        // Fetch the courses for the specified category
        $courses = DB::table('par_courses')
            ->leftJoin('par_course_categories', 'par_courses.course_category_id', '=', 'par_course_categories.id')
            ->leftJoin('par_course_sub_categories', 'par_courses.course_sub_category_id', '=', 'par_course_sub_categories.id')
            ->leftJoin('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
            ->leftJoin('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
            ->leftJoin('par_course_type', 'par_courses.course_type_id', '=', 'par_course_type.id')
            ->leftJoin('par_course_tag', 'par_courses.course_tag_id', '=', 'par_course_tag.id')
            ->leftJoin('par_course_difficulty', 'par_courses.course_difficulty_id', '=', 'par_course_difficulty.id')
            ->select(
                'par_courses.id',
                'par_courses.title_en',
                'par_courses.title_bn',
                // 'par_courses.description_en',
                // 'par_courses.description_bn',
                'par_courses.course_category_id',
                'par_courses.course_sub_category_id',
                'par_courses.course_type_id',
                'par_courses.course_difficulty_id',
                'par_courses.course_tag_id',
                'par_courses.price',
                'par_courses.old_price',
                'par_courses.subscription_price',
                'par_courses.start_from',
                'par_courses.duration',
                'par_courses.lesson',
                // 'par_courses.prerequisites_en',
                // 'par_courses.prerequisites_bn',
                'par_courses.course_code',
                'par_courses.image',
                'par_courses.thumbnail_image',
                'par_courses.thumbnail_video',
                'par_courses.status',
                'par_courses.language',
                'par_courses.created_by',
                'par_courses.created_at',
                'par_courses.updated_by',
                'par_courses.updated_at',
                'par_courses.altered_by',
                'par_courses.altered_at',
                'par_course_categories.category_name',
                'par_course_sub_categories.sub_category_name',
                'par_instructors.id as instructor_id',
                'par_instructors.name_en as instructor_name',
                'par_instructors.email as instructor_email',
                'par_instructors.image as instructor_image',
                'par_course_type.name as course_type_name',
                'par_course_tag.name as course_tag_name',
                'par_course_difficulty.name as course_difficulty_name'
            )
            ->where('par_course_categories.category_name', $softwareCategoryName)
            ->whereNotNull('par_instructors.id') // REMOVE/ADD THIS TO GET COURSES WITH ATLEAST AN INSTRUCTOR
            ->get();

        return response()->json($courses, 200);
    }

    // return testimonials information from students
    public function getReviewsWithDetails()
    {
        $reviews = DB::table('par_reviews')
            ->join('par_students', 'par_reviews.student_id', '=', 'par_students.id')
            ->join('par_courses', 'par_reviews.course_id', '=', 'par_courses.id')
            ->select(
                'par_reviews.comment',
                'par_reviews.rating',
                'par_students.image as student_image',
                'par_students.name_en as student_name',
                'par_students.profession as student_profession',
                'par_courses.title_en as course_title'
            )
            ->get();

        return response()->json($reviews, 200);
    }




    // Method 3: Queries only course subcategories
    public function getCourseSubCategories()
    {
        $courseSubCategories = DB::table('par_course_sub_categories')->get();

        return response()->json($courseSubCategories, 200);
    }

    // Method 4: Queries courses with related course categories, related course subcategories, and instructors
    public function getCoursesWithDetails()
    {
        $courses = DB::table('par_courses')
            ->leftJoin('par_course_categories', 'par_courses.course_category_id', '=', 'par_course_categories.id')
            ->leftJoin('par_course_sub_categories', 'par_courses.course_sub_category_id', '=', 'par_course_sub_categories.id')
            ->leftJoin('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
            ->leftJoin('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
            ->leftJoin('par_course_type', 'par_courses.course_type_id', '=', 'par_course_type.id')
            ->leftJoin('par_course_tag', 'par_courses.course_tag_id', '=', 'par_course_tag.id')
            ->leftJoin('par_course_difficulty', 'par_courses.course_difficulty_id', '=', 'par_course_difficulty.id')
            ->select(
                'par_courses.*',
                'par_course_categories.category_name',
                'par_course_sub_categories.sub_category_name',
                'par_instructors.id as instructor_id',
                'par_instructors.name_en as instructor_name',
                'par_instructors.bio as instructor_bio',
                'par_instructors.designation as instructor_designation',
                'par_instructors.email as instructor_email',
                'par_instructors.image as instructor_image',
                'par_course_type.name as course_type_name',
                'par_course_tag.name as course_tag_name',
                'par_course_difficulty.name as course_difficulty_name'
            )
            ->whereNotNull('par_instructors.id') // REMOVE/ADD THIS TO GET COURSES WITH ATLEAST AN INSTRUCTOR
            ->get();

        return response()->json($courses, 200);
    }


    public function getCoursesWithDetailsID($courseId)
    {
        $course = DB::table('par_courses')
            ->leftJoin('par_course_categories', 'par_courses.course_category_id', '=', 'par_course_categories.id')
            ->leftJoin('par_course_sub_categories', 'par_courses.course_sub_category_id', '=', 'par_course_sub_categories.id')
            ->leftJoin('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
            ->leftJoin('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
            ->leftJoin('par_course_type', 'par_courses.course_type_id', '=', 'par_course_type.id')
            ->leftJoin('par_course_tag', 'par_courses.course_tag_id', '=', 'par_course_tag.id')
            ->leftJoin('par_course_difficulty', 'par_courses.course_difficulty_id', '=', 'par_course_difficulty.id')
            ->select(
                'par_courses.*',
                'par_course_categories.category_name',
                'par_course_sub_categories.sub_category_name',
                'par_instructors.id as instructor_id',
                'par_instructors.name_en as instructor_name',
                'par_instructors.bio as instructor_bio',
                'par_instructors.designation as instructor_designation',
                'par_instructors.email as instructor_email',
                'par_instructors.image as instructor_image',
                'par_course_type.name as course_type_name',
                'par_course_tag.name as course_tag_name',
                'par_course_difficulty.name as course_difficulty_name'
            )
            ->where('par_courses.id', $courseId)
            ->first();

        if ($course) {
            return response()->json($course, 200);
        } else {
            return response()->json(['message' => 'Course not found'], 404);
        }
    }


    public function getTotalEnrolledCount($courseId)
    {
        $totalEnrolled = DB::table('par_enrollments')
            ->where('course_id', $courseId)
            ->count();

        return response()->json(['total_enrolled' => $totalEnrolled]);
    }

    public function getCourseOverview($courseId)
    {
        // Validate the courseId to be an integer
        if (!is_numeric($courseId) || $courseId <= 0) {
            return response()->json(['error' => 'Invalid course ID'], 400);
        }

        // Fetch the course overview from the database
        $courseOverview = DB::table('par_course_overview')
            ->where('course_id', $courseId)
            ->first();

        // Check if the course overview exists
        if (!$courseOverview) {
            return response()->json(['error' => 'Course overview not found'], 404);
        }

        return response()->json($courseOverview, 200);
    }



    // Method 5: Queries only course difficulty
    public function getCourseDifficulty()
    {
        $course_difficulty = DB::table('par_course_difficulty')->get();

        return response()->json($course_difficulty, 200);
    }


    // SEARCH course
    public function search(Request $request)
{
    try {
        $query = DB::table('par_courses');

        if ($request->has('searchText') && !empty($request->searchText)) {
            $searchText = $request->searchText;
            $query->where(function ($q) use ($searchText) {
                $q->where('title_en', 'like', '%' . $searchText . '%')
                  ->orWhere('description_en', 'like', '%' . $searchText . '%')
                  ->orWhere('prerequisites_en', 'like', '%' . $searchText . '%');
            });
        }

        $courses = $query->get();

        return response()->json($courses);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
    }
}


}

