<?php

namespace Modules\SystemInformation\Http\Controllers\Contact;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class CompanyBranchInfoController extends Controller
{
    public function index()
    {
        $branchInfo = DB::table('par_company_branch_info')->get();
        return response()->json($branchInfo);
    }

    public function show($id)
    {
        $branchInfo = DB::table('par_company_branch_info')->find($id);

        if (!$branchInfo) {
            return response()->json(['message' => 'Branch info not found'], 404);
        }

        return response()->json($branchInfo);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'contact_image_path' => 'nullable|max:500',
            'title' => 'required|unique:par_company_branch_info|max:255',
            'description' => 'nullable|max:2000',
            'created_by' => 'required|max:50',
            'created_at' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $branchInfoId = DB::table('par_company_branch_info')->insertGetId([
            'contact_image_path' => $request->input('contact_image_path'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_company_branch_info',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($branchInfoId),
            'user_id' => $branchInfoId,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Branch info created successfully',
            'data' => $branchInfoId
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $branchInfo = DB::table('par_company_branch_info')->find($id);

        if (!$branchInfo) {
            return response()->json(['message' => 'Branch info not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'contact_image_path' => 'nullable|max:500',
            'title' => 'required|max:255|unique:par_company_branch_info,title,' . $id,
            'description' => 'nullable|max:2000',
            'updated_by' => 'nullable|max:50',
            'updated_at' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$branchInfo;

        DB::table('par_company_branch_info')->where('id', $id)->update([
            'contact_image_path' => $request->input('contact_image_path'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedBranchInfo = DB::table('par_company_branch_info')->find($id);

        $auditTrailData = [
            'table_name' => 'par_company_branch_info',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedBranchInfo),
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
            'message' => 'Branch info updated successfully',
            'data' => $updatedBranchInfo
        ], 200);
    }

    public function destroy($id)
    {
        $branchInfo = DB::table('par_company_branch_info')->find($id);

        if (!$branchInfo) {
            return response()->json(['message' => 'Branch info not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$branchInfo;

        $auditTrailData = [
            'table_name' => 'par_company_branch_info',
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

        DB::table('par_company_branch_info')->where('id', $id)->delete();

        return response()->json(['message' => 'Branch info deleted successfully'], 200);
    }
}

