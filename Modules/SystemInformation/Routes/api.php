<?php

use Illuminate\Http\Request;
// ABOUT
use Modules\SystemInformation\Http\Controllers\About\AboutInfoController;

// CONTACT
use Modules\SystemInformation\Http\Controllers\Contact\AddressInfoController;
use Modules\SystemInformation\Http\Controllers\Contact\CompanyBranchesController;
use Modules\SystemInformation\Http\Controllers\Contact\CompanyBranchInfoController;
use Modules\SystemInformation\Http\Controllers\Contact\ContactController;
use Modules\SystemInformation\Http\Controllers\Contact\ContactInfoController;
use Modules\SystemInformation\Http\Controllers\Contact\EmailInfoController;


// HOME
use Modules\SystemInformation\Http\Controllers\Home\NewsLetterController;
use Modules\SystemInformation\Http\Controllers\Home\BuffaloSimpleLearningStepsController;
use Modules\SystemInformation\Http\Controllers\Home\CourseSubCategoriesController;
use Modules\SystemInformation\Http\Controllers\Home\LandingPageController;
use Modules\SystemInformation\Http\Controllers\Home\LatestEventsController;
use Modules\SystemInformation\Http\Controllers\Home\PopularCoursesController;
use Modules\SystemInformation\Http\Controllers\Home\TestimonialsController;
use Modules\SystemInformation\Http\Controllers\Home\WhyLearnWithBuffaloController;

// GENERAL
use Modules\SystemInformation\Http\Controllers\FooterInfoController; // system footer
use Modules\SystemInformation\Http\Controllers\IconsInfoController; // system icons
use Modules\SystemInformation\Http\Controllers\PartnersInfoController; // system partners
use Modules\SystemInformation\Http\Controllers\TeamInfoController; // instructors joined

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

Route::middleware('auth:api')->get('/systeminformation', function (Request $request) {
    return $request->user();
});



// ABOUT
Route::prefix('site-information-sub-system')->group(function () {
    Route::prefix('about')->name('about.')->group(function () {
        Route::prefix('about-info')->name('about-info.')->group(function () {
            Route::get('/', [AboutInfoController::class, 'index'])->name('index');
            Route::get('/{id}', [AboutInfoController::class, 'show'])->name('show');
            Route::post('/', [AboutInfoController::class, 'store'])->name('store');
            Route::post('/{id}', [AboutInfoController::class, 'update'])->name('update');
            // single record
            Route::delete('/{id}', [AboutInfoController::class, 'destroy'])->name('destroy');
            // multiple records
            Route::post('/delete', [AboutInfoController::class, 'destroyMultiple'])->name('destroyMultiple');
        });
    });
});


// CONTACT
Route::prefix('site-information-sub-system')->group(function () {
    Route::prefix('contact')->name('contact.')->group(function () {
        Route::prefix('address-info')->name('address-info.')->group(function () {
            Route::get('/', [AddressInfoController::class, 'index'])->name('index');
            Route::get('/{id}', [AddressInfoController::class, 'show'])->name('show');
            Route::post('/', [AddressInfoController::class, 'store'])->name('store');
            Route::put('/{id}', [AddressInfoController::class, 'update'])->name('update');
            Route::delete('/{id}', [AddressInfoController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('company-branches')->name('company-branches.')->group(function () {
            Route::get('/', [CompanyBranchesController::class, 'index'])->name('index');
            Route::get('/{id}', [CompanyBranchesController::class, 'show'])->name('show');
            Route::post('/', [CompanyBranchesController::class, 'store'])->name('store');
            Route::put('/{id}', [CompanyBranchesController::class, 'update'])->name('update');
            Route::delete('/{id}', [CompanyBranchesController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('company-branch-info')->name('company-branch-info.')->group(function () {
            Route::get('/', [CompanyBranchInfoController::class, 'index'])->name('index');
            Route::get('/{id}', [CompanyBranchInfoController::class, 'show'])->name('show');
            Route::post('/', [CompanyBranchInfoController::class, 'store'])->name('store');
            Route::put('/{id}', [CompanyBranchInfoController::class, 'update'])->name('update');
            Route::delete('/{id}', [CompanyBranchInfoController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('contacts')->name('contacts.')->group(function () {
            Route::get('/', [ContactController::class, 'index'])->name('index');
            Route::get('/{id}', [ContactController::class, 'show'])->name('show');
            Route::post('/', [ContactController::class, 'store'])->name('store');
            Route::put('/{id}', [ContactController::class, 'update'])->name('update');
            Route::delete('/{id}', [ContactController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('contact-info')->name('contact-info.')->group(function () {
            Route::get('/', [ContactInfoController::class, 'index'])->name('index');
            Route::get('/{id}', [ContactInfoController::class, 'show'])->name('show');
            Route::post('/', [ContactInfoController::class, 'store'])->name('store');
            Route::put('/{id}', [ContactInfoController::class, 'update'])->name('update');
            Route::delete('/{id}', [ContactInfoController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('email-info')->name('email-info.')->group(function () {
            Route::get('/', [EmailInfoController::class, 'index'])->name('index');
            Route::get('/{id}', [EmailInfoController::class, 'show'])->name('show');
            Route::post('/', [EmailInfoController::class, 'store'])->name('store');
            Route::put('/{id}', [EmailInfoController::class, 'update'])->name('update');
            Route::delete('/{id}', [EmailInfoController::class, 'destroy'])->name('destroy');
        });
    });
});


// HOME
Route::prefix('site-information-sub-system')->group(function () {
    Route::prefix('home')->name('home.')->group(function () {
        Route::prefix('buffalo-news-letter')->name('buffalo-news-letter.')->group(function () {
            Route::get('/', [NewsLetterController::class, 'index'])->name('index');
            Route::get('/{id}', [NewsLetterController::class, 'show'])->name('show');
            Route::post('/', [NewsLetterController::class, 'store'])->name('store');
            Route::put('/{id}', [NewsLetterController::class, 'update'])->name('update');
            Route::delete('/{id}', [NewsLetterController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('buffalo-simple-learning-steps')->name('buffalo-simple-learning-steps.')->group(function () {
            Route::get('/', [BuffaloSimpleLearningStepsController::class, 'index'])->name('index');

            Route::get('/image', [BuffaloSimpleLearningStepsController::class, 'indexImage'])->name('indexImage');
            Route::get('/steps', [BuffaloSimpleLearningStepsController::class, 'indexSteps'])->name('indexSteps');

            Route::get('/{id}', [BuffaloSimpleLearningStepsController::class, 'show'])->name('show');
            Route::post('/', [BuffaloSimpleLearningStepsController::class, 'store'])->name('store');
            Route::put('/{id}', [BuffaloSimpleLearningStepsController::class, 'update'])->name('update');
            Route::delete('/{id}', [BuffaloSimpleLearningStepsController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('course-sub-categories')->name('course-sub-categories.')->group(function () {
            Route::get('/', [CourseSubCategoriesController::class, 'index'])->name('index');
            Route::get('/with-course-count', [CourseSubCategoriesController::class, 'indexWithCourseCount'])->name('indexWithCourseCount'); 
            Route::get('/with-course-count/{id}', [CourseSubCategoriesController::class, 'showWithCourseCount'])->name('showWithCourseCount'); 
            Route::get('/{id}', [CourseSubCategoriesController::class, 'show'])->name('show');
        });

        Route::prefix('buffalo-landing-page')->name('buffalo-landing-page.')->group(function () {
            Route::get('/', [LandingPageController::class, 'index'])->name('index');
            Route::get('/{id}', [LandingPageController::class, 'show'])->name('show');
            Route::post('/', [LandingPageController::class, 'store'])->name('store');
            Route::put('/{id}', [LandingPageController::class, 'update'])->name('update');
            Route::delete('/{id}', [LandingPageController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('buffalo-latest-events')->name('buffalo-latest-events.')->group(function () {
            Route::get('/', [LatestEventsController::class, 'index'])->name('index');
            Route::get('/backend', [LatestEventsController::class, 'indexBackend'])->name('indexBackend');
            Route::get('/{id}', [LatestEventsController::class, 'show'])->name('show'); 
            Route::post('/', [LatestEventsController::class, 'store'])->name('store');
            Route::put('/{id}', [LatestEventsController::class, 'update'])->name('update');
            Route::delete('/{id}', [LatestEventsController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('popular-courses')->name('popular-courses.')->group(function () {
            Route::get('/', [PopularCoursesController::class, 'index'])->name('index');
            Route::get('/{id}', [PopularCoursesController::class, 'show'])->name('show');
        });

        Route::prefix('buffalo-students-testimonials')->name('buffalo-students-testimonials.')->group(function () {
            Route::get('/', [TestimonialsController::class, 'index'])->name('index');
            Route::get('/{id}', [TestimonialsController::class, 'show'])->name('show');
            Route::post('/', [TestimonialsController::class, 'store'])->name('store');
            Route::put('/{id}', [TestimonialsController::class, 'update'])->name('update');
            Route::delete('/{id}', [TestimonialsController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('why-learn-with-buffalo')->name('why-learn-with-buffalo.')->group(function () {
            Route::get('/', [WhyLearnWithBuffaloController::class, 'index'])->name('index');
            Route::get('/{id}', [WhyLearnWithBuffaloController::class, 'show'])->name('show');
            Route::post('/', [WhyLearnWithBuffaloController::class, 'store'])->name('store');
            Route::put('/{id}', [WhyLearnWithBuffaloController::class, 'update'])->name('update');
            Route::delete('/{id}', [WhyLearnWithBuffaloController::class, 'destroy'])->name('destroy');
        });
    });
});


// GENERAL
Route::prefix('site-information-sub-system')->group(function () {
    Route::prefix('general-system-layout')->name('general-system-layout.')->group(function () {
        Route::prefix('footer-info')->name('footer-info.')->group(function () {
            Route::get('/', [FooterInfoController::class, 'index'])->name('index');
            Route::get('/{id}', [FooterInfoController::class, 'show'])->name('show');
            Route::post('/', [FooterInfoController::class, 'store'])->name('store');
            Route::put('/{id}', [FooterInfoController::class, 'update'])->name('update');
            Route::delete('/{id}', [FooterInfoController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('icons-info')->name('icons-info.')->group(function () {
            Route::get('/', [IconsInfoController::class, 'index'])->name('index');
            Route::get('/{id}', [IconsInfoController::class, 'show'])->name('show');
            Route::post('/', [IconsInfoController::class, 'store'])->name('store');
            Route::put('/{id}', [IconsInfoController::class, 'update'])->name('update');
            Route::delete('/{id}', [IconsInfoController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('partners-info')->name('partners-info.')->group(function () {
            Route::get('/', [PartnersInfoController::class, 'index'])->name('index');
            Route::get('/{id}', [PartnersInfoController::class, 'show'])->name('show');
            Route::post('/', [PartnersInfoController::class, 'store'])->name('store');
            Route::put('/{id}', [PartnersInfoController::class, 'update'])->name('update');
            Route::delete('/{id}', [PartnersInfoController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('team')->name('team.')->group(function () {
            Route::get('/', [TeamInfoController::class, 'index'])->name('index');
            Route::get('/{id}', [TeamInfoController::class, 'show'])->name('show');
        });
    });
});
