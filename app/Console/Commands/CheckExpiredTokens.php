<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Modules\SystemAuthentication\Mail\TokenExpiredNotification;


class CheckExpiredTokens extends Command
{
    protected $signature = 'check:expired-tokens';
    protected $description = 'Check for expired email verification tokens';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        Log::info('Scheduler running to check for expired tokens');
        $expiredVerifications = DB::table('email_verifications')
            ->whereNull('verified_at')
            ->where('expires_at', '<', now())
            ->get();

        Log::info('Expired Verifications:', ['count' => $expiredVerifications->count()]);

        foreach ($expiredVerifications as $verification) {
            Log::info('Processing verification ID:', ['id' => $verification->id]);
            $student = DB::table('students')->where('id', $verification->student_id)->first();

            if ($student) {
                Log::info('Student found:', ['id' => $student->id, 'email' => $student->email]);
                $resendUrl = route('student.verification.resendGet', ['id' => $student->id]);

                // Send notification email
                Mail::to($student->email)->send(new TokenExpiredNotification($resendUrl));

                // Logging for debugging
                Log::info("Notification email sent to student ID: {$student->id}, Email: {$student->email}");
            } else {
                Log::warning('Student not found for verification ID:', ['id' => $verification->id]);
            }
        }
    }
}


//  FOR SECONDS
// class CheckExpiredTokens extends Command
// {
//     protected $signature = 'check:expired-tokens';
//     protected $description = 'Check for expired email verification tokens';

//     public function __construct()
//     {
//         parent::__construct();
//     }

//     public function handle()
//     {
//         while (true) {
//             Log::info('Scheduler running to check for expired tokens');
//             $expiredVerifications = DB::table('email_verifications')
//                 ->whereNull('verified_at')
//                 ->where('expires_at', '<', now())
//                 ->where('notified', false)
//                 ->get();

//             Log::info('Expired Verifications:', ['count' => $expiredVerifications->count()]);

//             foreach ($expiredVerifications as $verification) {
//                 Log::info('Processing verification ID:', ['id' => $verification->id]);
//                 $student = DB::table('students')->where('id', $verification->student_id)->first();

//                 if ($student) {
//                     Log::info('Student found:', ['id' => $student->id, 'email' => $student->email]);
//                     $resendUrl = route('student.verification.resendGet', ['id' => $student->id]);

//                     // Send notification email
//                     Mail::to($student->email)->send(new TokenExpiredNotification($resendUrl));

//                     // Mark this verification as notified
//                     DB::table('email_verifications')->where('id', $verification->id)->update(['notified' => true]);

//                     // Logging for debugging
//                     Log::info("Notification email sent to student ID: {$student->id}, Email: {$student->email}");
//                 } else {
//                     Log::warning('Student not found for verification ID:', ['id' => $verification->id]);
//                 }
//             }

//             sleep(1); // Sleep for 1 second
//         }
//     }
// }
