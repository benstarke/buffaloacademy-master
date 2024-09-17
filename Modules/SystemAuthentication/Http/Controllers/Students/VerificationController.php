<?php  

namespace Modules\SystemAuthentication\Http\Controllers\Students;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class VerificationController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function verify(Request $request, $id, $hash)
    {
        // Validate the signed URL
        if (! $request->hasValidSignature()) {
            return response()->json(['message' => 'Invalid or expired verification link.'], 403);
        }

        // Find the verification record by student ID and token
        $verification = DB::table('par_email_verifications')
            ->where('student_id', $id)
            ->where('token', $hash)
            ->first();

        if (! $verification) {
            return response()->json(['message' => 'Invalid verification details.'], 403);
        }

        // Mark email as verified in the students table
        DB::table('par_students')->where('id', $id)->update(['email_verified' => true]);

        // Update the verification record to mark it as verified
        DB::table('par_email_verifications')->where('id', $verification->id)->update(['verified_at' => Carbon::now()]);

        Log::info('Email verified for student ID: ' . $id);

        return response()->json(['message' => 'Email successfully verified.'], 200);
    }
}
