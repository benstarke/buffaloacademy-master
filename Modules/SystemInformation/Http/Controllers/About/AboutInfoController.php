<?php

namespace Modules\SystemInformation\Http\Controllers\About;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class AboutInfoController extends Controller
{
    public function index()
    {
        $aboutInfo = DB::table('par_about_info')->get();
        return response()->json($aboutInfo);
    }

    public function show($id)
    {
        $aboutInfo = DB::table('par_about_info')->find($id);

        if (!$aboutInfo) {
            return response()->json(['message' => 'About info not found'], 404);
        }

        return response()->json($aboutInfo);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'about_image_path' => 'nullable|max:500',
            'title' => 'required|unique:par_about_info|max:255',
            'description' => 'nullable|max:500',
            'who_we_are' => 'nullable|max:1000',
            'our_mission' => 'nullable|max:1000',
            'created_by' => 'required|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $aboutInfoId = DB::table('par_about_info')->insertGetId([
            'about_image_path' => $request->input('about_image_path'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'who_we_are' => $request->input('who_we_are'),
            'our_mission' => $request->input('our_mission'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_about_info',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($aboutInfoId),
            'user_id' => $aboutInfoId,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'About info created successfully',
            'data' => $aboutInfoId
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $aboutInfo = DB::table('par_about_info')->find($id);

        if (!$aboutInfo) {
            return response()->json(['message' => 'About info not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'about_image_path' => 'nullable|max:500',
            'title' => 'required|unique:par_about_info,title,' . $id . '|max:255',
            'description' => 'nullable|max:500',
            'who_we_are' => 'nullable|max:1000',
            'our_mission' => 'nullable|max:1000',
            'updated_by' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$aboutInfo;

        DB::table('par_about_info')->where('id', $id)->update([
            'about_image_path' => $request->input('about_image_path'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'who_we_are' => $request->input('who_we_are'),
            'our_mission' => $request->input('our_mission'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedAboutInfo = DB::table('par_about_info')->find($id);

        $auditTrailData = [
            'table_name' => 'par_about_info',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedAboutInfo),
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
            'message' => 'About info updated successfully',
            'data' => $updatedAboutInfo
        ], 200);
    }

    public function destroy($id)
    {
        $aboutInfo = DB::table('par_about_info')->find($id);

        if (!$aboutInfo) {
            return response()->json(['message' => 'About info not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$aboutInfo;

        $auditTrailData = [
            'table_name' => 'par_about_info',
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

        DB::table('par_about_info')->where('id', $id)->delete();

        return response()->json(['message' => 'About info deleted successfully'], 200);
    }
}
