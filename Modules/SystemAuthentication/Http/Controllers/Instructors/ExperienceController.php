<?php

namespace Modules\SystemAuthentication\Http\Controllers\Instructors;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $experiences = DB::table('par_instructor_experience')->get();
        return response()->json($experiences);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $experience = DB::table('par_instructor_experience')->find($id);

        if (!$experience) {
            return response()->json(['message' => 'Experience record not found'], 404);
        }

        return response()->json($experience);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'instructor_id' => 'required|integer',
            'experience_name' => 'required|string|max:255',
            'experience_description' => 'required|string|max:255',
            'experience_year' => 'required|string|max:255',
            'created_by' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $experienceData = [
            'instructor_id' => $request->input('instructor_id'),
            'experience_name' => $request->input('experience_name'),
            'experience_description' => $request->input('experience_description'),
            'experience_year' => $request->input('experience_year'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ];

        $experienceId = DB::table('par_instructor_experience')->insertGetId($experienceData);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_instructor_experience',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($experienceData),
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
            'message' => 'Experience record created successfully',
            'data' => $experienceId
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $experience = DB::table('par_instructor_experience')->find($id);

        if (!$experience) {
            return response()->json(['message' => 'Experience record not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'instructor_id' => 'required|integer',
            'experience_name' => 'required|string|max:255',
            'experience_description' => 'required|string|max:255',
            'experience_year' => 'required|string|max:255',
            'updated_by' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $oldData = (array)$experience;

        $updateData = [
            'instructor_id' => $request->input('instructor_id'),
            'experience_name' => $request->input('experience_name'),
            'experience_description' => $request->input('experience_description'),
            'experience_year' => $request->input('experience_year'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ];

        DB::table('par_instructor_experience')->where('id', $id)->update($updateData);

        // Audit trail logic for update
        $newData = DB::table('par_instructor_experience')->find($id);

        $auditTrailData = [
            'table_name' => 'par_instructor_experience',
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
            'message' => 'Experience record updated successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $experience = DB::table('par_instructor_experience')->find($id);

        if (!$experience) {
            return response()->json(['message' => 'Experience record not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$experience;

        $auditTrailData = [
            'table_name' => 'par_instructor_experience',
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

        DB::table('par_instructor_experience')->where('id', $id)->delete();

        return response()->json(['message' => 'Experience record deleted successfully'], 200);
    }
}
