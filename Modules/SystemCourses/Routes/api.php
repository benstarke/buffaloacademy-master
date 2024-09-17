<?php

use Illuminate\Http\Request;

// Courses
use Modules\SystemCourses\Http\Controllers\Courses\CourseCategoriesController;
use Modules\SystemCourses\Http\Controllers\Courses\CourseDifficultyController;
use Modules\SystemCourses\Http\Controllers\Courses\CourseInstructorsController;
use Modules\SystemCourses\Http\Controllers\Courses\CourseOverviewController;
use Modules\SystemCourses\Http\Controllers\Courses\CoursesController;
use Modules\SystemCourses\Http\Controllers\Courses\CourseSubCategoriesController;
use Modules\SystemCourses\Http\Controllers\Courses\CourseTagController;
use Modules\SystemCourses\Http\Controllers\Courses\CourseTypeController;
use Modules\SystemCourses\Http\Controllers\Courses\CourseStatusController;
use Modules\SystemCourses\Http\Controllers\Courses\CurrencyController;
use Modules\SystemCourses\Http\Controllers\Courses\categorySubCategoryMappingController;
use Modules\SystemCourses\Http\Controllers\Courses\ProgressController;
use Modules\SystemCourses\Http\Controllers\Courses\ReviewsController;


// Enrollments
use Modules\SystemCourses\Http\Controllers\Enrollments\EnrollmentsController;

// Curriculum
use Modules\SystemCourses\Http\Controllers\Curriculum\CourseCurriculumController;
use Modules\SystemCourses\Http\Controllers\Curriculum\curriculumMappingController;

// Lessons
use Modules\SystemCourses\Http\Controllers\Lessons\LessonsController;
use Modules\SystemCourses\Http\Controllers\Lessons\lessonsMappingController;

// Materials
use Modules\SystemCourses\Http\Controllers\Materials\MaterialsController;
use Modules\SystemCourses\Http\Controllers\Materials\materialsMappingController;



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

Route::middleware('auth:api')->get('/systemcourses', function (Request $request) {
    return $request->user();
});



Route::prefix('courses-sub-system')->group(function () {

    // COURSES
    Route::prefix('courses')->name('courses.')->group(function () {
        Route::prefix('course-categories')->name('course-categories.')->group(function () {
            Route::get('/', [CourseCategoriesController::class, 'index'])->name('index');
            Route::get('/{id}', [CourseCategoriesController::class, 'show'])->name('show');
            Route::post('/', [CourseCategoriesController::class, 'store'])->name('store');
            Route::put('/{id}', [CourseCategoriesController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [CourseCategoriesController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CourseCategoriesController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-curriculum')->name('course-curriculum.')->group(function () {
            Route::get('/', [CourseCurriculumController::class, 'index'])->name('index');
            Route::get('/{id}', [CourseCurriculumController::class, 'show'])->name('show');
            Route::post('/', [CourseCurriculumController::class, 'store'])->name('store');
            Route::put('/{id}', [CourseCurriculumController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [CourseCurriculumController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CourseCurriculumController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-difficulty')->name('course-difficulty.')->group(function () {
            Route::get('/', [CourseDifficultyController::class, 'index'])->name('index');
            Route::get('/{id}', [CourseDifficultyController::class, 'show'])->name('show');
            Route::post('/', [CourseDifficultyController::class, 'store'])->name('store');
            Route::put('/{id}', [CourseDifficultyController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [CourseDifficultyController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CourseDifficultyController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-instructors')->name('course-instructors.')->group(function () {
            Route::get('/', [CourseInstructorsController::class, 'index'])->name('index');
            Route::get('/{id}', [CourseInstructorsController::class, 'show'])->name('show');
            Route::post('/', [CourseInstructorsController::class, 'store'])->name('store');
            Route::put('/{course_id}/{instructor_id}', [CourseInstructorsController::class, 'update'])->name('update');
            // single record
            Route::delete('/{course_id}/{instructor_id}', [CourseInstructorsController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CourseInstructorsController::class, 'destroyMultiple'])->name('destroyMultiple');
        });
        

        Route::prefix('course-overview')->name('course-overview.')->group(function () {
            Route::get('/', [CourseOverviewController::class, 'index'])->name('index');
            Route::get('/{id}', [CourseOverviewController::class, 'show'])->name('show');
            Route::post('/', [CourseOverviewController::class, 'store'])->name('store');
            Route::put('/{id}', [CourseOverviewController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [CourseOverviewController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CourseOverviewController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('courses')->name('courses.')->group(function () {
            Route::get('/', [CoursesController::class, 'index'])->name('index');
            Route::get('/{id}', [CoursesController::class, 'show'])->name('show');

            // check if course category and sub-category combination exists
            Route::get('/check-category-subcategory/combination', [CoursesController::class, 'checkCategorySubCategoryCombination'])->name('checkCategorySubCategoryCombination');

            Route::post('/', [CoursesController::class, 'store'])->name('store');
            Route::put('/{id}', [CoursesController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [CoursesController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CoursesController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-sub-categories')->name('course-sub-categories.')->group(function () {
            Route::get('/', [CourseSubCategoriesController::class, 'index'])->name('index');
            Route::get('/{id}', [CourseSubCategoriesController::class, 'show'])->name('show');
            Route::post('/', [CourseSubCategoriesController::class, 'store'])->name('store');
            Route::put('/{id}', [CourseSubCategoriesController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [CourseSubCategoriesController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CourseSubCategoriesController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-tag')->name('course-tag.')->group(function () {
            Route::get('/', [CourseTagController::class, 'index'])->name('index');
            Route::get('/{id}', [CourseTagController::class, 'show'])->name('show');
            Route::post('/', [CourseTagController::class, 'store'])->name('store');
            Route::put('/{id}', [CourseTagController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [CourseTagController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CourseTagController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-type')->name('course-type.')->group(function () {
            Route::get('/', [CourseTypeController::class, 'index'])->name('index');
            Route::get('/{id}', [CourseTypeController::class, 'show'])->name('show');
            Route::post('/', [CourseTypeController::class, 'store'])->name('store');
            Route::put('/{id}', [CourseTypeController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [CourseTypeController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CourseTypeController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-status')->name('course-status.')->group(function () {
            Route::get('/', [CourseStatusController::class, 'index'])->name('index');
            Route::get('/{id}', [CourseStatusController::class, 'show'])->name('show');
            Route::post('/', [CourseStatusController::class, 'store'])->name('store');
            Route::put('/{id}', [CourseStatusController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [CourseStatusController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CourseStatusController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('app-currency')->name('app-currency.')->group(function () {
            Route::get('/', [CurrencyController::class, 'index'])->name('index');
            Route::get('/{id}', [CurrencyController::class, 'show'])->name('show');
            Route::post('/', [CurrencyController::class, 'store'])->name('store');
            Route::put('/{id}', [CurrencyController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [CurrencyController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CurrencyController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('category-sub-category-mapping')->name('category-sub-category-mapping.')->group(function () {
            Route::get('/', [categorySubCategoryMappingController::class, 'index'])->name('index');
            Route::get('/{id}', [categorySubCategoryMappingController::class, 'show'])->name('show');
            Route::post('/', [categorySubCategoryMappingController::class, 'store'])->name('store');
            Route::put('/{course_category_id}/{course_sub_category_id}', [categorySubCategoryMappingController::class, 'update'])->name('update');
            // single record
            Route::delete('{course_category_id}/{course_sub_category_id}', [categorySubCategoryMappingController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [categorySubCategoryMappingController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-progress')->name('course-progress.')->group(function () {
            Route::get('/', [ProgressController::class, 'index'])->name('index');
            Route::get('/{id}', [ProgressController::class, 'show'])->name('show');
            Route::post('/', [ProgressController::class, 'store'])->name('store');
            Route::put('/{id}', [ProgressController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [ProgressController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [ProgressController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-reviews')->name('course-reviews.')->group(function () {
            Route::get('/', [ReviewsController::class, 'index'])->name('index');
            Route::get('/{id}', [ReviewsController::class, 'show'])->name('show');
            Route::post('/', [ReviewsController::class, 'store'])->name('store');
            Route::put('/{id}', [ReviewsController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [ReviewsController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [ReviewsController::class, 'destroyMultiple'])->name('destroyMultiple');
        });
    });

    // Enrollments
    Route::prefix('enrollments')->name('enrollments.')->group(function () {
        Route::prefix('course-enrollments')->name('course-enrollments.')->group(function () {
            Route::get('/', [EnrollmentsController::class, 'index'])->name('index');
            Route::get('/{id}', [EnrollmentsController::class, 'show'])->name('show');
            Route::post('/', [EnrollmentsController::class, 'store'])->name('store');
            Route::put('/{id}', [EnrollmentsController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [EnrollmentsController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [EnrollmentsController::class, 'destroyMultiple'])->name('destroyMultiple');
        });
    });

    // Curriculum
    Route::prefix('curriculum')->name('curriculum.')->group(function () {
        Route::prefix('course-curriculum')->name('course-curriculum.')->group(function () {
            Route::get('/', [CourseCurriculumController::class, 'index'])->name('index');
            Route::get('/{id}', [CourseCurriculumController::class, 'show'])->name('show');
            Route::post('/', [CourseCurriculumController::class, 'store'])->name('store');
            Route::put('/{id}', [CourseCurriculumController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [CourseCurriculumController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [CourseCurriculumController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-curriculum-mapping')->name('course-curriculum-mapping.')->group(function () {
            Route::get('/', [curriculumMappingController::class, 'index'])->name('index');
            Route::get('/{id}', [curriculumMappingController::class, 'show'])->name('show');
            Route::post('/', [curriculumMappingController::class, 'store'])->name('store');
            Route::put('/{id}', [curriculumMappingController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [curriculumMappingController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [curriculumMappingController::class, 'destroyMultiple'])->name('destroyMultiple');
        });
    });

    // Lessons
    Route::prefix('lessons')->name('lessons.')->group(function () {
        Route::prefix('course-lessons')->name('course-lessons.')->group(function () {
            Route::get('/', [LessonsController::class, 'index'])->name('index');
            Route::get('/{id}', [LessonsController::class, 'show'])->name('show');
            Route::post('/', [LessonsController::class, 'store'])->name('store');
            Route::put('/{id}', [LessonsController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [LessonsController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [LessonsController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-lessons-mapping')->name('course-lessons-mapping.')->group(function () {
            Route::get('/', [lessonsMappingController::class, 'index'])->name('index');
            Route::get('/{id}', [lessonsMappingController::class, 'show'])->name('show');
            Route::post('/', [lessonsMappingController::class, 'store'])->name('store');
            Route::put('/{id}', [lessonsMappingController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [lessonsMappingController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [lessonsMappingController::class, 'destroyMultiple'])->name('destroyMultiple');
        });
    });

    // Materials
    Route::prefix('materials')->name('materials.')->group(function () {
        Route::prefix('course-materials')->name('course-materials.')->group(function () {
            Route::get('/', [MaterialsController::class, 'index'])->name('index');
            Route::get('/{id}', [MaterialsController::class, 'show'])->name('show');
            Route::post('/', [MaterialsController::class, 'store'])->name('store');
            Route::post('/{id}', [MaterialsController::class, 'update'])->name('update');
            
            // single record
            Route::delete('/{id}', [MaterialsController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [MaterialsController::class, 'destroyMultiple'])->name('destroyMultiple');
        });

        Route::prefix('course-materials-mapping')->name('course-materials-mapping.')->group(function () {
            Route::get('/', [materialsMappingController::class, 'index'])->name('index');
            Route::get('/{id}', [materialsMappingController::class, 'show'])->name('show');
            Route::post('/', [materialsMappingController::class, 'store'])->name('store');
            Route::put('/{id}', [materialsMappingController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [materialsMappingController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [materialsMappingController::class, 'destroyMultiple'])->name('destroyMultiple');
        });
    });


});

