<?php

namespace Modules\SystemCourses\Http\Controllers\Materials;

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
use Illuminate\Validation\Rule;


class MaterialsController extends Controller
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
        $materials = DB::table('par_materials')->latest()->get();

        // Add duration field
        $materials = $materials->map(function ($material) {
            $createdDate = Carbon::parse($material->created_at);
            $material->duration = $createdDate->diffForHumans();
            return $material;
        });

        return response()->json([
            'success' => true,
            'data' => $materials
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $material = DB::table('par_materials')->find($id);

        if (!$material) {
            return response()->json(['message' => 'Material not found'], 404);
        }

        return response()->json($material);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'lesson_id' => 'required|integer',
            'title' => 'required|string|max:255|unique:par_materials',
            'type' => 'required|in:video,document,zipped,dataset,others',
            'content' => 'required|file|max:205824', // 201MB max size
            // 'content' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,csv,zip,mp4,mov,avi,mpg|max:10000', // Adjust MIME types as needed
            // 'created_by' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $contentPath = null;

        if ($request->hasFile('content')) {
            $file = $request->file('content');
            $fileType = $request->input('type');
            $folderPath = '';

            switch ($fileType) {
                case 'video':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/videos');
                    break;
                case 'document':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/documents');
                    break;
                case 'zipped':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/zipped-files');
                    break;
                case 'dataset':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/datasets');
                    break;
                case 'others':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/others');
                    break;
                case 'quiz':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/quiz');
                    break;
            }

            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($folderPath, $fileName);
            $contentPath = 'assets/uploads/courses/contents/materials/' . ($fileType === 'video' ? 'videos/' : ($fileType === 'document' ? 'documents/' : ($fileType === 'zipped' ? 'zipped-files/' : ($fileType === 'dataset' ? 'datasets/' : ($fileType === 'quiz' ? 'quiz/' : 'others/'))))) . $fileName;
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

            $materialData = [
                'lesson_id' => $request->input('lesson_id'),
                'title' => $request->input('title'),
                'type' => $request->input('type'),
                'content' => $contentPath,
                'created_by' => $userEmail,
                'created_at' => now(),
            ];

            $materialId = DB::table('par_materials')->insertGetId($materialData);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_materials',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($materialData),
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
                'message' => 'Material created successfully',
                'data' => $materialId
            ], 201);

        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        // Fetch the current material
        $material = DB::table('par_materials')->find($id);

        if (!$material) {
            return response()->json(['message' => 'Material not found'], 404);
        }

        // Validate request data
        $validator = Validator::make($request->all(), [
            'lesson_id' => 'required|integer',
            'title' => [
                'required',
                'string',
                'max:50',
                Rule::unique('par_materials')->ignore($id),
            ],
            'type' => 'required|in:video,document,zipped,dataset,others',
            'content' => 'nullable|file|max:205824', // 201MB max size
        ]);

        if ($validator->fails()) {
            Log::error($validator->errors());  // This will log validation errors for debugging
            return response()->json(['error' => $validator->errors()], 400);
        }
        

        // Store the previous data for audit trail
        $oldData = (array)$material;

        // Prepare content path
        $contentPath = $material->content;

        if ($request->hasFile('content')) {
            $file = $request->file('content');
            $fileType = $request->input('type');
            $folderPath = '';

            switch ($fileType) {
                case 'video':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/videos');
                    break;
                case 'document':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/documents');
                    break;
                case 'zipped':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/zipped-files');
                    break;
                case 'dataset':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/datasets');
                    break;
                case 'others':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/others');
                    break;
                case 'quiz':
                    $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/courses/contents/materials/quiz');
                    break;
            }

            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($folderPath, $fileName);
            $contentPath = 'assets/uploads/courses/contents/materials/' . ($fileType === 'video' ? 'videos/' : ($fileType === 'document' ? 'documents/' : ($fileType === 'zipped' ? 'zipped-files/' : ($fileType === 'dataset' ? 'datasets/' : ($fileType === 'quiz' ? 'quiz/' : 'others/'))))) . $fileName;
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Fetch the email of the current user
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            // Prepare the updated data
            $updateData = [
                'lesson_id' => $request->input('lesson_id'),
                'title' => $request->input('title'),
                'type' => $request->input('type'),
                'content' => $contentPath,
                'updated_by' => $userEmail, // Include the email of the user
                'updated_at' => now(),
            ];

            // Update the material
            DB::table('par_materials')->where('id', $id)->update($updateData);

            // Fetch the updated material data for audit trail
            $newData = DB::table('par_materials')->find($id);

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_materials',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($oldData),
                'current_tabledata' => json_encode($newData),
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
                'message' => 'Material updated successfully',
                'data' => $newData
            ], 200);

        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }



    /**
     * Remove the specified resource from storage.
    */
    public function destroy($id): JsonResponse
    {
        // Fetch the material record
        $material = DB::table('par_materials')->find($id);

        if (!$material) {
            return response()->json(['message' => 'Material not found'], 404);
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

            // Store the previous data for audit trail
            $previousData = (array)$material;

            // Audit trail logic for deletion
            $auditTrailData = [
                'table_name' => 'par_materials',
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

            // Delete the material
            DB::table('par_materials')->where('id', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Material deleted successfully'
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

        $materials = DB::table('par_materials')->whereIn('id', $ids)->get();

        if ($materials->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Materials not found'
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
            foreach ($materials as $material) {
                $previousData = (array)$material;

                $auditTrailData = [
                    'table_name' => 'par_materials',
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
            $deletedCount = DB::table('par_materials')->whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => $deletedCount . ' Material(s) deleted successfully'
            ], 200);

        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}
