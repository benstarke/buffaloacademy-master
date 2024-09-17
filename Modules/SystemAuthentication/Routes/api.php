<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Students
use Modules\SystemAuthentication\Http\Controllers\Students\AuthController;
use Modules\SystemAuthentication\Http\Controllers\Setting\RoleController;
use Modules\SystemAuthentication\Http\Controllers\Students\VerificationController; 
use Modules\SystemAuthentication\Http\Controllers\Students\DashboardController; 
use Modules\SystemAuthentication\Http\Controllers\Students\ProfileController;
use Modules\SystemAuthentication\Http\Controllers\Students\ImageUploadController;


// Instructor
use Modules\SystemAuthentication\Http\Controllers\Instructors\AuthsController;
use Modules\SystemAuthentication\Http\Controllers\Instructors\DashboardsController; 
use Modules\SystemAuthentication\Http\Controllers\Instructors\ProfilesController;
use Modules\SystemAuthentication\Http\Controllers\Instructors\ExperienceController; 
use Modules\SystemAuthentication\Http\Controllers\Instructors\EducationController;

// Users
use Modules\SystemAuthentication\Http\Controllers\Users\UserAuthController;
use Modules\SystemAuthentication\Http\Controllers\Users\UserManagementController;


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

Route::middleware('auth:api')->get('/systemauthentication', function (Request $request) {
    return $request->user();
});



// API Routes for Student Authentication
// Route::prefix('authentication-sub-system')->group(function () {
//     Route::prefix('student')->name('student.')->group(function () {
//         Route::post('/register', [AuthController::class, 'signUpStore'])->name('studentRegister.store');
//         Route::post('/login', [AuthController::class, 'signInCheck'])->name('studentLogin.checkEmail');
//         Route::post('/logout', [AuthController::class, 'signOut'])->name('studentlogOut.signOut');

//         // Route::post('password/email', [AuthController::class, 'sendResetLinkEmail']);
//         // Route::post('password/reset', [AuthController::class, 'resetPassword']);
        
//         Route::post('/email/verify/{student}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
//         Route::post('/email/resend', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');
//     });

//     // Student email verification
//     Route::prefix('student-registration-email-verification')->name('student-registration-email-verification.')->group(function () {
//         Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify')->middleware('signed');
//     });

//     Route::middleware(['auth:api', 'token.refresh'])->group(function () {
//         Route::prefix('manage-roles')->name('manage-roles.')->group(function () {
//             Route::get('/', [RoleController::class, 'index'])->name('index');
//             Route::get('/{id}', [RoleController::class, 'show'])->name('show');
//             Route::post('/', [RoleController::class, 'store'])->name('store');
//             Route::put('/{id}', [RoleController::class, 'update'])->name('update');
//             Route::delete('/{id}', [RoleController::class, 'destroy'])->name('destroy');
//         });
//     });
// });



// Refresh token after every request
// Route::prefix('authentication-sub-system')->group(function () {
//     Route::middleware(['auth:api', 'token.refresh'])->group(function () {
//         Route::prefix('manage-roles')->name('manage-roles.')->group(function () {
//             Route::get('/', [RoleController::class, 'index'])->name('index');
//             Route::get('/{id}', [RoleController::class, 'show'])->name('show');
//             Route::post('/', [RoleController::class, 'store'])->name('store');
//             Route::put('/{id}', [RoleController::class, 'update'])->name('update');
//             Route::delete('/{id}', [RoleController::class, 'destroy'])->name('destroy');
//         });
//     });
// });


// API Routes for Student Authentication
Route::prefix('authentication-sub-system')->group(function () {
    Route::prefix('student')->name('student.')->group(function () {
        Route::post('/register', [AuthController::class, 'signUpStore'])->name('studentRegister.store');
        Route::post('/login', [AuthController::class, 'signInCheck'])->name('studentLogin.checkEmail');
        Route::post('/logout', [AuthController::class, 'signOut'])->name('studentlogOut.signOut');
        
        Route::get('/email/resend/{id}', [AuthController::class, 'resendVerificationEmailGet'])->name('verification.resendGet');
        Route::post('/email/resend', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');
    });

    // Student email verification
    Route::prefix('student-registration-email-verification')->name('student-registration-email-verification.')->group(function () {
        Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
    });

    // Student password reset via email
    Route::prefix('student-password-reset-via-email')->name('student-password-reset-via-email.')->group(function () {
        Route::post('password/email', [AuthController::class, 'sendResetLinkEmail']);
        Route::post('password/reset', [AuthController::class, 'resetPassword']);
    });

    Route::middleware(['auth.jwt'])->group(function () {
        // API Routes for Student dashboard
        Route::prefix('student-sub-system-dashboard')->name('student-sub-system-dashboard.')->group(function () {
            Route::get('courses', [DashboardController::class, 'getAllCourses'])->name('courses');
            Route::get('courses/enrolled', [DashboardController::class, 'getEnrolledCourses'])->name('courses.enrolled');
            Route::get('courses/active', [DashboardController::class, 'getActiveCourses'])->name('courses.active');
            Route::get('courses/completed', [DashboardController::class, 'getCompletedCourses'])->name('courses.completed');
            Route::get('purchase-history', [DashboardController::class, 'getPurchaseHistory'])->name('purchaseHistory');
            Route::get('profile-count-updates', [DashboardController::class, 'getStudentProfile'])->name('profileCountUpdates');
        });
    });

    Route::middleware(['auth.jwt'])->group(function () {
        // API Routes for Student profile
        Route::prefix('student-sub-system-profile')->name('student-sub-system-profile.')->group(function () {
            Route::get('/student/profile', [ProfileController::class, 'index']);
            Route::post('/student/profile', [ProfileController::class, 'save_profile']);
            Route::post('/student/change-password', [ProfileController::class, 'change_password']);
            Route::post('/student/change-image', [ProfileController::class, 'changeImage']);

            // student image upload temp
            Route::post('/student/upload-temp-image', [ImageUploadController::class, 'uploadTempImage']);
            // Route::post('/students/payment/ssl/submit', [Sslcz::class, 'store'])->name('payment.ssl.submit');
        });
    }); 
});




// // API Routes for Student Authentication
// Route::prefix('authentication-sub-system')->group(function () {
//     Route::prefix('student')->name('student.')->group(function () {
//         Route::post('/register', [AuthController::class, 'signUpStore'])->name('studentRegister.store');
//         Route::post('/login', [AuthController::class, 'signInCheck'])->name('studentLogin.checkEmail');
//         Route::post('/logout', [AuthController::class, 'signOut'])->name('studentlogOut.signOut');

//         // Route::get('/email/verify/{student}', [AuthController::class, 'verifyEmail'])->name('verification.verify');  for token based
//         // Route::post('/email/resend', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');  for token based
//         // Route::post('/email/resend/{id}', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');
//         Route::get('/email/resend/{id}', [AuthController::class, 'resendVerificationEmailGet'])->name('verification.resendGet');
//         Route::post('/email/resend', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');
//     });

//     // Student email verification
//     Route::prefix('student-registration-email-verification')->name('student-registration-email-verification.')->group(function () {
//         Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
//         // Route::post('/email/resend', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');
//         // Route::post('/email/verify/{id}/{hash}', [AuthController::class, 'resendVerificationEmail'])->name('verification.verify');
//         // Route::post('/email/resend/{id}', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');
//         // Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');
//     });

//     // Student password reset via email
//     Route::prefix('student-password-reset-via-email')->name('student-password-reset-via-email.')->group(function () {
//         Route::post('password/email', [AuthController::class, 'sendResetLinkEmail']);
//         Route::post('password/reset', [AuthController::class, 'resetPassword']);
//     });
// });

// Route::middleware(['auth:api', 'auth.student'])->prefix('authentication-sub-system')->group(function () {
//     // API Routes for Student dashboard
//     Route::prefix('student-sub-system-dashboard')->name('student-sub-system-dashboard.')->group(function () {
//         Route::get('courses', [DashboardController::class, 'getAllCourses'])->name('courses');
//         Route::get('courses/enrolled', [DashboardController::class, 'getEnrolledCourses'])->name('courses.enrolled');
//         Route::get('courses/active', [DashboardController::class, 'getActiveCourses'])->name('courses.active');
//         Route::get('courses/completed', [DashboardController::class, 'getCompletedCourses'])->name('courses.completed');
//         Route::get('purchase-history', [DashboardController::class, 'getPurchaseHistory'])->name('purchaseHistory');
//     });
// });



// Check if email exixts
// Students
Route::prefix('authentication-sub-system')->group(function () {
    Route::prefix('student')->name('student.')->group(function () {
        Route::post('/check-email', [AuthController::class, 'checkEmailInStudents'])->name('check.email');
    });
});

// Instructors
Route::prefix('authentication-sub-system')->group(function () {
    Route::prefix('instructor')->name('instructor.')->group(function () {
        Route::post('/check-email', [AuthsController::class, 'checkEmailInInstructors'])->name('check.email');
    });
});


// Users
Route::prefix('authentication-sub-system')->group(function () {
    Route::prefix('user')->name('user.')->group(function () {
        Route::post('/check-email', [UserAuthController::class, 'checkEmailInUsers'])->name('check.email');
    });
});




// RoleController
Route::prefix('authentication-sub-system')->group(function () {
    Route::prefix('manage-roles')->name('manage-roles.')->group(function () {
        Route::get('/', [RoleController::class, 'index'])->name('index');
        Route::get('/{id}', [RoleController::class, 'show'])->name('show');
        Route::post('/', [RoleController::class, 'store'])->name('store');
        Route::put('/{id}', [RoleController::class, 'update'])->name('update');
        // one record
        Route::delete('/{id}', [RoleController::class, 'destroy'])->name('destroy');
        // multiple records
        Route::post('/roles/delete', [RoleController::class, 'destroyMultiple'])->name('destroyMultiple');
    });
});


// API Routes for Instructor Authentication
Route::prefix('authentication-sub-system')->group(function () {
    Route::prefix('instructor')->name('instructor.')->group(function () {
        Route::post('/register', [AuthsController::class, 'signUpStore'])->name('instructorRegister.store');
        Route::post('/login', [AuthsController::class, 'signInCheck'])->name('instructorLogin.checkEmail');
        Route::post('/logout', [AuthsController::class, 'signOut'])->name('instructorlogOut.signOut');
        
        Route::get('/email/resend/{id}', [AuthsController::class, 'resendVerificationEmailGet'])->name('verification.resendGet');
        Route::post('/email/resend', [AuthsController::class, 'resendVerificationEmail'])->name('verification.resend');
    });

    // Instructor email verification
    Route::prefix('instructor-registration-email-verification')->name('instructor-registration-email-verification.')->group(function () {
        Route::get('/email/verify/{id}/{hash}', [AuthsController::class, 'verifyEmail'])->name('verification.verify');
    });

    // Instructor password reset via email
    Route::prefix('instructor-password-reset-via-email')->name('instructor-password-reset-via-email.')->group(function () {
        Route::post('password/email', [AuthsController::class, 'sendResetLinkEmail']);
        Route::post('password/reset', [AuthsController::class, 'resetPassword']);
    });

    // Route::middleware(['auth.jwt'])->group(function () {
    //     // API Routes for Instructor dashboard
    //     Route::prefix('instructor-sub-system-dashboard')->name('instructor-sub-system-dashboard.')->group(function () {
    //         Route::get('courses', [DashboardController::class, 'getAllCourses'])->name('courses');
    //         Route::get('courses/enrolled', [DashboardController::class, 'getEnrolledCourses'])->name('courses.enrolled');
    //         Route::get('courses/active', [DashboardController::class, 'getActiveCourses'])->name('courses.active');
    //         Route::get('courses/completed', [DashboardController::class, 'getCompletedCourses'])->name('courses.completed');
    //         Route::get('purchase-history', [DashboardController::class, 'getPurchaseHistory'])->name('purchaseHistory');
    //         Route::get('profile-count-updates', [DashboardController::class, 'getInstructorProfile'])->name('profileCountUpdates');
    //     });
    // });

    Route::middleware(['auth.jwt'])->group(function () {
        // API Routes for Instructor profile
        Route::prefix('instructor-sub-system-profile')->name('instructor-sub-system-profile.')->group(function () {
            Route::get('/instructor/profile', [ProfileController::class, 'index']);
            Route::post('/instructor/profile', [ProfileController::class, 'save_profile']);
            Route::post('/instructor/change-password', [ProfileController::class, 'change_password']);
            Route::post('/instructor/change-image', [ProfileController::class, 'changeImage']);

            // instructor image upload temp
            Route::post('/instructor/upload-temp-image', [ImageUploadController::class, 'uploadTempImage']);
            // Route::post('/instructors/payment/ssl/submit', [Sslcz::class, 'store'])->name('payment.ssl.submit');
        });
    }); 

    Route::prefix('instructor-sub-system-dashboard')->group(function () {
        Route::prefix('instructor-education')->name('instructor-education.')->group(function () {
            Route::get('/', [EducationController::class, 'index'])->name('index');
            Route::get('/{id}', [EducationController::class, 'show'])->name('show');
            Route::post('/', [EducationController::class, 'store'])->name('store');
            Route::put('/{id}', [EducationController::class, 'update'])->name('update');
            Route::delete('/{id}', [EducationController::class, 'destroy'])->name('destroy');
        });
    
        Route::prefix('instructor-experience')->name('instructor-experience.')->group(function () {
            Route::get('/', [ExperienceController::class, 'index'])->name('index');
            Route::get('/{id}', [ExperienceController::class, 'show'])->name('show');
            Route::post('/', [ExperienceController::class, 'store'])->name('store');
            Route::put('/{id}', [ExperienceController::class, 'update'])->name('update');
            Route::delete('/{id}', [ExperienceController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('instructor-operations')->name('instructor-operations.')->group(function () {
            Route::get('/', [DashboardsController::class, 'index'])->name('index');
            Route::get('/{id}', [DashboardsController::class, 'show'])->name('show');
            // other get queires     
            Route::get('/instructor-related-information/{id}/information', [DashboardsController::class, 'getInstructorInfo'])->name('getInstructorInfo');
            Route::get('/instructor-related-courses/{id}/courses', [DashboardsController::class, 'getCoursesRelatedToInstructor'])->name('getCoursesRelatedToInstructor');
            Route::get('/instructor-related-education/{id}/education', [DashboardsController::class, 'getEducationRelatedToInstructor'])->name('getEducationRelatedToInstructor');
            Route::get('/instructor-related-experience/{id}/experience', [DashboardsController::class, 'getExperienceRelatedToInstructor'])->name('getExperienceRelatedToInstructor');

            Route::get('/instructor-students-enrollments/{id}/enrollments', [DashboardsController::class, 'getInstructorEnrollmentCount'])->name('getInstructorEnrollmentCount');
            Route::get('/instructor-courses/{id}/courses-count', [DashboardsController::class, 'getCoursesCount'])->name('getCoursesCount');


            // ends here
            Route::post('/', [DashboardsController::class, 'store'])->name('store');
            Route::put('/{id}', [DashboardsController::class, 'update'])->name('update');
            Route::delete('/{id}', [DashboardsController::class, 'destroy'])->name('destroy');
        });
    });
});



// API Routes for User Management
Route::prefix('authentication-sub-system')->group(function () {
    Route::prefix('manage-students')->name('manage-students.')->group(function () {
        Route::get('/', [UserManagementController::class, 'indexStudents'])->name('indexStudents');
        Route::get('/{id}', [UserManagementController::class, 'showStudents'])->name('showStudents');
        Route::post('/', [UserManagementController::class, 'storeStudents'])->name('storeStudents');
        Route::put('/{id}', [UserManagementController::class, 'updateStudents'])->name('updateStudents');
        // one record
        Route::delete('/{id}', [UserManagementController::class, 'destroyStudents'])->name('destroyStudents');
        // multiple records
        Route::post('/students/delete', [UserManagementController::class, 'destroyMultipleStudents'])->name('destroyMultipleStudents');
    });
    Route::prefix('manage-instructors')->name('manage-instructors.')->group(function () {
        Route::get('/', [UserManagementController::class, 'indexInstructors'])->name('indexInstructors');
        Route::get('/{id}', [UserManagementController::class, 'showInstructors'])->name('showInstructors');
        Route::post('/', [UserManagementController::class, 'storeInstructors'])->name('storeInstructors');
        Route::put('/{id}', [UserManagementController::class, 'updateInstructors'])->name('updateInstructors');
        // one record
        Route::delete('/{id}', [UserManagementController::class, 'destroyInstructors'])->name('destroyInstructors');
        // multiple records
        Route::post('/instructors/delete', [UserManagementController::class, 'destroyMultipleInstructors'])->name('destroyMultipleInstructors');
    });
});




