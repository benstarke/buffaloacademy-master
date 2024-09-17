<?php

namespace Modules\SystemInformation\Http\Controllers\Home;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;
use Carbon\Carbon;

use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Exception;

class LatestEventsController extends Controller
{

    // first get the current id of the logged in user (admin/superadmin/writer) or instructor id
    private function getCurrentUserId(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            throw new \Exception('Token not provided', 401);
        }

        $payload = JWTAuth::setToken($token)->getPayload();
        return $payload['sub']; // Assuming 'sub' contains the user ID
    }


    public function indexBackend()
    {
        $events = DB::table('par_events')->get();

        // Add duration field
        $events = $events->map(function ($event) {
            $createdDate = Carbon::parse($event->created_at);
            $event->duration = $createdDate->diffForHumans();
            return $event;
        });

        return response()->json($events);
    }

    public function index()
    {
        $events = DB::table('par_events')
                    ->orderBy('created_at', 'desc')
                    ->limit(3)
                    ->get();
        return response()->json($events);
    }


    public function show($id)
    {
        $event = DB::table('par_events')->find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        return response()->json($event);
    }

    public function store(Request $request)
    {
        // Image uploads
        $imagePath = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/events');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move($folderPath, $imageName);
            $imagePath = 'assets/uploads/events/' . $imageName;
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Check if the user is an instructor
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');

            // If not found as an instructor, check if they are a regular user
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            // If email is still not found, return an error
            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            $eventId = DB::table('par_events')->insertGetId([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'image' => $imagePath,
                'topic' => $request->input('topic'),
                'goal' => $request->input('goal'),
                'location' => $request->input('location'),
                'hosted_by' => $request->input('hosted_by'),
                'event_day' => $request->input('event_day'),
                'created_by' => $userEmail,
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_events',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($eventId),
                'user_id' => $userEmail,
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                null,
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            return response()->json([
                'message' => 'Event created successfully',
                'data' => $eventId
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    public function update(Request $request, $id)
    {
        $event = DB::table('par_events')->find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $imagePath = $course->image;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $folderPath = public_path('views/dev_portal/buffalofrontend/src/assets/uploads/events');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move($folderPath, $imageName);
            $imagePath = 'assets/uploads/events/' . $imageName;
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId($request);

            // Check if the user is an instructor
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');

            // If not found as an instructor, check if they are a regular user
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            // If email is still not found, return an error
            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            $previousData = (array)$event;

            DB::table('par_events')->where('id', $id)->update([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'image' => $imagePath,
                'topic' => $request->input('topic'),
                'goal' => $request->input('goal'),
                'location' => $request->input('location'),
                'hosted_by' => $request->input('hosted_by'),
                'event_day' => $request->input('event_day'),
                'updated_by' => $userEmail,
                'updated_at' => now(),
            ]);

            $updatedEvent = DB::table('par_events')->find($id);

            // Audit trail logic for update
            $auditTrailData = [
                'table_name' => 'par_events',
                'table_action' => 'update',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => json_encode($updatedEvent),
                'user_id' => $userEmail,
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                $auditTrailData['prev_tabledata'],
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            return response()->json([
                'message' => 'Event updated successfully',
                'data' => $updatedEvent
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }


    public function destroy($id)
    {
        $event = DB::table('par_events')->find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        try {
            // Fetch the current user ID from the JWT token
            $userId = $this->getCurrentUserId(request());

            // Check if the user is an instructor
            $userEmail = DB::table('par_instructors')->where('id', $userId)->value('email');

            // If not found as an instructor, check if they are a regular user
            if (!$userEmail) {
                $userEmail = DB::table('par_users')->where('id', $userId)->value('email');
            }

            // If email is still not found, return an error
            if (!$userEmail) {
                return response()->json(['error' => 'User email not found'], 404);
            }

            $previousData = (array)$event;

            $auditTrailData = [
                'table_name' => 'par_events',
                'table_action' => 'delete',
                'prev_tabledata' => json_encode($previousData),
                'current_tabledata' => null,
                'user_id' => $userEmail,
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                $auditTrailData['prev_tabledata'],
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            DB::table('par_events')->where('id', $id)->delete();

            return response()->json(['message' => 'Event deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }

}
