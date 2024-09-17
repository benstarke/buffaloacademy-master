<?php

namespace Modules\SystemCourses\Http\Controllers\Courses;

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

class CategorySubCategoryMappingController extends Controller
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
        $mappings = DB::table('par_category_sub_category_mapping')->latest()->get();

        // Add duration field
        $mappings = $mappings->map(function ($mapping) {
            $createdDate = Carbon::parse($mapping->created_at);
            $mapping->duration = $createdDate->diffForHumans();
            return $mapping;
        });

        return response()->json([
            'success' => true,
            'data' => $mappings
        ]);
    }

    /**
     * Display the specified resource.  
     */
    public function show($id): JsonResponse
    {
        $mapping = DB::table('par_category_sub_category_mapping')
            ->join('par_users', 'par_category_sub_category_mapping.created_by', '=', 'par_users.id')
            ->select('par_category_sub_category_mapping.*', 'par_users.name_en as author')
            ->where('par_category_sub_category_mapping.id', $id)
            ->first();

        if (!$mapping) {
            return response()->json([
                'success' => false,
                'message' => 'Category-SubCategory mapping not found'
            ], 404);
        }

        // Calculate the duration since the mapping was created using Carbon
        $createdDate = Carbon::parse($mapping->created_at);
        $mapping->duration = $createdDate->diffForHumans(); // Add duration field

        return response()->json([
            'success' => true,
            'data' => $mapping
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the input data
        $validator = Validator::make($request->all(), [
            'course_category_id' => 'required|integer',
            'course_sub_category_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
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

            // Prepare the data for insertion
            $data = [
                'course_category_id' => $request->input('course_category_id'),
                'course_sub_category_id' => $request->input('course_sub_category_id'),
                'created_by' => $userEmail,
                'created_at' => now(),
            ];

            // Insert the new mapping and get its ID
            $mappingId = DB::table('par_category_sub_category_mapping')->insertGetId($data);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_category_sub_category_mapping',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($data),
                'user_id' => $userEmail,
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
                'message' => 'Category-SubCategory mapping created successfully',
                'data' => $mappingId
            ], 201);

        } catch (\Illuminate\Database\QueryException $e) {
            // Check for unique constraint violation
            if ($e->getCode() == '23000') { // SQLSTATE code for integrity constraint violation
                return response()->json([
                    'error' => 'A mapping with this subcategory already exists.'
                ], 409); // HTTP status code for conflict
            }

            // If it's not a unique constraint violation, rethrow the exception
            throw $e;
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }




    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $course_category_id, $course_sub_category_id): JsonResponse
    {
        // Find the existing mapping using the composite key
        $mapping = DB::table('par_category_sub_category_mapping')
            ->where('course_category_id', $course_category_id)
            ->where('course_sub_category_id', $course_sub_category_id)
            ->first();

        if (!$mapping) {
            return response()->json([
                'success' => false,
                'message' => 'Category-SubCategory mapping not found'
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

            // Manually check for uniqueness of course_sub_category_id
            $existingMapping = DB::table('par_category_sub_category_mapping')
                ->where('course_sub_category_id', $request->input('course_sub_category_id'))
                ->where(function ($query) use ($course_category_id, $course_sub_category_id) {
                    $query->where('course_category_id', '<>', $course_category_id)
                        ->orWhere('course_sub_category_id', '<>', $course_sub_category_id);
                })
                ->first();

            if ($existingMapping) {
                return response()->json([
                    'success' => false,
                    'message' => 'A mapping with this SubCategory already exists'
                ], 400);
            }

            // Store the previous data for audit trail
            $previousData = (array)$mapping;

            // Update the mapping
            DB::table('par_category_sub_category_mapping')
                ->where('course_category_id', $course_category_id)
                ->where('course_sub_category_id', $course_sub_category_id)
                ->update([
                    'course_category_id' => $request->input('course_category_id'),
                    'course_sub_category_id' => $request->input('course_sub_category_id'),
                    'updated_by' => $userEmail,
                    'updated_at' => now(),
                ]);

            // Fetch the updated mapping data for audit trail
            $updatedMapping = DB::table('par_category_sub_category_mapping')
                ->where('course_category_id', $course_category_id)
                ->where('course_sub_category_id', $course_sub_category_id)
                ->first();

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_category_sub_category_mapping',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedMapping),
                'user_id' => $userEmail,
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
                'message' => 'Category-SubCategory mapping updated successfully',
                'data' => $updatedMapping
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($course_category_id, $course_sub_category_id): JsonResponse
    {
        // Find the existing mapping using the composite key
        $mapping = DB::table('par_category_sub_category_mapping')
            ->where('course_category_id', $course_category_id)
            ->where('course_sub_category_id', $course_sub_category_id)
            ->first();

        if (!$mapping) {
            return response()->json([
                'success' => false,
                'message' => 'Category-SubCategory mapping not found'
            ], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId(request());

            // Check if the user is an instructor or regular user
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            // If email is not found, return an error
            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Audit trail logic for deletion
            $previousData = (array)$mapping;

            $auditTrailData = [
                'table_name' => 'par_category_sub_category_mapping',
                'table_action' => 'delete',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => null,
                'user_id' => $userEmail,
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                $auditTrailData['prev_tabledata'],
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            // Perform the deletion
            DB::table('par_category_sub_category_mapping')
                ->where('course_category_id', $course_category_id)
                ->where('course_sub_category_id', $course_sub_category_id)
                ->delete();

            return response()->json([
                'success' => true,
                'message' => 'Category-SubCategory mapping deleted successfully'
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
        $mappings = $request->input('mappings'); // Expecting an array of category-subcategory pairs

        // Check if the mappings array is empty or not provided
        if (empty($mappings) || !is_array($mappings)) {
            return response()->json([
                'success' => false,
                'message' => 'No valid mappings provided'
            ], 400);
        }

        // Extract the category-subcategory pairs into separate arrays
        $categoryIds = array_column($mappings, 'course_category_id');
        $subCategoryIds = array_column($mappings, 'course_sub_category_id');

        // Fetch the existing mappings for those pairs
        $existingMappings = DB::table('par_category_sub_category_mapping')
            ->whereIn('course_category_id', $categoryIds)
            ->whereIn('course_sub_category_id', $subCategoryIds)
            ->get();

        if ($existingMappings->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Category-SubCategory mappings not found'
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
            foreach ($existingMappings as $mapping) {
                $previousData = (array)$mapping;

                $auditTrailData = [
                    'table_name' => 'par_category_sub_category_mapping',
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

            // Delete the mappings and get the count of deleted records
            $deletedCount = DB::table('par_category_sub_category_mapping')
                ->whereIn('course_category_id', $categoryIds)
                ->whereIn('course_sub_category_id', $subCategoryIds)
                ->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Category-SubCategory mapping(s) deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


}
