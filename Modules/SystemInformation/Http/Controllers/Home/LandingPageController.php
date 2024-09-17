<?php

namespace Modules\SystemInformation\Http\Controllers\Home;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class LandingPageController extends Controller
{
    public function index()
    {
        $landingPages = DB::table('par_landing_page')->get();
        return response()->json($landingPages);
    }

    public function show($id)
    {
        $landingPage = DB::table('par_landing_page')->find($id);

        if (!$landingPage) {
            return response()->json(['message' => 'Landing page not found'], 404);
        }

        return response()->json($landingPage);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:par_landing_page|max:220',
            'description' => 'nullable|max:2000',
            'image' => 'nullable|max:200',
            'created_by' => 'required|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $landingPageId = DB::table('par_landing_page')->insertGetId([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'image' => $request->input('image'),
            'created_by' => $request->input('created_by'),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_landing_page',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($landingPageId),
            'user_id' => $landingPageId,
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Landing page created successfully',
            'data' => $landingPageId
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $landingPage = DB::table('par_landing_page')->find($id);

        if (!$landingPage) {
            return response()->json(['message' => 'Landing page not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:par_landing_page,title,' . $id . '|max:220',
            'description' => 'nullable|max:2000',
            'image' => 'nullable|max:200',
            'updated_by' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$landingPage;

        DB::table('par_landing_page')->where('id', $id)->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'image' => $request->input('image'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedLandingPage = DB::table('par_landing_page')->find($id);

        $auditTrailData = [
            'table_name' => 'par_landing_page',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedLandingPage),
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
            'message' => 'Landing page updated successfully',
            'data' => $updatedLandingPage
        ], 200);
    }

    public function destroy($id)
    {
        $landingPage = DB::table('par_landing_page')->find($id);

        if (!$landingPage) {
            return response()->json(['message' => 'Landing page not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$landingPage;

        $auditTrailData = [
            'table_name' => 'par_landing_page',
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

        DB::table('par_landing_page')->where('id', $id)->delete();

        return response()->json(['message' => 'Landing page deleted successfully'], 200);
    }
}
