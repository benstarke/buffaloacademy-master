<?php

namespace Modules\SystemFrontends\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CourseController extends Controller{
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
                ->where('course_category_id', $category->id)
                ->get();
            return $category;
        });

        return response()->json($courseCategories, 200);
    }


    // Method 3: Queries only course subcategories
    public function getCourseSubCategories()
    {
        $courseSubCategories = DB::table('par_course_sub_categories')->get();

        return response()->json($courseSubCategories, 200);
    }

    // Method 4: Queries courses with related course categories, related course subcategories, and instructors
    // public function getCoursesWithDetails()
    // {
    //     $courses = DB::table('par_courses')
    //         ->leftJoin('par_course_categories', 'par_courses.course_category_id', '=', 'par_course_categories.id')
    //         ->leftJoin('par_course_sub_categories', 'par_courses.course_sub_category_id', '=', 'par_course_sub_categories.id')
    //         ->leftJoin('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
    //         ->leftJoin('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
    //         ->leftJoin('par_course_type', 'par_courses.course_type_id', '=', 'par_course_type.id')
    //         ->leftJoin('par_course_tag', 'par_courses.course_tag_id', '=', 'par_course_tag.id')
    //         ->leftJoin('par_course_difficulty', 'par_courses.course_difficulty_id', '=', 'par_course_difficulty.id')
    //         ->select(
    //             'par_courses.*',
    //             'par_course_categories.category_name',
    //             'par_course_sub_categories.sub_category_name',
    //             'par_instructors.name_en as instructor_name',
    //             'par_instructors.email as instructor_email',
    //             'par_instructors.image as instructor_image',
    //             'par_course_type.name as course_type_name',
    //             'par_course_tag.name as course_tag_name',
    //             'par_course_difficulty.name as course_difficulty_name'
    //         )
    //         ->get();

    //     return response()->json($courses, 200);
    // }


    // Method 5: Queries only course difficulty
    public function getCourseDifficulty()
    {
        $course_difficulty = DB::table('par_course_difficulty')->get();

        return response()->json($course_difficulty, 200);
    }


    // SEARCH
    public function search(Request $request)
{
    try {
        $query = DB::table('par_courses');

        if ($request->has('searchText') && !empty($request->searchText)) {
            $searchText = $request->searchText;
            $query->where(function ($q) use ($searchText) {
                $q->where('title_en', 'like', '%' . $searchText . '%');
                //   ->orWhere('description_en', 'like', '%' . $searchText . '%')
                //   ->orWhere('prerequisites_en', 'like', '%' . $searchText . '%');
            });
        }

        // Apply filters
        if ($request->has('selectedSubCategories') && !empty($request->selectedSubCategories)) {
            $query->whereIn('course_sub_category_id', explode(',', $request->selectedSubCategories));
        }

        if ($request->has('selectedLevels') && !empty($request->selectedLevels)) {
            $query->whereIn('course_difficulty_id', explode(',', $request->selectedLevels));
        }

        if ($request->has('minPrice') && $request->has('maxPrice')) {
            $query->whereBetween('price', [(float)$request->minPrice, (float)$request->maxPrice]);
        }

        if ($request->has('selectedDurations') && is_array($request->selectedDurations)) {
            $query->where(function ($q) use ($request) {
                foreach ($request->selectedDurations as $range) {
                    if (isset($range['min']) && isset($range['max'])) {
                        $min = (int)$range['min'];
                        $max = (int)$range['max'];
                        $q->orWhereBetween('duration', [$min, $max]);
                    } elseif (isset($range['min'])) {
                        $min = (int)$range['min'];
                        $q->orWhere('duration', '>=', $min);
                    }
                }
            });
        }

        $courses = $query->get();

        return response()->json($courses);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
    }
}


}

