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

class TagsController extends Controller
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
     */
    public function index(): JsonResponse
    {
        $tags = DB::table('par_tags')->latest()->get();

        // Add duration field
        $tags = $tags->map(function ($tag) {
            $createdDate = Carbon::parse($tag->created_at);
            $tag->duration = $createdDate->diffForHumans();
            return $tag;
        });

        return response()->json([
            'success' => true,
            'data' => $tags
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $tag = DB::table('par_tags')
                ->join('par_users', 'par_tags.created_by', '=', 'par_users.id')
                ->select('par_tags.*', 'par_users.name_en as author')
                ->where('par_tags.id', $id)
                ->first();

        if (!$tag) {
            return response()->json([
                'success' => false,
                'message' => 'Tag not found'
            ], 404);
        }

        // Calculate the duration since the blog was created using Carbon
        $createdDate = Carbon::parse($tag->created_at);
        $tag->duration = $createdDate->diffForHumans(); // Add duration field

        return response()->json([
            'success' => true,
            'data' => $tag
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request): JsonResponse
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|string|max:255|unique:par_tags',
    //         'description' => 'nullable|string',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['error' => $validator->errors()], 400);
    //     }

    //     try {
    //         // Fetch the current user ID from the JWT token
    //         $createdBy = $this->getCurrentUserId($request);

    //         $tagId = DB::table('par_tags')->insertGetId([
    //             'name' => $request->name,
    //             'description' => $request->description,
    //             'created_by' => $createdBy,
    //             'created_at' => now(),
    //         ]);

    //         // Audit trail logic for creation
    //         $auditTrailData = [
    //             'table_name' => 'par_tags',
    //             'table_action' => 'insert',
    //             'current_tabledata' => json_encode($tagId),
    //             'user_id' => $createdBy,
    //         ];

    //         DbHelper::auditTrail(
    //             $auditTrailData['table_name'],
    //             $auditTrailData['table_action'],
    //             null,
    //             $auditTrailData['current_tabledata'],
    //             $auditTrailData['user_id']
    //         );

    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Tag created successfully',
    //             'data' => $tagId
    //         ], 201);
    //     } catch (Exception $e) {
    //         return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
    //     }
    // }

    public function store(Request $request): JsonResponse
    {

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Check if the user is an instructor
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');

            // If not found as an instructor, check if they are a regular user
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            // If email is still not found, return an error
            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            $tagId = DB::table('par_tags')->insertGetId([
                'name' => $request->name,
                'description' => $request->description,
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_tags',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($tagId),
                // 'user_id' => $userId, // Store the user ID for the audit trail
                'user_id' => $userEmail, // Use the user email for the audit trail
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                null,
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            return response()->json([
                'success' => true,
                'message' => 'Tag created successfully',
                'data' => $tagId
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }



    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, $id): JsonResponse
    // {
    //     $validator = Validator::make($request->all(), [
    //     'name' => 'required|string|max:255',
    //     'description' => 'nullable|string',
    //     ]);

    //     if ($validator->fails()) {
    //     return response()->json(['error' => $validator->errors()], 400);
    //     }

    //     $tag = DB::table('par_tags')->find($id);

    //     if (!$tag) {
    //     return response()->json([
    //         'success' => false,
    //         'message' => 'Tag not found'
    //     ], 404);
    //     }

    //     $previousData = (array)$tag;

    //     DB::table('par_tags')
    //     ->where('id', $id)
    //     ->update([
    //         'name' => $request->name,
    //         'description' => $request->description,
    //         'updated_by' => auth()->id(),
    //         'updated_at' => now(),
    //     ]);

    //     // Audit trail logic for update
    //     $updatedTag = DB::table('par_tags')->find($id);

    //     $auditTrailData = [
    //     'table_name' => 'par_tags',
    //     'table_action' => 'update',
    //     'prev_tabledata' => json_encode($previousData),
    //     'current_tabledata' => json_encode($updatedTag),
    //     'user_id' => $id,
    //     ];

    //     DbHelper::auditTrail(
    //     $auditTrailData['table_name'],
    //     $auditTrailData['table_action'],
    //     $auditTrailData['prev_tabledata'],
    //     $auditTrailData['current_tabledata'],
    //     $auditTrailData['user_id']
    //     );

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Tag updated successfully',
    //         'data' => $updatedTag
    //     ], 200);
    // }
    public function update(Request $request, $id): JsonResponse
    {

        // Fetch the tag to be updated
        $tag = DB::table('par_tags')->find($id);

        if (!$tag) {
            return response()->json([
                'success' => false,
                'message' => 'Tag not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Check if the user is an instructor
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');

            // If not found as an instructor, check if they are a regular user
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            // If email is still not found, return an error
            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Store the previous data for audit trail
            $previousData = (array)$tag;

            // Update the tag
            DB::table('par_tags')
                ->where('id', $id)
                ->update([
                    'name' => $request->name,
                    'description' => $request->description,
                    'updated_by' => $userEmail,
                    'updated_at' => now(),
                ]);

            // Fetch the updated tag data for audit trail
            $updatedTag = DB::table('par_tags')->find($id);

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_tags',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedTag),
                // 'user_id' => $userId, // Store the user ID for the audit trail
                'user_id' => $userEmail, // Use the user email for the audit trail
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                $auditTrailData['prev_tabledata'],
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            return response()->json([
                'success' => true,
                'message' => 'Tag updated successfully',
                'data' => $updatedTag
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    // public function destroy($id): JsonResponse
    // {
    //     $tag = DB::table('par_tags')->find($id);

    //     if (!$tag) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Tag not found'
    //         ], 404);
    //     }

    //     // Audit trail logic for deletion
    //     $previousData = (array)$tag;

    //     $auditTrailData = [
    //         'table_name' => 'par_tags',
    //         'table_action' => 'delete',
    //         'prev_tabledata' => json_encode($previousData),
    //         'current_tabledata' => null,
    //         'user_id' => $id,
    //     ];

    //     DbHelper::auditTrail(
    //         $auditTrailData['table_name'],
    //         $auditTrailData['table_action'],
    //         $auditTrailData['prev_tabledata'],
    //         $auditTrailData['current_tabledata'],
    //         $auditTrailData['user_id']
    //     );

    //     DB::table('par_tags')->where('id', $id)->delete();

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Tag deleted successfully'
    //     ], 200);
    // }

    /**
     * Remove the specified resource from storage.
     * delete one record at a time
     */
    public function destroy($id): JsonResponse
    {
        // Fetch the tag to be deleted
        $tag = DB::table('par_tags')->find($id);

        if (!$tag) {
            return response()->json([
                'success' => false,
                'message' => 'Tag not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId(request());

            // Check if the user is an instructor
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');

            // If not found as an instructor, check if they are a regular user
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            // If email is still not found, return an error
            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Audit trail logic for deletion
            $previousData = (array)$tag;

            $auditTrailData = [
                'table_name' => 'par_tags',
                'table_action' => 'delete',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => null,
                // 'user_id' => $userId, // Use the user ID for the audit trail
                'user_id' => $userEmail, // Use the user email for the audit trail
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                $auditTrailData['prev_tabledata'],
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            // Delete the tag
            DB::table('par_tags')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Tag deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * delete multiple records at a time
     */
    public function destroyMultiple(Request $request): JsonResponse
    {
        $ids = $request->input('ids'); // Expecting an array of IDs

        // Check if the IDs array is empty or not provided
        if (empty($ids) || !is_array($ids)) {
            return response()->json([
                'success' => false,
                'message' => 'No valid IDs provided'
            ], 400);
        }

        $tags = DB::table('par_tags')->whereIn('id', $ids)->get();

        if ($tags->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tags not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId(request());

            // Check if the user is an instructor
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');

            // If not found as an instructor, check if they are a regular user
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            // If email is still not found, return an error
            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Audit trail logic for deletion
            foreach ($tags as $tag) {
                $previousData = (array)$tag;

                $auditTrailData = [
                    'table_name' => 'par_tags',
                    'table_action' => 'delete',
                    'prev_tabledata' => json_encode($previousData),
                    'current_tabledata' => null,
                    'user_id' => $userEmail, // Use the user email for the audit trail
                ];

                DbHelper::auditTrail(
                    $auditTrailData['table_name'],
                    $auditTrailData['table_action'],
                    $auditTrailData['prev_tabledata'],
                    $auditTrailData['current_tabledata'],
                    $auditTrailData['user_id']
                );
            }

            // Delete the records and get the count of deleted records
            $deletedCount = DB::table('par_tags')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Tag(s) deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }



    

    // SEARCH course
    public function search(Request $request): JsonResponse
    {
        try {
            $query = DB::table('par_tags');

            if ($request->has('searchText') && !empty($request->searchText)) {
                $searchText = $request->searchText;
                $query->where(function ($q) use ($searchText) {
                    $q->where('name', 'like', '%' . $searchText . '%')
                    ->orWhere('description', 'like', '%' . $searchText . '%');
                });
            }

            $tags = $query->get();

            if ($tags->isEmpty()) {
                return response()->json(['message' => 'No tags found'], 404);
            }

            return response()->json($tags);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}

