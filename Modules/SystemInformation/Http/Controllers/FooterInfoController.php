<?php

namespace Modules\SystemInformation\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class FooterInfoController extends Controller
{
    public function index()
    {
        $footerInfo = DB::table('par_footer_info')->get();
        return response()->json($footerInfo);
    }

    public function show($id)
    {
        $footerInfo = DB::table('par_footer_info')->find($id);

        if (!$footerInfo) {
            return response()->json(['message' => 'Footer info not found'], 404);
        }

        return response()->json($footerInfo);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:par_footer_info|max:250',
            'description' => 'nullable|max:500',
            'year' => 'nullable|max:20',
            'created_by' => 'required|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $footerInfoId = DB::table('par_footer_info')->insertGetId([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'year' => $request->input('year'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_footer_info',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($footerInfoId),
            'user_id' => $footerInfoId,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Footer info created successfully',
            'data' => $footerInfoId
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $footerInfo = DB::table('par_footer_info')->find($id);

        if (!$footerInfo) {
            return response()->json(['message' => 'Footer info not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:par_footer_info,title,' . $id . '|max:250',
            'description' => 'nullable|max:500',
            'year' => 'nullable|max:20',
            'updated_by' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$footerInfo;

        DB::table('par_footer_info')->where('id', $id)->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'year' => $request->input('year'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedFooterInfo = DB::table('par_footer_info')->find($id);

        $auditTrailData = [
            'table_name' => 'par_footer_info',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedFooterInfo),
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
            'message' => 'Footer info updated successfully',
            'data' => $updatedFooterInfo
        ], 200);
    }

    public function destroy($id)
    {
        $footerInfo = DB::table('par_footer_info')->find($id);

        if (!$footerInfo) {
            return response()->json(['message' => 'Footer info not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$footerInfo;

        $auditTrailData = [
            'table_name' => 'par_footer_info',
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

        DB::table('par_footer_info')->where('id', $id)->delete();

        return response()->json(['message' => 'Footer info deleted successfully'], 200);
    }
}
