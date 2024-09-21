<?php

namespace Modules\SystemInformation\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

use Carbon\Carbon;

class IconsInfoController extends Controller
{
    public function index()
    {
        $iconsInfos = DB::table('par_icons')->latest()->get();
        // Add duration field 
        $iconsInfos = $iconsInfos->map(function ($iconsInfo) {
            $createdDate = Carbon::parse($iconsInfo->created_at);
            $iconsInfo->duration = $createdDate->diffForHumans();
            return $iconsInfo;
        });

        return response()->json([
            'success' => true,
            'data' => $iconsInfos
        ]);
    }

    public function show($id)
    {
        $iconInfo = DB::table('par_icons')->find($id);

        if (!$iconInfo) {
            return response()->json(['message' => 'Icon not found'], 404);
        }

        return response()->json($iconInfo);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:par_icons|max:255',
            'description' => 'nullable|max:255',
            'code' => 'nullable|max:150',
            'is_enabled' => 'nullable|max:150',
            'icon' => 'nullable|max:150',
            'created_by' => 'required|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $iconInfoId = DB::table('par_icons')->insertGetId([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'code' => $request->input('code'),
            'is_enabled' => $request->input('is_enabled'),
            'icon' => $request->input('icon'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_icons',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($iconInfoId),
            'user_id' => $iconInfoId,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Icon created successfully',
            'data' => $iconInfoId
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $iconInfo = DB::table('par_icons')->find($id);

        if (!$iconInfo) {
            return response()->json(['message' => 'Icon not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:par_icons,name,' . $id . '|max:255',
            'description' => 'nullable|max:255',
            'code' => 'nullable|max:150',
            'is_enabled' => 'nullable|max:150',
            'icon' => 'nullable|max:150',
            'updated_by' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$iconInfo;

        DB::table('par_icons')->where('id', $id)->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'code' => $request->input('code'),
            'is_enabled' => $request->input('is_enabled'),
            'icon' => $request->input('icon'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedIconInfo = DB::table('par_icons')->find($id);

        $auditTrailData = [
            'table_name' => 'par_icons',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedIconInfo),
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
            'message' => 'Icon updated successfully',
            'data' => $updatedIconInfo
        ], 200);
    }

    public function destroy($id)
    {
        $iconInfo = DB::table('par_icons')->find($id);

        if (!$iconInfo) {
            return response()->json(['message' => 'Icon not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$iconInfo;

        $auditTrailData = [
            'table_name' => 'par_icons',
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

        DB::table('par_icons')->where('id', $id)->delete();

        return response()->json(['message' => 'Icon deleted successfully'], 200);
    }
}
