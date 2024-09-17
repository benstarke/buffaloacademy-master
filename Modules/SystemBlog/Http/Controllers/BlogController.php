<?php

namespace Modules\SystemBlog\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;
use Carbon\Carbon;

use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Exception;

class BlogController extends Controller
{

    // first get the current id of the logged in user (admin/superadmin/writer) or instructor id
    private function getCurrentUserId(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            throw new \Exception('Token not provided', 401);
        }

        $payload = JWTAuth::setToken($token)->getPayload();
        return $payload['sub']; // Assuming 'sub' contains the user ID
    }


    /**
     * Display a listing of the resource.
     * FOR PUBLIC
     */
    // public function index(Request $request): JsonResponse
    // {
    //     $blogs = DB::table('par_blogs')
    //         ->join('par_blog_categories', 'par_blogs.blog_categories_id', '=', 'par_blog_categories.id')
    //         ->join('par_tags', 'par_blogs.tags_id', '=', 'par_tags.id')
    //         ->join('par_users', 'par_blogs.created_by', '=', 'par_users.id')
    //         ->select('par_blogs.*', 'par_blog_categories.name as category_name', 'par_tags.name as tag_name', 'par_users.name_en as author')
    //         ->where('par_blogs.blog_status_id', 1) // Only select published blogs
    //         ->latest()
    //         ->paginate(4); // Paginate with 6 items per page

    //     // Add duration field
    //     $blogs->getCollection()->transform(function ($blog) {
    //         $createdDate = Carbon::parse($blog->created_at);
    //         $blog->duration = $createdDate->diffForHumans();
    //         return $blog;
    //     });

    //     if ($blogs->isEmpty()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'No blogs found!'
    //         ], 404);
    //     }

    //     return response()->json([
    //         'success' => true,
    //         'data' => $blogs
    //     ]);
    // }



    public function index(Request $request): JsonResponse
    {
        $blogs = DB::table('par_blogs')
            ->join('par_blog_categories', 'par_blogs.blog_categories_id', '=', 'par_blog_categories.id')
            ->join('par_tags', 'par_blogs.tags_id', '=', 'par_tags.id')
            ->join('par_users', 'par_blogs.created_by', '=', 'par_users.id')
            ->select('par_blogs.*', 'par_blog_categories.name as category_name', 'par_tags.name as tag_name', 'par_users.name_en as author')
            ->where('par_blogs.blog_status_id', 1) // Only select published blogs
            ->latest()
            ->get(); // Retrieve all results without pagination

        // Add duration field
        $blogs->transform(function ($blog) {
            $createdDate = Carbon::parse($blog->created_at);
            $blog->duration = $createdDate->diffForHumans();
            return $blog;
        });

        if ($blogs->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No blogs found!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $blogs
        ]);
    }


    /**
     * Display a listing of the resource.
     * FOR DASHBOARD
     */
    public function indexDashboard(Request $request): JsonResponse
    {
        $blogs = DB::table('par_blogs')
            ->join('par_blog_categories', 'par_blogs.blog_categories_id', '=', 'par_blog_categories.id')
            ->join('par_tags', 'par_blogs.tags_id', '=', 'par_tags.id')
            ->join('par_users', 'par_blogs.created_by', '=', 'par_users.id')
            ->select('par_blogs.*', 'par_blog_categories.name as category_name', 'par_tags.name as tag_name', 'par_users.name_en as author')
            ->latest()
            ->get(); // Fetch the collection of blogs

        // Add duration field
        $blogs->transform(function ($blog) {
            $createdDate = Carbon::parse($blog->created_at);
            $blog->duration = $createdDate->diffForHumans();
            return $blog;
        });

        if ($blogs->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No blogs found!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $blogs
        ]);
    }



    public function recentBlogs(): JsonResponse
    {
        $recentBlogs = DB::table('par_blogs')
            ->join('par_blog_categories', 'par_blogs.blog_categories_id', '=', 'par_blog_categories.id')
            ->join('par_tags', 'par_blogs.tags_id', '=', 'par_tags.id')
            ->join('par_users', 'par_blogs.created_by', '=', 'par_users.id')
            ->select('par_blogs.*', 'par_blog_categories.name as category_name', 'par_tags.name as tag_name', 'par_users.name_en as author')
            ->where(function($query) {
                $query->where('par_blogs.created_at', '>=', Carbon::now()->subDay())
                    ->orWhere('par_blogs.updated_at', '>=', Carbon::now()->subDay());
            })
            ->latest('par_blogs.updated_at')
            ->get();

        // Add duration field
        $recentBlogs->transform(function ($blog) {
            $createdDate = Carbon::parse($blog->created_at);
            $blog->duration = $createdDate->diffForHumans();
            return $blog;
        });

        if ($recentBlogs->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No recent related blogs found!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'recentBlogs' => $recentBlogs
        ]);
    }



    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $blog = DB::table('par_blogs')
            ->join('par_users', 'par_blogs.created_by', '=', 'par_users.id')
            ->join('par_tags', 'par_blogs.tags_id', '=', 'par_tags.id')
            ->join('par_blog_categories', 'par_blogs.blog_categories_id', '=', 'par_blog_categories.id')
            ->select('par_blogs.*', 'par_users.name_en as author', 'par_blogs.created_at', 'par_blogs.updated_at', 'par_tags.name as tag_name', 'par_blog_categories.name as category_name')
            ->where('par_blogs.id', $id)
            ->first();

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $blog
        ]);
    }

    public function getRelatedRecentBlogs($id)
    {
        // Fetch the current blog
        $blog = DB::table('par_blogs')
            ->select('id')
            ->where('id', $id)
            ->first();

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found'
            ], 404);
        }

        // Fetch related recent blogs based on category or tags within 24 hours
        $relatedRecentBlogs = DB::table('par_blogs')
            ->join('par_blog_categories', 'par_blogs.blog_categories_id', '=', 'par_blog_categories.id')
            ->join('par_tags', 'par_blogs.tags_id', '=', 'par_tags.id')
            ->join('par_users', 'par_blogs.created_by', '=', 'par_users.id')
            ->select('par_blogs.*', 'par_blog_categories.name as category_name', 'par_tags.name as tag_name', 'par_users.name_en as author')
            ->where(function ($query) use ($blog) {
                $query->whereExists(function ($query) use ($blog) {
                    $query->select(DB::raw(1))
                        ->from('par_blog_categories')
                        ->whereRaw('par_blogs.blog_categories_id = par_blog_categories.id')
                        ->whereIn('par_blog_categories.id', function ($query) use ($blog) {
                            $query->select('blog_categories_id')
                                    ->from('par_blogs')
                                    ->where('id', $blog->id);
                        });
                })->orWhereExists(function ($query) use ($blog) {
                    $query->select(DB::raw(1))
                        ->from('par_tags')
                        ->whereRaw('par_blogs.tags_id = par_tags.id')
                        ->whereIn('par_tags.id', function ($query) use ($blog) {
                            $query->select('tags_id')
                                    ->from('par_blogs')
                                    ->where('id', $blog->id);
                        });
                });
            })
            ->where(function($query) {
                $query->where('par_blogs.created_at', '>=', Carbon::now()->subDay())
                    ->orWhere('par_blogs.updated_at', '>=', Carbon::now()->subDay());
            })
            ->where('par_blogs.id', '!=', $blog->id) // Exclude current blog
            ->orderByDesc('par_blogs.updated_at')
            ->get();

        // Add duration field
        $relatedRecentBlogs->transform(function ($blog) {
            $createdDate = Carbon::parse($blog->created_at);
            $blog->duration = $createdDate->diffForHumans();
            return $blog;
        });

        if ($relatedRecentBlogs->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No recent related blogs found!'
            ], 404);
        }
    

        return response()->json([
            'success' => true,
            'relatedRecentBlogs' => $relatedRecentBlogs
        ]);
    }


    public function getCategoriesForBlog($id)
    {
        $categories = DB::table('par_blog_categories')
            ->join('par_blogs', 'par_blogs.blog_categories_id', '=', 'par_blog_categories.id')
            ->where('par_blogs.id', $id)
            ->select('par_blog_categories.id', 'par_blog_categories.name')
            ->get();

        if ($categories->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Categories not found for the blog'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function getTagsForBlog($id)
    {
        $tags = DB::table('par_tags')
            ->join('par_blogs', 'par_blogs.tags_id', '=', 'par_tags.id')
            ->where('par_blogs.id', $id)
            ->select('par_tags.id', 'par_tags.name')
            ->get();

        if ($tags->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tags not found for the blog'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $tags
        ]);
    }


    public function getBlogsByCategory(Request $request)
    {
        $categoryId = $request->query('category_id');
        $perPage = $request->query('per_page', 4); // Number of items per page, default is 4

        if (!$categoryId) {
            return response()->json([
                'success' => false,
                'message' => 'Category ID is required'
            ], 400);
        }

        $blogs = DB::table('par_blogs')
            ->join('par_users', 'par_blogs.created_by', '=', 'par_users.id')
            ->join('par_tags', 'par_blogs.tags_id', '=', 'par_tags.id')
            ->join('par_blog_categories', 'par_blogs.blog_categories_id', '=', 'par_blog_categories.id')
            ->select('par_blogs.*', 'par_users.name_en as author', 'par_tags.name as tag_name', 'par_blog_categories.name as category_name')
            ->where('par_blog_categories.id', $categoryId)
            ->paginate($perPage);

        if ($blogs->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No blogs found for this category'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $blogs
        ]);
    }



    public function getBlogsByTag(Request $request)
    {
        $tagId = $request->query('tag_id');
        $perPage = $request->query('per_page', 4); // Number of items per page, default is 4

        if (!$tagId) {
            return response()->json([
                'success' => false,
                'message' => 'Tag ID is required'
            ], 400);
        }

        $blogs = DB::table('par_blogs')
            ->join('par_users', 'par_blogs.created_by', '=', 'par_users.id')
            ->join('par_tags', 'par_blogs.tags_id', '=', 'par_tags.id')
            ->join('par_blog_categories', 'par_blogs.blog_categories_id', '=', 'par_blog_categories.id')
            ->select('par_blogs.*', 'par_users.name_en as author', 'par_tags.name as tag_name', 'par_blog_categories.name as category_name')
            ->where('par_tags.id', $tagId)
            ->paginate($perPage);

        if ($blogs->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No blogs found for this tag'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $blogs
        ]);
    }

    /**
     * store the specified resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:par_blogs',
            'description' => 'nullable|string|max:10000',
            'blog_image_path' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'blog_categories_id' => 'required|integer',
            'tags_id' => 'required|integer',
            'blog_status_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Get the image file from the request
        $image = $request->file('blog_image_path');

        if ($image) {
            // Define the folder path where the image will be stored dynamically
            $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/blogs-posts');

            // Generate a unique file name for the image
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();

            // Store the image in the specified folder with the unique file name
            $image->move($folderPath, $imageName);

            // Insert the blog data into the database
            $blogId = DB::table('par_blogs')->insertGetId([
                'name' => $request->input('name'),
                'blog_image_path' => 'views/dev_portal/buffalofrontend/src/assets/uploads/blogs-posts/' . $imageName,
                'description' => $request->input('description'),
                'blog_categories_id' => $request->input('blog_categories_id'),
                'tags_id' => $request->input('tags_id'),
                'blog_status_id' => $request->input('blog_status_id'),
                'created_at' => now(),
                'created_by' => auth()->id(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_blogs',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($blogId),
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
                'message' => 'Blog record created successfully',
                'data' => $blogId
            ], 201);
        }

        return response()->json([
            'message' => 'No blog image was uploaded'
        ], 400);
    }


    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $blog = DB::table('par_blogs')->find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:par_blogs,name,' . $id,
            'description' => 'nullable|string|max:10000',
            'blog_image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'blog_categories_id' => 'required|integer',
            'tags_id' => 'required|integer',
            'blog_status_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Get the image file from the request
        $image = $request->file('blog_image_path');
        $imageName = $blog->blog_image_path; // Keep the existing image path

        if ($image) {
            // Define the folder path where the image will be stored dynamically
            $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/blogs-posts');

            // Generate a unique file name for the image
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();

            // Store the image in the specified folder with the unique file name
            $image->move($folderPath, $imageName);

            // Update the image path to be stored in the database
            $imageName = 'views/dev_portal/buffalofrontend/src/assets/uploads/blogs-posts/' . $imageName;
        }

        $oldBlogData = json_encode($blog); // Audit trail - old data

        DB::table('par_blogs')->where('id', $id)->update([
            'name' => $request->input('name'),
            'blog_image_path' => $imageName,
            'description' => $request->input('description'),
            'blog_categories_id' => $request->input('blog_categories_id'),
            'tags_id' => $request->input('tags_id'),
            'blog_status_id' => $request->input('blog_status_id'),
            'updated_at' => now(),
            'updated_by' => auth()->id(),
        ]);

        // Audit trail logic for update
        $newBlogData = json_encode(DB::table('par_blogs')->find($id)); // Audit trail - new data

        $auditTrailData = [
            'table_name' => 'par_blogs',
            'table_action' => 'update',
            'previous_tabledata' => $oldBlogData,
            'current_tabledata' => $newBlogData,
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
            'message' => 'Blog record updated successfully'
        ], 200);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $blog = DB::table('par_blogs')->find($id);

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog record not found'
            ], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$blog;

        $auditTrailData = [
            'table_name' => 'par_blogs',
            'table_action' => 'delete',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => null,
            'user_id' => auth()->id(),
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            $auditTrailData['prev_tabledata'],
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        DB::table('par_blogs')->where('id', $id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blog record deleted successfully'
        ], 200);
    }

    // SEARCH blogs
    public function search(Request $request): JsonResponse
    {
        try {
            $query = DB::table('par_blogs');

            if ($request->has('searchText') && !empty($request->searchText)) {
                $searchText = $request->searchText;
                $query->where(function ($q) use ($searchText) {
                    $q->where('name', 'like', '%' . $searchText . '%')
                    ->orWhere('description', 'like', '%' . $searchText . '%');
                });
            }

            $blogs = $query->get();

            if ($blogs->isEmpty()) {
                return response()->json(['message' => 'No blogs found'], 404);
            }

            return response()->json($blogs);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}