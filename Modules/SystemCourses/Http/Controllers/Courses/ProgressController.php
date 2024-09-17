<?php

namespace Modules\SystemCourses\Http\Controllers\Courses;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;
use Carbon\Carbon;

class ProgressController extends Controller
{
    /**
     * Display a listing of the progress records.
     */
    public function index(): JsonResponse
    {
        $progressRecords = DB::table('par_progress')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $progressRecords
        ]);
    }

    /**
     * Display the specified progress record.
     */
    public function show($id): JsonResponse
    {
        $progressRecord = DB::table('par_progress')->find($id);

        if (!$progressRecord) {
            return response()->json([
                'success' => false,
                'message' => 'Progress record not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $progressRecord
        ]);
    }

    /**
     * Store a newly created progress record in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            // 'progress_percentage' => 'required|integer|between(0,100)',
            'progress_percentage' => 'required|integer|between:0,100',
            'completed' => 'required|boolean',
            'last_viewed_material_id' => 'nullable|integer',
            'last_viewed_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $progressRecordId = DB::table('par_progress')->insertGetId([
            'student_id' => $request->input('student_id'),
            'course_id' => $request->input('course_id'),
            'progress_percentage' => $request->input('progress_percentage'),
            'completed' => $request->input('completed'),
            'last_viewed_material_id' => $request->input('last_viewed_material_id'),
            'last_viewed_at' => $request->input('last_viewed_at'),
            'created_by' => auth()->id(),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_progress',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($progressRecordId),
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
            'message' => 'Progress record created successfully',
            'data' => $progressRecordId
        ], 201);
    }

    /**
     * Update the specified progress record in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $progressRecord = DB::table('par_progress')->find($id);

        if (!$progressRecord) {
            return response()->json([
                'success' => false,
                'message' => 'Progress record not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            // 'progress_percentage' => 'required|integer|between(0,100)',
            'progress_percentage' => 'required|integer|between:0,100',
            'completed' => 'required|boolean',
            'last_viewed_material_id' => 'nullable|integer',
            'last_viewed_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$progressRecord;

        DB::table('par_progress')
            ->where('id', $id)
            ->update([
                'student_id' => $request->input('student_id'),
                'course_id' => $request->input('course_id'),
                'progress_percentage' => $request->input('progress_percentage'),
                'completed' => $request->input('completed'),
                'last_viewed_material_id' => $request->input('last_viewed_material_id'),
                'last_viewed_at' => $request->input('last_viewed_at'),
                'updated_by' => auth()->id(),
                'updated_at' => now(),
            ]);

        // Audit trail logic for update
        $updatedProgressRecord = DB::table('par_progress')->find($id);

        $auditTrailData = [
            'table_name' => 'par_progress',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedProgressRecord),
            'user_id' => auth()->id(),
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
            'message' => 'Progress record updated successfully',
            'data' => $updatedProgressRecord
        ], 200);
    }

    /**
     * Remove the specified progress record from storage.
     */
    public function destroy($id): JsonResponse
    {
        $progressRecord = DB::table('par_progress')->find($id);

        if (!$progressRecord) {
            return response()->json([
                'success' => false,
                'message' => 'Progress record not found'
            ], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$progressRecord;

        $auditTrailData = [
            'table_name' => 'par_progress',
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

        DB::table('par_progress')->where('id', $id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Progress record deleted successfully'
        ], 200);
    }
}
