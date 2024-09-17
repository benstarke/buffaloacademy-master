<?php

use Illuminate\Http\Request;

use Modules\SystemBlog\Http\Controllers\BlogCategoriesController;
use Modules\SystemBlog\Http\Controllers\TagsController;
use Modules\SystemBlog\Http\Controllers\BlogController;
use Modules\SystemBlog\Http\Controllers\StatusController;

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

Route::middleware('auth:api')->get('/systemblog', function (Request $request) {
    return $request->user();
});


// BlogCategoriesController
Route::prefix('blog-sub-system')->group(function () {
    Route::prefix('blog-categories')->name('blog-categories.')->group(function () {
        Route::get('/', [BlogCategoriesController::class, 'index'])->name('index');
        Route::get('/{id}', [BlogCategoriesController::class, 'show'])->name('show');
        Route::post('/', [BlogCategoriesController::class, 'store'])->name('store');
        Route::put('/{id}', [BlogCategoriesController::class, 'update'])->name('update');
        // one record
        Route::delete('/{id}', [BlogCategoriesController::class, 'destroy'])->name('destroy'); 
        // multiple records
        Route::post('/categories/delete', [BlogCategoriesController::class, 'destroyMultiple'])->name('destroyMultiple');
    });
});



// TagsController
Route::prefix('blog-sub-system')->group(function () {
    Route::prefix('tags')->name('tags.')->group(function () {
        Route::get('/', [TagsController::class, 'index'])->name('index');
        Route::get('/{id}', [TagsController::class, 'show'])->name('show');
        Route::post('/', [TagsController::class, 'store'])->name('store');
        Route::put('/{id}', [TagsController::class, 'update'])->name('update');
        // one record
        Route::delete('/{id}', [TagsController::class, 'destroy'])->name('destroy');
        // multiple records
        Route::post('/tags/delete', [TagsController::class, 'destroyMultiple'])->name('destroyMultiple');
    });
});

// StatusController
Route::prefix('blog-sub-system')->group(function () {
    Route::prefix('blog-status')->name('blog-status.')->group(function () {
        Route::get('/', [StatusController::class, 'index'])->name('index');
        Route::get('/{id}', [StatusController::class, 'show'])->name('show');
        Route::post('/', [StatusController::class, 'store'])->name('store');
        Route::put('/{id}', [StatusController::class, 'update'])->name('update');
        // one record
        Route::delete('/{id}', [StatusController::class, 'destroy'])->name('destroy');
        // multiple records
        Route::post('/status/delete', [StatusController::class, 'destroyMultiple'])->name('destroyMultiple');
    });
});


// BlogController  Dashboard
Route::prefix('blog-sub-system')->group(function () {
    Route::prefix('dblogs')->name('dblogs.')->group(function () {
        Route::get('/', [BlogController::class, 'indexDashboard'])->name('indexDashboard');
        Route::get('/{id}', [BlogController::class, 'show'])->name('show');
        Route::post('/', [BlogController::class, 'store'])->name('store');
        Route::put('/{id}', [BlogController::class, 'update'])->name('update');
        // one record
        Route::delete('/{id}', [BlogController::class, 'destroy'])->name('destroy');
        // multiple records
        Route::post('/blogs/delete', [BlogController::class, 'destroyMultiple'])->name('destroyMultiple');
    });
});


// BlogController  Public
Route::prefix('blog-sub-system')->group(function () {
    Route::prefix('blogs')->name('blogs.')->group(function () {
        Route::get('/', [BlogController::class, 'index'])->name('index');
        Route::get('/{id}', [BlogController::class, 'show'])->name('show');
    });
});

// search blogs
Route::prefix('blog-sub-system')->group(function () {
    Route::prefix('search-blogs')->name('search-blogs.')->group(function () {
        Route::get('/blogs-real-time-search', [BlogController::class, 'search'])->name('search');
    });
});

// search tags
Route::prefix('blog-sub-system')->group(function () {
    Route::prefix('search-tags')->name('search-tags.')->group(function () {
        Route::get('/tags-real-time-search', [TagsController::class, 'search'])->name('search');
    });
});


// search categories
Route::prefix('blog-sub-system')->group(function () {
    Route::prefix('search-categories')->name('search-categories.')->group(function () {
        Route::get('/categories-real-time-search', [BlogCategoriesController::class, 'search'])->name('search');
    });
});



Route::prefix('blog-sub-system')->group(function () {
    Route::prefix('recent-blogs')->name('recent-blogs.')->group(function () {
        Route::get('/', [BlogController::class, 'recentBlogs'])->name('recentBlogs');
    });
});

Route::prefix('blog-sub-system')->group(function () {
    Route::get('blogs/{id}/related-recent', [BlogController::class, 'getRelatedRecentBlogs'])->name('related-recent-blogs');
});

Route::prefix('blog-sub-system')->group(function () {
    Route::get('blogs/{id}/related-categories', [BlogController::class, 'getCategoriesForBlog'])->name('related-categories');
});

Route::prefix('blog-sub-system')->group(function () {
    Route::get('blogs/{id}/related-tags', [BlogController::class, 'getTagsForBlog'])->name('related-tags');
});

// Get blogs by category
Route::prefix('blog-sub-system')->group(function () {
    Route::get('blogs-by-category', [BlogController::class, 'getBlogsByCategory'])->name('blogs.byCategory');
});

// Get blogs by tag
Route::prefix('blog-sub-system')->group(function () {
    Route::get('blogs-by-tag', [BlogController::class, 'getBlogsByTag'])->name('blogs.byTag');
});








