<?php

namespace Modules\SystemInformation\Http\Controllers\Contact;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class CompanyBranchesController extends Controller
{
    public function index()
    {
        $branches = DB::table('par_company_branches')->get();
        return response()->json($branches);
    }

    public function show($id)
    {
        $branch = DB::table('par_company_branches')->find($id);

        if (!$branch) {
            return response()->json(['message' => 'Branch not found'], 404);
        }

        return response()->json($branch);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:par_company_branches|max:220',
            'description' => 'nullable|max:2000',
            'initial' => 'nullable|max:100',
            'branch_icon_id' => 'required|exists:par_icons,id',
            'created_by' => 'required|max:50',
            'created_at' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $branchId = DB::table('par_company_branches')->insertGetId([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'initial' => $request->input('initial'),
            'branch_icon_id' => $request->input('branch_icon_id'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_company_branches',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($branchId),
            'user_id' => $branchId,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Branch created successfully',
            'data' => $branchId
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $branch = DB::table('par_company_branches')->find($id);

        if (!$branch) {
            return response()->json(['message' => 'Branch not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:220|unique:par_company_branches,name,' . $id,
            'description' => 'nullable|max:2000',
            'initial' => 'nullable|max:100',
            'branch_icon_id' => 'required|exists:par_icons,id',
            'updated_by' => 'nullable|max:50',
            'updated_at' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$branch;

        DB::table('par_company_branches')->where('id', $id)->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'initial' => $request->input('initial'),
            'branch_icon_id' => $request->input('branch_icon_id'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedBranch = DB::table('par_company_branches')->find($id);

        $auditTrailData = [
            'table_name' => 'par_company_branches',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedBranch),
            'user_id' => $id,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            $auditTrailData['prev_tabledata'],
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Branch updated successfully',
            'data' => $updatedBranch
        ], 200);
    }

    public function destroy($id)
    {
        $branch = DB::table('par_company_branches')->find($id);

        if (!$branch) {
            return response()->json(['message' => 'Branch not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$branch;

        $auditTrailData = [
            'table_name' => 'par_company_branches',
            'table_action' => 'delete',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => null,
            'user_id' => $id,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            $auditTrailData['prev_tabledata'],
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        DB::table('par_company_branches')->where('id', $id)->delete();

        return response()->json(['message' => 'Branch deleted successfully'], 200);
    }
}
