<?php

namespace Modules\SystemInformation\Http\Controllers\Contact;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class ContactInfoController extends Controller
{
    public function index()
    {
        $contactInfo = DB::table('par_contact_info')->get();
        return response()->json($contactInfo);
    }

    public function show($id)
    {
        $contactInfo = DB::table('par_contact_info')->find($id);

        if (!$contactInfo) {
            return response()->json(['message' => 'Contact info not found'], 404);
        }

        return response()->json($contactInfo);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'company_phone_number' => 'required|unique:par_contact_info|max:50',
            'phone_icon_id' => 'required|exists:par_icons,id',
            'created_by' => 'required|max:50',
            'created_at' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $contactInfoId = DB::table('par_contact_info')->insertGetId([
            'company_phone_number' => $request->input('company_phone_number'),
            'phone_icon_id' => $request->input('phone_icon_id'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_contact_info',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($contactInfoId),
            'user_id' => $contactInfoId,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Contact info created successfully',
            'data' => $contactInfoId
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $contactInfo = DB::table('par_contact_info')->find($id);

        if (!$contactInfo) {
            return response()->json(['message' => 'Contact info not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'company_phone_number' => 'required|max:255|unique:par_contact_info,company_phone_number,' . $id,
            'phone_icon_id' => 'required|exists:par_icons,id',
            'updated_by' => 'nullable|max:50',
            'updated_at' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$contactInfo;

        DB::table('par_contact_info')->where('id', $id)->update([
            'company_phone_number' => $request->input('company_phone_number'),
            'phone_icon_id' => $request->input('phone_icon_id'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedContactInfo = DB::table('par_contact_info')->find($id);

        $auditTrailData = [
            'table_name' => 'par_contact_info',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedContactInfo),
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
            'message' => 'Contact info updated successfully',
            'data' => $updatedContactInfo
        ], 200);
    }

    public function destroy($id)
    {
        $contactInfo = DB::table('par_contact_info')->find($id);

        if (!$contactInfo) {
            return response()->json(['message' => 'Contact info not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$contactInfo;

        $auditTrailData = [
            'table_name' => 'par_contact_info',
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

        DB::table('par_contact_info')->where('id', $id)->delete();

        return response()->json(['message' => 'Contact info deleted successfully'], 200);
    }
}
