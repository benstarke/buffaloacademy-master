<?php

namespace Modules\SystemInformation\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

use Carbon\Carbon;

class PartnersInfoController extends Controller
{
    public function index()
    {
        $partnersInfos = DB::table('par_partners_info')->latest()->get();
        // Add duration field 
        $partnersInfos = $partnersInfos->map(function ($partnersInfo) {
            $createdDate = Carbon::parse($partnersInfo->created_at);
            $partnersInfo->duration = $createdDate->diffForHumans();
            return $partnersInfo;
        });

        return response()->json([
            'success' => true,
            'data' => $partnersInfos
        ]);
    }

    public function show($id)
    {
        $partnerInfo = DB::table('par_partners_info')->find($id);

        if (!$partnerInfo) {
            return response()->json(['message' => 'Partner not found'], 404);
        }

        return response()->json($partnerInfo);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:par_partners_info|max:255',
            'description' => 'nullable|max:255',
            'partner_logo_path' => 'nullable|max:500',
            'created_by' => 'required|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $partnerInfoId = DB::table('par_partners_info')->insertGetId([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'partner_logo_path' => $request->input('partner_logo_path'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_partners_info',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($partnerInfoId),
            'user_id' => $partnerInfoId,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Partner created successfully',
            'data' => $partnerInfoId
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $partnerInfo = DB::table('par_partners_info')->find($id);

        if (!$partnerInfo) {
            return response()->json(['message' => 'Partner not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:par_partners_info,name,' . $id . '|max:255',
            'description' => 'nullable|max:255',
            'partner_logo_path' => 'nullable|max:500',
            'updated_by' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$partnerInfo;

        DB::table('par_partners_info')->where('id', $id)->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'partner_logo_path' => $request->input('partner_logo_path'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedPartnerInfo = DB::table('par_partners_info')->find($id);

        $auditTrailData = [
            'table_name' => 'par_partners_info',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedPartnerInfo),
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
            'message' => 'Partner updated successfully',
            'data' => $updatedPartnerInfo
        ], 200);
    }

    public function destroy($id)
    {
        $partnerInfo = DB::table('par_partners_info')->find($id);

        if (!$partnerInfo) {
            return response()->json(['message' => 'Partner not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$partnerInfo;

        $auditTrailData = [
            'table_name' => 'par_partners_info',
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

        DB::table('par_partners_info')->where('id', $id)->delete();

        return response()->json(['message' => 'Partner deleted successfully'], 200);
    }
}
