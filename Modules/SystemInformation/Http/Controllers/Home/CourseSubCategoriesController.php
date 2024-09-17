<?php

namespace Modules\SystemInformation\Http\Controllers\Home;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class CourseSubCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    // return all subcategories 
    public function index()
    {
        $courseSubCategories = DB::table('par_course_sub_categories')->get();
        return response()->json($courseSubCategories);
    }

    public function show($id)
    {
        $courseSubCategory = DB::table('par_course_sub_categories')->find($id);

        if (!$courseSubCategory) {
            return response()->json(['message' => 'Course sub-category not found'], 404);
        }

        return response()->json($courseSubCategory);
    }

    // return all subcategories along with the count of courses
    public function indexWithCourseCount()
    {
        $courseSubCategories = DB::table('par_course_sub_categories')
            ->leftJoin('par_courses', 'par_course_sub_categories.id', '=', 'par_courses.course_sub_category_id')
            ->select(
                'par_course_sub_categories.id',
                'par_course_sub_categories.sub_category_name',
                'par_course_sub_categories.sub_category_status',
                'par_course_sub_categories.sub_category_image',
                'par_course_sub_categories.created_by',
                'par_course_sub_categories.created_at',
                'par_course_sub_categories.updated_by',
                'par_course_sub_categories.updated_at',
                'par_course_sub_categories.altered_by',
                'par_course_sub_categories.altered_at',
                DB::raw('COUNT(par_courses.id) as course_count')
            )
            ->groupBy(
                'par_course_sub_categories.id',
                'par_course_sub_categories.sub_category_name',
                'par_course_sub_categories.sub_category_status',
                'par_course_sub_categories.sub_category_image',
                'par_course_sub_categories.created_by',
                'par_course_sub_categories.created_at',
                'par_course_sub_categories.updated_by',
                'par_course_sub_categories.updated_at',
                'par_course_sub_categories.altered_by',
                'par_course_sub_categories.altered_at'
            )
            ->get();

        return response()->json($courseSubCategories);
    }

    // return one subcategory along with the count of courses
    public function showWithCourseCount($id)
    {
        $courseSubCategory = DB::table('par_course_sub_categories')
            ->leftJoin('par_courses', 'par_course_sub_categories.id', '=', 'par_courses.course_sub_category_id')
            ->select(
                'par_course_sub_categories.id',
                'par_course_sub_categories.sub_category_name',
                'par_course_sub_categories.sub_category_status',
                'par_course_sub_categories.sub_category_image',
                'par_course_sub_categories.created_by',
                'par_course_sub_categories.created_at',
                'par_course_sub_categories.updated_by',
                'par_course_sub_categories.updated_at',
                'par_course_sub_categories.altered_by',
                'par_course_sub_categories.altered_at',
                DB::raw('COUNT(par_courses.id) as course_count')
            )
            ->where('par_course_sub_categories.id', $id)
            ->groupBy(
                'par_course_sub_categories.id',
                'par_course_sub_categories.sub_category_name',
                'par_course_sub_categories.sub_category_status',
                'par_course_sub_categories.sub_category_image',
                'par_course_sub_categories.created_by',
                'par_course_sub_categories.created_at',
                'par_course_sub_categories.updated_by',
                'par_course_sub_categories.updated_at',
                'par_course_sub_categories.altered_by',
                'par_course_sub_categories.altered_at'
            )
            ->first();

        if ($courseSubCategory) {
            return response()->json($courseSubCategory);
        } else {
            return response()->json(['message' => 'Subcategory not found'], 404);
        }
    }



    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('systeminformation::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        return view('systeminformation::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        //
    }
}
