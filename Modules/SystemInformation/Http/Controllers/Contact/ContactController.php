<?php

namespace Modules\SystemInformation\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper; // audit_trail

// email
use Illuminate\Support\Facades\Mail;
use Modules\SystemInformation\Mail\ContactNotification; 

class ContactController extends Controller
{
    public function index()
    {
        $contacts = DB::table('par_contact')->get();
        return response()->json($contacts);
    }

    public function show($id)
    {
        $contact = DB::table('par_contact')->find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        return response()->json($contact);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:par_contact|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|max:150',
            'message' => 'nullable|max:150',
            'created_by' => 'nullable|max:50',
            'created_at' => 'nullable|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Begin a transaction
        DB::beginTransaction();

        try {
            // Insert the record into the database
            $contactId = DB::table('par_contact')->insertGetId([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'subject' => $request->input('subject'),
                'message' => $request->input('message'),
                'created_by' => $request->input('created_by'),
                'created_at' => now(),
            ]);

            // Audit trail logic for creation
            $auditTrailData = [
                'table_name' => 'par_contact',
                'table_action' => 'insert',
                'current_tabledata' => json_encode($contactId),
                'user_id' => $contactId,
            ];

            DbHelper::auditTrail(
                $auditTrailData['table_name'],
                $auditTrailData['table_action'],
                null,
                $auditTrailData['current_tabledata'],
                $auditTrailData['user_id']
            );

            // Send email notification
            Mail::to($request->input('email'))->send(new ContactNotification($request->input('email')));

            // If everything is successful, commit the transaction
            DB::commit();

            return response()->json([
                'message' => 'Contact created and email sent successfully',
                'data' => $contactId
            ], 201);

        } catch (\Exception $e) {
            // If any exception occurs, rollback the transaction
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create contact or send email',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function update(Request $request, $id)
    {
        $contact = DB::table('par_contact')->find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255|unique:par_contact,name,' . $id,
            'email' => 'nullable|email|max:255',
            'subject' => 'nullable|max:150',
            'message' => 'nullable|max:150',
            'updated_by' => 'nullable|max:255',
            'updated_at' => 'nullable|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$contact;

        DB::table('par_contact')->where('id', $id)->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'subject' => $request->input('subject'),
            'message' => $request->input('message'),
            'updated_by' => $request->input('updated_by'),
            'updated_at' => now(),
        ]);

        // Audit trail logic for update
        $updatedContact = DB::table('par_contact')->find($id);

        $auditTrailData = [
            'table_name' => 'par_contact',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedContact),
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
            'message' => 'Contact updated successfully',
            'data' => $updatedContact
        ], 200);
    }

    public function destroy($id)
    {
        $contact = DB::table('par_contact')->find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$contact;

        $auditTrailData = [
            'table_name' => 'par_contact',
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

        DB::table('par_contact')->where('id', $id)->delete();

        return response()->json(['message' => 'Contact deleted successfully'], 200);
    }
}
