<?php

namespace Modules\SystemInformation\Http\Controllers\Contact;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class EmailInfoController extends Controller
{
    public function index()
    {
        $emailInfo = DB::table('par_email_info')->get();
        return response()->json($emailInfo);
    }

    public function show($id)
    {
        $emailInfo = DB::table('par_email_info')->find($id);

        if (!$emailInfo) {
            return response()->json(['message' => 'Email info not found'], 404);
        }

        return response()->json($emailInfo);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email_icon_id' => 'required|exists:par_icons,id',
            'company_email' => 'nullable|max:255|unique:par_email_info,company_email',
            'created_by' => 'required|max:50',
            'created_at' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $emailInfoId = DB::table('par_email_info')->insertGetId([
            'email_icon_id' => $request->input('email_icon_id'),
            'company_email' => $request->input('company_email'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_email_info',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($emailInfoId),
            'user_id' => $emailInfoId,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Email info created successfully',
            'data' => $emailInfoId
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $emailInfo = DB::table('par_email_info')->find($id);

        if (!$emailInfo) {
            return response()->json(['message' => 'Email info not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'email_icon_id' => 'required|exists:par_icons,id',
            'company_email' => 'nullable|max:255|unique:par_email_info,company_email,' . $id,
            'updated_by' => 'nullable|max:50',
            'updated_at' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$emailInfo;

        DB::table('par_email_info')->where('id', $id)->update([
            'email_icon_id' => $request->input('email_icon_id'),
            'company_email' => $request->input('company_email'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedEmailInfo = DB::table('par_email_info')->find($id);

        $auditTrailData = [
            'table_name' => 'par_email_info',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedEmailInfo),
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
            'message' => 'Email info updated successfully',
            'data' => $updatedEmailInfo
        ], 200);
    }

    public function destroy($id)
    {
        $emailInfo = DB::table('par_email_info')->find($id);

        if (!$emailInfo) {
            return response()->json(['message' => 'Email info not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$emailInfo;

        $auditTrailData = [
            'table_name' => 'par_email_info',
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

        DB::table('par_email_info')->where('id', $id)->delete();

        return response()->json(['message' => 'Email info deleted successfully'], 200);
    }
}
