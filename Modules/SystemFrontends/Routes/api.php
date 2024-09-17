<?php

use Illuminate\Http\Request;

use Modules\SystemFrontends\Http\Controllers\HomeController;
use Modules\SystemFrontends\Http\Controllers\Courses\CourseDetailsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/systemfrontends', function (Request $request) {
    return $request->user();
});

// HomeController
Route::prefix('frontend-sub-system')->group(function () {
    Route::prefix('public-home-courses')->name('public-home-courses.')->group(function () {
        Route::get('/courses', [HomeController::class, 'getCourses']);
        Route::get('/course-categories', [HomeController::class, 'getCourseCategories']);
        Route::get('/courses-categories-with-their-courses', [HomeController::class, 'getCourseCategoriesWithCourses']);
        Route::get('/design-category-with-its-courses', [HomeController::class, 'getCoursesForDesignCategory']);
        Route::get('/it-and-software-category-with-its-courses', [HomeController::class, 'getCoursesForSoftwareCategory']);
        Route::get('/development-category-with-its-courses', [HomeController::class, 'getCoursesForDevelopmentCategory']);
        Route::get('/business-category-with-its-courses', [HomeController::class, 'getCoursesForBusinessCategory']);
        
        Route::get('/course-sub-categories', [HomeController::class, 'getCourseSubCategories']);
        
        Route::get('/courses-with-details', [HomeController::class, 'getCoursesWithDetails']);
        Route::get('/courses-with-details/{id}/detail-view', [HomeController::class, 'getCoursesWithDetailsID']);
        Route::get('/courses-with-details/{courseId}/total-enrolled', [HomeController::class, 'getTotalEnrolledCount']);
        Route::get('/courses-with-details/{courseId}/course-overview', [HomeController::class, 'getCourseOverview']);

        Route::get('/courses-difficulty', [HomeController::class, 'getCourseDifficulty']);
        Route::get('/courses-real-time-search', [HomeController::class, 'search']);

        
        Route::get('/courses/{courseId}/course-count', [CourseDetailsController::class, 'getInstructorCourseCount']);
        Route::get('/courses/{courseId}/related-courses', [CourseDetailsController::class, 'getRelatedCourses']);
        Route::get('courses/{courseId}/curriculum', [CourseDetailsController::class, 'getCourseCurriculum']);
        Route::get('/courses/{courseId}/curriculum/{curriculumId}/lessons-summary', [CourseDetailsController::class, 'getLessonsSummary']);
        Route::get('/courses/{courseId}/curriculum/{curriculumId}/lessons', [CourseDetailsController::class, 'getLessons']);
        Route::get('/courses/materials/{courseId}/{courseCurriculumId}/{lessonId}', [CourseDetailsController::class, 'getMaterialsForLesson']);

        Route::get('/student-testimonials-and-reviews', [HomeController::class, 'getReviewsWithDetails']);
    });
});


