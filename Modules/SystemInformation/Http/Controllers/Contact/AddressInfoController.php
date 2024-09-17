<?php

namespace Modules\SystemInformation\Http\Controllers\Contact;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class AddressInfoController extends Controller
{
    public function index()
    {
        $addressInfo = DB::table('par_address_info')->get();
        return response()->json($addressInfo);
    }

    public function show($id)
    {
        $addressInfo = DB::table('par_address_info')->find($id);

        if (!$addressInfo) {
            return response()->json(['message' => 'Address info not found'], 404);
        }

        return response()->json($addressInfo);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address_icon_id' => 'nullable|exists:par_icons,id',
            'street_address_name' => 'nullable|max:2000|unique:par_address_info,street_address_name',
            'city' => 'nullable|max:100',
            'country' => 'nullable|max:255',
            'created_by' => 'required|max:50',
            'created_at' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $addressInfoId = DB::table('par_address_info')->insertGetId([
            'address_icon_id' => $request->input('address_icon_id'),
            'street_address_name' => $request->input('street_address_name'),
            'city' => $request->input('city'),
            'country' => $request->input('country'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_address_info',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($addressInfoId),
            'user_id' => $addressInfoId,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Address info created successfully',
            'data' => $addressInfoId
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $addressInfo = DB::table('par_address_info')->find($id);

        if (!$addressInfo) {
            return response()->json(['message' => 'Address info not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'address_icon_id' => 'nullable|exists:par_icons,id',
            'street_address_name' => 'nullable|max:2000|unique:par_address_info,street_address_name,' . $id,
            'city' => 'nullable|max:100',
            'country' => 'nullable|max:255',
            'updated_by' => 'nullable|max:50',
            'updated_at' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$addressInfo;

        DB::table('par_address_info')->where('id', $id)->update([
            'address_icon_id' => $request->input('address_icon_id'),
            'street_address_name' => $request->input('street_address_name'),
            'city' => $request->input('city'),
            'country' => $request->input('country'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedAddressInfo = DB::table('par_address_info')->find($id);

        $auditTrailData = [
            'table_name' => 'par_address_info',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedAddressInfo),
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
            'message' => 'Address info updated successfully',
            'data' => $updatedAddressInfo
        ], 200);
    }

    public function destroy($id)
    {
        $addressInfo = DB::table('par_address_info')->find($id);

        if (!$addressInfo) {
            return response()->json(['message' => 'Address info not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$addressInfo;

        $auditTrailData = [
            'table_name' => 'par_address_info',
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

        DB::table('par_address_info')->where('id', $id)->delete();

        return response()->json(['message' => 'Address info deleted successfully'], 200);
    }
}
