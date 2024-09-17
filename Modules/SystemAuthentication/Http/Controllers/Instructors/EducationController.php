<?php

namespace Modules\SystemAuthentication\Http\Controllers\Instructors;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class EducationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $educations = DB::table('par_instructor_education')->get();
        return response()->json($educations);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $education = DB::table('par_instructor_education')->find($id);

        if (!$education) {
            return response()->json(['message' => 'Education record not found'], 404);
        }

        return response()->json($education);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'instructor_id' => 'required|integer',
            'level_name' => 'required|string|max:255',
            'level_description' => 'required|string|max:255',
            'year_study' => 'required|string|max:255',
            'created_by' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $educationData = [
            'instructor_id' => $request->input('instructor_id'),
            'level_name' => $request->input('level_name'),
            'level_description' => $request->input('level_description'),
            'year_study' => $request->input('year_study'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ];

        $educationId = DB::table('par_instructor_education')->insertGetId($educationData);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_instructor_education',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($educationData),
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
            'message' => 'Education record created successfully',
            'data' => $educationId
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $education = DB::table('par_instructor_education')->find($id);

        if (!$education) {
            return response()->json(['message' => 'Education record not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'instructor_id' => 'required|integer',
            'level_name' => 'required|string|max:255',
            'level_description' => 'required|string|max:255',
            'year_study' => 'required|string|max:255',
            'updated_by' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $oldData = (array)$education;

        $updateData = [
            'instructor_id' => $request->input('instructor_id'),
            'level_name' => $request->input('level_name'),
            'level_description' => $request->input('level_description'),
            'year_study' => $request->input('year_study'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ];

        DB::table('par_instructor_education')->where('id', $id)->update($updateData);

        // Audit trail logic for update
        $newData = DB::table('par_instructor_education')->find($id);

        $auditTrailData = [
            'table_name' => 'par_instructor_education',
            'table_action' => 'update',
            'previous_tabledata' => json_encode($oldData),
            'current_tabledata' => json_encode($newData),
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
            'message' => 'Education record updated successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $education = DB::table('par_instructor_education')->find($id);

        if (!$education) {
            return response()->json(['message' => 'Education record not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$education;

        $auditTrailData = [
            'table_name' => 'par_instructor_education',
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

        DB::table('par_instructor_education')->where('id', $id)->delete();

        return response()->json(['message' => 'Education record deleted successfully'], 200);
    }
}
