<?php

namespace Modules\SystemInformation\Http\Controllers\Home;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;

class BuffaloSimpleLearningStepsController extends Controller
{
    // RETURN ALL RECORDS
    public function index()
    {
        $learningSteps = DB::table('par_learning_steps')->get();
        return response()->json($learningSteps);
    }
  
    // RETURN THE LATEST RECORD FOR IMAGE
    public function indexImage()
    {
        $latestLearningStep = DB::table('par_learning_steps')
            ->orderBy('updated_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->first(); // Fetches the latest record based on updated_at and created_at

        return response()->json($latestLearningStep);
    }

    // RETURN THE FIRST THREE LATEST
    // RETURN THE FIRST THREE LATEST
    public function indexSteps()
    {
        $latestLearningSteps = DB::table('par_learning_steps')
            ->orderBy('updated_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->take(3) // Limit to 3 latest records
            ->get();

            if ($latestLearningSteps->isEmpty()) {
                return response()->json(['message' => 'Learning step not found'], 404);
            }

        return response()->json($latestLearningSteps);
    }



    public function show($id)
    {
        $learningStep = DB::table('par_learning_steps')->find($id);

        if (!$learningStep) {
            return response()->json(['message' => 'Learning step not found'], 404);
        }

        return response()->json($learningStep);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'step_number' => 'nullable|max:220',
            'title' => 'required|unique:par_learning_steps|max:220',
            'description' => 'nullable|max:2000',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'created_by' => 'required|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Get the image file from the request
        $image = $request->file('image');

        if ($image) {
            // Define the folder path where the image will be stored dynamically
            $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/home/learningsteps');

            // Generate a unique file name for the image
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();

            // Store the image in the specified folder with the unique file name
            $image->move($folderPath, $imageName);

            $learningStepId = DB::table('par_learning_steps')->insertGetId([
                'step_number' => $request->input('step_number'),
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'image' => 'assets/uploads/home/learningsteps/' . $imageName,
                'created_by' => $request->input('created_by'),
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_learning_steps',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($learningStepId),
                'user_id' => $learningStepId,
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                null,
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );
        }

        return response()->json([
            'message' => 'Learning step created successfully',
            'data' => $learningStepId
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $learningStep = DB::table('par_learning_steps')->find($id);

        if (!$learningStep) {
            return response()->json(['message' => 'Learning step not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'step_number' => 'nullable|max:220',
            'title' => 'required|unique:par_learning_steps,title,' . $id . '|max:220',
            'description' => 'nullable|max:2000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'updated_by' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Get the image file from the request
        $image = $request->file('image');
        $imageName = $blog->image; // Keep the existing image path

        if ($image) {
            // Define the folder path where the image will be stored dynamically
            $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/blogs-posts');

            // Generate a unique file name for the image
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();

            // Store the image in the specified folder with the unique file name
            $image->move($folderPath, $imageName);

            // Update the image path to be stored in the database
            $imageName = 'assets/uploads/blogs-posts/' . $imageName;
        }

        $previousData = (array)$learningStep;

        DB::table('par_learning_steps')->where('id', $id)->update([
            'step_number' => $request->input('step_number'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'image' => $imageName,
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedLearningStep = DB::table('par_learning_steps')->find($id);

        $auditTrailData = [
            'table_name' => 'par_learning_steps',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedLearningStep),
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
            'message' => 'Learning step updated successfully',
            'data' => $updatedLearningStep
        ], 200);
    }

    public function destroy($id)
    {
        $learningStep = DB::table('par_learning_steps')->find($id);

        if (!$learningStep) {
            return response()->json(['message' => 'Learning step not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$learningStep;

        $auditTrailData = [
            'table_name' => 'par_learning_steps',
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

        DB::table('par_learning_steps')->where('id', $id)->delete();

        return response()->json(['message' => 'Learning step deleted successfully'], 200);
    }
}
