<?php

namespace Modules\SystemAuthentication\Http\Controllers\Instructors;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class DashboardsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $instructors = DB::table('par_instructors')->get();
        return response()->json($instructors);
    }

    public function getInstructorInfo($id)
    {
        try {
            // Fetch instructor information
            $instructor = DB::table('par_instructors')->where('id', $id)->first();

            if (!$instructor) {
                return response()->json(['message' => 'Instructor not found'], 404);
            }

            return response()->json($instructor);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching instructor info', 'error' => $e->getMessage()], 500);
        }
    }

    public function getInstructorEnrollmentCount($instructorId)
    {
        $enrollmentCount = DB::table('par_enrollments')
            ->join('par_course_instructors', 'par_enrollments.course_id', '=', 'par_course_instructors.course_id')
            ->where('par_course_instructors.instructor_id', $instructorId)
            ->count();

        return response()->json(['enrollmentCount' => $enrollmentCount]);
    }

    // FOR INSTRUCTOR PROFILE
    public function getCoursesCount($instructorId)
    {
        $courseCount = DB::table('par_course_instructors')
            ->where('instructor_id', $instructorId)
            ->count();

        return response()->json(['course_count' => $courseCount]);
    }


    // public function getCoursesRelatedToInstructor($instructorId)
    // {
    //     $instructor = DB::table('par_instructors')->where('id', $instructorId)->first();

    //     if (!$instructor) {
    //         return response()->json(['error' => 'Instructor not found'], 404);
    //     }

    //     $courses = DB::table('par_courses')
    //         ->join('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
    //         ->where('par_course_instructors.instructor_id', $instructorId)
    //         ->select('par_courses.*')
    //         ->get();

    //     return response()->json([
    //         'instructor' => [
    //             'id' => $instructor->id,
    //             'name' => $instructor->name_en
    //         ],
    //         'courses' => $courses
    //     ]);
    // }

    public function getCoursesRelatedToInstructor($instructorId)
    {
        // Check if the instructor exists
        $instructor = DB::table('par_instructors')->where('id', $instructorId)->first();

        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found'], 404);
        }

        // Retrieve courses with detailed information related to the instructor
        $courses = DB::table('par_courses')
            ->join('par_course_instructors', 'par_courses.id', '=', 'par_course_instructors.course_id')
            ->leftJoin('par_course_categories', 'par_courses.course_category_id', '=', 'par_course_categories.id')
            ->leftJoin('par_course_sub_categories', 'par_courses.course_sub_category_id', '=', 'par_course_sub_categories.id')
            ->leftJoin('par_instructors', 'par_course_instructors.instructor_id', '=', 'par_instructors.id')
            ->leftJoin('par_course_type', 'par_courses.course_type_id', '=', 'par_course_type.id')
            ->leftJoin('par_course_tag', 'par_courses.course_tag_id', '=', 'par_course_tag.id')
            ->leftJoin('par_course_difficulty', 'par_courses.course_difficulty_id', '=', 'par_course_difficulty.id')
            ->where('par_course_instructors.instructor_id', $instructorId)
            ->select(
                'par_courses.*',
                'par_course_categories.category_name',
                'par_course_sub_categories.sub_category_name',
                'par_instructors.id as instructor_id',
                'par_instructors.name_en as instructor_name',
                'par_instructors.designation as instructor_designation',
                'par_instructors.email as instructor_email',
                'par_instructors.image as instructor_image',
                'par_course_type.name as course_type_name',
                'par_course_tag.name as course_tag_name',
                'par_course_difficulty.name as course_difficulty_name'
            )
            ->get();

        return response()->json([
            'instructor' => [
                'id' => $instructor->id,
                'name' => $instructor->name_en,
                'designation' => $instructor->designation,
                'email' => $instructor->email,
                'image' => $instructor->image,
            ],
            'courses' => $courses
        ]);
    }


    public function getEducationRelatedToInstructor($instructorId)
    {
        $instructor = DB::table('par_instructors')->where('id', $instructorId)->first();

        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found'], 404);
        }

        $education = DB::table('par_instructor_education')
            ->where('instructor_id', $instructorId)
            ->select('level_name', 'level_description', 'year_study')
            ->get();

        return response()->json([
            'instructor' => [
                'id' => $instructor->id,
                'name' => $instructor->name_en
            ],
            'education' => $education
        ]);
    }


    public function getExperienceRelatedToInstructor($instructorId)
    {
        $instructor = DB::table('par_instructors')->where('id', $instructorId)->first();

        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found'], 404);
        }

        $experience = DB::table('par_instructor_experience')
            ->where('instructor_id', $instructorId)
            ->select('experience_name', 'experience_description', 'experience_year')
            ->get();

        return response()->json([
            'instructor' => [
                'id' => $instructor->id,
                'name' => $instructor->name_en
            ],
            'experience' => $experience
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $instructor = DB::table('par_instructors')->find($id);

        if (!$instructor) {
            return response()->json(['message' => 'Instructor not found'], 404);
        }

        return response()->json($instructor);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name_en' => 'required|string|max:255',
            'name_bn' => 'nullable|string|max:255',
            'contact_en' => 'required|string|max:255',
            'contact_bn' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:par_instructors,email',
            'role_id' => 'required|integer',
            'bio' => 'nullable|string',
            'title' => 'nullable|string|max:255',
            'designation' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|integer|in:0,1',
            'password' => 'required|string|min:8',
            'language' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'created_by' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $imagePath = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/instructors');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move($folderPath, $imageName);
            $imagePath = 'assets/uploads/instructors/' . $imageName;
        }

        $instructorData = [
            'name_en' => $request->input('name_en'),
            'name_bn' => $request->input('name_bn'),
            'contact_en' => $request->input('contact_en'),
            'contact_bn' => $request->input('contact_bn'),
            'email' => $request->input('email'),
            'role_id' => $request->input('role_id'),
            'bio' => $request->input('bio'),
            'title' => $request->input('title'),
            'designation' => $request->input('designation'),
            'image' => $imagePath,
            'status' => $request->input('status'),
            'password' => bcrypt($request->input('password')),
            'language' => $request->input('language'),
            'instagram' => $request->input('instagram'),
            'linkedin' => $request->input('linkedin'),
            'twitter' => $request->input('twitter'),
            'youtube' => $request->input('youtube'),
            'facebook' => $request->input('facebook'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ];

        $instructorId = DB::table('par_instructors')->insertGetId($instructorData);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_instructors',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($instructorData),
            'user_id' => auth()->id(),
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Instructor created successfully',
            'data' => $instructorId
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $instructor = DB::table('par_instructors')->find($id);

        if (!$instructor) {
            return response()->json(['message' => 'Instructor not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name_en' => 'required|string|max:255',
            'name_bn' => 'nullable|string|max:255',
            'contact_en' => 'required|string|max:255',
            'contact_bn' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:par_instructors,email,' . $id,
            'role_id' => 'required|integer',
            'bio' => 'nullable|string',
            'title' => 'nullable|string|max:255',
            'designation' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|integer|in:0,1',
            'password' => 'nullable|string|min:8',
            'language' => 'required|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'updated_by' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $oldData = (array)$instructor;

        $imagePath = $instructor->image;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/instructors');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move($folderPath, $imageName);
            $imagePath = 'assets/uploads/instructors/' . $imageName;
        }

        $updateData = [
            'name_en' => $request->input('name_en'),
            'name_bn' => $request->input('name_bn'),
            'contact_en' => $request->input('contact_en'),
            'contact_bn' => $request->input('contact_bn'),
            'email' => $request->input('email'),
            'role_id' => $request->input('role_id'),
            'bio' => $request->input('bio'),
            'title' => $request->input('title'),
            'designation' => $request->input('designation'),
            'image' => $imagePath,
            'status' => $request->input('status'),
            'password' => $request->input('password') ? bcrypt($request->input('password')) : $instructor->password,
            'language' => $request->input('language'),
            'instagram' => $request->input('instagram'),
            'linkedin' => $request->input('linkedin'),
            'twitter' => $request->input('twitter'),
            'youtube' => $request->input('youtube'),
            'facebook' => $request->input('facebook'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ];

        DB::table('par_instructors')->where('id', $id)->update($updateData);

        // Audit trail logic for update
        $newData = DB::table('par_instructors')->find($id);

        $auditTrailData = [
            'table_name' => 'par_instructors',
            'table_action' => 'update',
            'previous_tabledata' => json_encode($oldData),
            'current_tabledata' => json_encode($newData),
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
            'message' => 'Instructor updated successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $instructor = DB::table('par_instructors')->find($id);

        if (!$instructor) {
            return response()->json(['message' => 'Instructor not found'], 404);
        }

        DB::table('par_instructors')->where('id', $id)->delete();

        // Audit trail logic for deletion
        $auditTrailData = [
            'table_name' => 'par_instructors',
            'table_action' => 'delete',
            'previous_tabledata' => json_encode($instructor),
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

        return response()->json(['message' => 'Instructor deleted successfully'], 200);
    }
}
