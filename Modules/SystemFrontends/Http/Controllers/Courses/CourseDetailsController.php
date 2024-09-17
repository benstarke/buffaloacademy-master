<?php

namespace Modules\SystemFrontends\Http\Controllers\Courses;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use Illuminate\Support\Facades\DB;

class CourseDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */

    // FOR COURSE DETAIL VIEW
    public function getInstructorCourseCount($courseId)
    {
        // Fetch the instructor ID associated with the given course
        $instructor = DB::table('par_course_instructors')
            ->where('course_id', $courseId)
            ->first();

        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found for the given course'], 404);
        }

        $instructorId = $instructor->instructor_id;

        // Fetch the total number of courses taught by this instructor
        $courseCount = DB::table('par_course_instructors')
            ->where('instructor_id', $instructorId)
            ->count();

        return response()->json([
            'course_count' => $courseCount,
            'instructor_id' => $instructorId
        ]);
    }

    // FOR COURSE DETAIL VIEW
    public function getRelatedCourses($courseId)
    {
        // Fetch the course details for the given courseId
        $course = DB::table('par_courses')
            ->where('id', $courseId)
            ->first();

        if (!$course) {
            return response()->json(['error' => 'Course not found'], 404);
        }

        // Fetch related courses based on the same category and sub-category
        $relatedCourses = DB::table('par_courses as c')
            ->join('par_course_instructors as ci', 'c.id', '=', 'ci.course_id')
            ->join('par_instructors as i', 'ci.instructor_id', '=', 'i.id')
            ->where('c.course_category_id', $course->course_category_id)
            ->where('c.course_sub_category_id', $course->course_sub_category_id)
            ->where('c.id', '!=', $courseId) // Exclude the current course
            ->select(
                'c.id as course_id',
                'c.title_en as title_en',
                'c.title_bn as title_bn',
                'c.course_category_id',
                'c.course_sub_category_id',
                'c.course_type_id',
                'c.course_difficulty_id',
                'c.course_tag_id',
                'c.price',
                'c.old_price',
                'c.subscription_price',
                'c.start_from',
                'c.duration',
                'c.lesson',
                'c.course_code',
                'c.image as image',
                'c.thumbnail_image',
                'c.thumbnail_video',
                'c.status as course_status',
                'c.language as course_language',
                'i.id as instructor_id',
                'i.name_en as instructor_name',
                'i.name_bn as instructor_name_bn',
                'i.contact_en as instructor_contact',
                'i.contact_bn as instructor_contact_bn',
                'i.email as instructor_email',
                'i.bio as instructor_bio',
                'i.title as instructor_title',
                'i.designation as instructor_designation',
                'i.image as instructor_image',
                'i.status as instructor_status',
                'i.language as instructor_language',
                'i.instagram as instagram',
                'i.linkedin as linkedin',
                'i.twitter as twitter',
                'i.youtube as youtube',
                'i.facebook as facebook'
            )
            ->get();

        return response()->json($relatedCourses);
    }

    // FOR COURSE DETAIL VIEW
    // public function getCourseCurriculum($courseId)
    // {
    //     $curriculums = DB::table('par_course_curriculum as c')
    //                     ->where('course_id', $courseId)
    //                     ->get();

    //     return response()->json($curriculums);
    // }

    public function getCourseCurriculum($courseId)
    {
        // Validate the courseId to be an integer
        if (!is_numeric($courseId) || $courseId <= 0) {
            return response()->json(['error' => 'Invalid course ID'], 400);
        }

        // Fetch the course curriculum from the database
        $courseCurriculum = DB::table('par_course_curriculum')
            ->where('course_id', $courseId)
            ->get();
            // ->first();

        // Check if the course curriculum exists
        if (!$courseCurriculum) {
            return response()->json(['error' => 'Course curriculum not found'], 404);
        }

        return response()->json($courseCurriculum, 200);
    }

    // method that queries the total number of lessons per curriculum for a specific course and calculates the total duration in hours, minutes, and seconds
    public function getLessonsSummary($courseId, $curriculumId)
    {
        // Fetch the total number of lessons and total duration (in seconds) for a given course and curriculum
        $result = DB::table('par_lessons')
            ->join('par_course_curriculum', 'par_lessons.course_curriculum_id', '=', 'par_course_curriculum.id')
            ->select(
                DB::raw('COUNT(par_lessons.id) as total_lessons'),
                DB::raw('SUM(par_lessons.minutes * 60 + par_lessons.seconds) as total_seconds')
            )
            ->where('par_course_curriculum.course_id', $courseId)
            ->where('par_lessons.course_curriculum_id', $curriculumId)
            ->first();

        if ($result) {
            // Calculate hours, minutes, and seconds from total seconds
            $totalSeconds = $result->total_seconds;
            $hours = floor($totalSeconds / 3600);
            $minutes = floor(($totalSeconds % 3600) / 60);
            $seconds = $totalSeconds % 60;

            return response()->json([
                'total_lessons' => $result->total_lessons,
                'total_duration' => [
                    'hours' => $hours,
                    'minutes' => $minutes,
                    'seconds' => $seconds
                ]
            ]);
        } else {
            return response()->json([
                'total_lessons' => 0,
                'total_duration' => [
                    'hours' => 0,
                    'minutes' => 0,
                    'seconds' => 0
                ]
            ]);
        }
    }



    // method to fetch lessons for a specific course and curriculum,
    public function getLessons($courseId, $curriculumId)
    {
        // Fetch lessons for a given course and curriculum
        $lessons = DB::table('par_lessons')
            ->join('par_course_curriculum', 'par_lessons.course_curriculum_id', '=', 'par_course_curriculum.id')
            ->select(
                'par_lessons.id',
                'par_lessons.title',
                'par_lessons.course_curriculum_id',
                'par_lessons.description',
                'par_lessons.notes',
                'par_lessons.minutes',
                'par_lessons.seconds',
                'par_lessons.created_by',
                'par_lessons.created_at',
                'par_lessons.updated_by',
                'par_lessons.updated_at',
                'par_lessons.altered_by',
                'par_lessons.altered_at'
            )
            ->where('par_course_curriculum.course_id', $courseId)
            ->where('par_lessons.course_curriculum_id', $curriculumId)
            ->get();

        return response()->json($lessons);
    }


    /**
     * Get materials for a specific lesson, course curriculum, and course.
     *
     * @param  int  $courseId
     * @param  int  $courseCurriculumId
     * @param  int  $lessonId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMaterialsForLesson($courseId, $courseCurriculumId, $lessonId)
    {
        // Fetch materials based on provided courseId, courseCurriculumId, and lessonId
        $materials = DB::table('par_materials')
            ->join('par_lessons', 'par_materials.lesson_id', '=', 'par_lessons.id')
            ->join('par_course_curriculum', 'par_lessons.course_curriculum_id', '=', 'par_course_curriculum.id')
            ->select(
                'par_materials.id',
                'par_materials.lesson_id',
                'par_materials.title',
                'par_materials.type',
                'par_materials.content',
                'par_materials.content_url',
                'par_materials.created_by',
                'par_materials.created_at',
                'par_materials.updated_by',
                'par_materials.updated_at',
                'par_materials.altered_by',
                'par_materials.altered_at'
            )
            ->where('par_course_curriculum.course_id', $courseId)
            ->where('par_course_curriculum.id', $courseCurriculumId)
            ->where('par_materials.lesson_id', $lessonId)
            ->get();

        return response()->json($materials);
    }



}
