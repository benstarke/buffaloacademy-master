<?php

use Illuminate\Http\Request;
use Modules\SystemActivityLogs\Http\Controllers\ActivityLogsController;
use Modules\SystemActivityLogs\Http\Controllers\AudiTrailController;


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

Route::middleware('auth:api')->get('/systemactivitylogs', function (Request $request) {
    return $request->user();
});



Route::prefix('activity-and-logs-sub-system')->group(function () {
    // ActivityLogsController
    Route::prefix('activity-logs')->name('activity-logs.')->group(function () {
        Route::get('/', [ActivityLogsController::class, 'index'])->name('index');
        Route::get('/{id}', [ActivityLogsController::class, 'show'])->name('show');
    });

    // AudiTrailController  
    Route::prefix('audit-trail')->name('audit-trail.')->group(function () {
        Route::get('/', [AudiTrailController::class, 'index'])->name('index');
        Route::get('/{id}', [AudiTrailController::class, 'show'])->name('show');
    });
});


