<?php

namespace Modules\SystemAuthentication\Http\Controllers\Instructors;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Validation\ValidationException;

use Illuminate\Support\Facades\Mail;
use Modules\SystemAuthentication\Mail\Instructor\VerifyEmail;
use Modules\SystemAuthentication\Mail\Instructor\TokenExpiredNotification;
use Modules\SystemAuthentication\Mail\Instructor\EmailVerifiedConfirmation;
use Modules\SystemAuthentication\Mail\Instructor\InvalidTokenNotification;
use Modules\SystemAuthentication\Mail\Instructor\VerificationErrorConfirmation;
use Modules\SystemAuthentication\Mail\Instructor\PasswordResetSendLink;
use Modules\SystemAuthentication\Mail\Instructor\PasswordResetFailed;
use Modules\SystemAuthentication\Mail\Instructor\PasswordResetSuccessful;  

// jwt token aunthentication
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\Claims\Factory as ClaimFactory;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Auth\JWTUser;

// password reset via email
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Carbon\Carbon;


class AuthsController extends Controller
{

    // •	JWT Authentication:
    public function signUpStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => ['required', 'string', 'email:rfc,dns,spoof', 'max:255', 'unique:par_instructors,email'],
            'password' => 'required|confirmed',
        ]);

        $validator->after(function ($validator) use ($request) {
            if ($request->password === $request->email) {
                $validator->errors()->add('password', 'The password cannot be the same as the email.');
            }
        });

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            DB::beginTransaction();

            $instructorId = DB::table('par_instructors')->insertGetId([
                'name_en' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'email_verified' => false,
            ]);

            Log::info('Instructor ID after insertion: ' . $instructorId);

            if (is_null($instructorId)) {
                throw new Exception('Instructor ID is null after insertion');
            }

            // Generate a JWT token for email verification
            $user = new JWTUser($instructorId);
            $verificationToken = JWTAuth::fromUser($user);

            // Set the token expiration time (2 minutes)
            // $expiresAt = now()->addSeconds(10)(1);

            // Store the token in the par_instructor_email_verifications table
            DB::table('par_instructor_email_verifications')->insert([
                'instructor_id' => $instructorId,
                'token' => $verificationToken,
                // 'expires_at' => $expiresAt,
                'expires_at' => now()->addMinutes(60),
                // 'expires_at' => now()->addSeconds(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Generate the email verification URL
            $verificationUrl = URL::temporarySignedRoute(
                'instructor-registration-email-verification.verification.verify', 
                now()->addMinutes(60), 
                ['id' => $instructorId, 'hash' => $verificationToken]
            );
            Log::info('Verification URL: ' . $verificationUrl);

            if (is_null($verificationUrl)) {
                throw new Exception('Verification URL is null');
            }

            Mail::to($request->email)->send(new VerifyEmail($verificationUrl));

            DB::commit();

            return response()->json(['message' => 'Successfully Registered. Please verify your email.'], 201);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error during registration: ' . $e->getMessage());
            return response()->json(['message' => 'Please Try Again', 'error' => $e->getMessage()], 500);
        }
    }
   

    public function signInCheck(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            // Check in instructors table
            $user = DB::table('par_instructors')->where('email', $request->email)->first();

            // If not found in instructors table, check in users table
            if (!$user) {
                $user = DB::table('par_users')->where('email', $request->email)->first();
            }

            // If not found in users table, check in students table
            if (!$user) {
                $user = DB::table('par_students')->where('email', $request->email)->first();

                // If found in students table and has role_id = 4, block the login
                if ($user && $user->role_id == 4) {
                    return response()->json(['message' => 'Please use the student login page.'], 403);
                }
            }

            // If user is found and role_id is not 4
            if ($user && $user->role_id != 4) {
                // Validate email verification status
                if (!$this->hasVerifiedEmail($user->id)) {
                    $this->resendVerificationEmailGet($user->id);
                    return response()->json(['message' => 'We\'ve noticed you didn\'t verify your email address. A new email verification has been sent to your email, check and verify.'], 403);
                }

                // Validate active status
                if ($user->status != 1) {
                    return response()->json(['message' => 'You are not an active user! Please contact the Authority'], 403);
                }

                // Validate password
                if (Hash::check($request->password, $user->password)) {
                    $tokenTable = $user->role_id == 3 ? 'par_instructor_tokens' : 'par_user_tokens';
                    $userIdColumn = $user->role_id == 3 ? 'instructor_id' : 'user_id';
                    $jwtUser = new JWTUser($user->id);
                    $token = JWTAuth::fromUser($jwtUser);
                    $expiresIn = 3600; // Token expiration time in seconds (1 hour)

                    // Delete old tokens for the user
                    DB::table($tokenTable)->where($userIdColumn, $user->id)->delete();

                    // Insert the new token
                    DB::table($tokenTable)->insert([
                        $userIdColumn => $user->id,
                        'token' => hash('sha256', $token),
                        'created_at' => now(),
                        'updated_at' => now(),
                        'expires_at' => now()->addSeconds($expiresIn),
                    ]);

                    // Prepare the response data
                    $response = [
                        'message' => 'Successfully Logged In',
                        'authorization' => [
                            'token' => $token,
                            'type' => 'bearer',
                            'expires_in' => $expiresIn,
                            'email' => $user->email,
                            'role_id' => $user->role_id,
                        ],
                    ];

                    // Include either user_id or instructor_id depending on the role
                    if ($user->role_id == 3) {
                        $response['authorization']['instructor_id'] = $user->id;
                    } else {
                        $response['authorization']['user_id'] = $user->id;
                    }

                    return response()->json($response, 200);
                } else {
                    return response()->json(['message' => 'Email or Password is wrong!'], 401);
                }

            }

            // If no valid user found or role_id is 4, return error
            return response()->json(['message' => 'Email or Password is wrong!'], 401);

        } catch (Exception $e) {
            return response()->json(['message' => 'Please Try Again', 'error' => $e->getMessage()], 500);
        }
    }



    public function verifyEmail(Request $request, $id, $hash)
    {
        Log::info('Starting email verification process for instructor ID: ' . $id . ' with token: ' . $hash);
    
        try {
            $verification = DB::table('par_instructor_email_verifications')
                ->where('instructor_id', $id)
                ->where('token', $hash)
                ->first();
    
            if (!$verification) {
                Log::warning('Invalid verification token for instructor ID: ' . $id);
                // Send email notification about invalid token
                $instructor = DB::table('par_instructors')->where('id', $id)->first();
                Mail::to($instructor->email)->send(new InvalidTokenNotification());

                return response()->json(['message' => 'Invalid verification token'], 400);
            }
    
            Log::info('Verification record found: ', (array) $verification);
    
            // Check if the token is expired
            if (now()->greaterThan($verification->expires_at)) {
                Log::warning('Verification token has expired for instructor ID: ' . $id);
    
                // Send email notification about expired token
                $instructor = DB::table('par_instructors')->where('id', $id)->first();
                $resendUrl = route('instructor.verification.resendGet', ['id' => $id]);
                Mail::to($instructor->email)->send(new TokenExpiredNotification($resendUrl));
    
                return response()->json(['message' => 'Verification token has expired. A new email has been sent to your email address with a link to resend the verification email.'], 400);
            }
    
            // Mark email as verified
            DB::table('par_instructors')->where('id', $id)->update(['email_verified' => true]);

            // Update notified column to true
            DB::table('par_instructor_email_verifications')->where('instructor_id', $id)->update(['notified' => true]);

            // Send confirmation email
            $instructor = DB::table('par_instructors')->where('id', $id)->first();
            Mail::to($instructor->email)->send(new EmailVerifiedConfirmation($instructor));
    
            // Delete verification token
            // DB::table('email_verifications')->where('instructor_id', $id)->delete();
    
            Log::info('Email verified successfully for instructor ID: ' . $id);
            return response()->json(['message' => 'Email verified successfully']);
        } catch (Exception $e) {
            Log::error('Error verifying email for instructor ID: ' . $id . '. Error: ' . $e->getMessage());
            // Send email notification about the error
            $instructor = DB::table('par_instructors')->where('id', $id)->first();
            Mail::to($instructor->email)->send(new VerificationErrorNotification($e->getMessage()));

            return response()->json(['message' => 'Error verifying email', 'error' => $e->getMessage()], 500);
        }
    }


    public function resendVerificationEmailGet($id)
    {
        $instructor = DB::table('par_instructors')->where('id', $id)->first();

        if (!$instructor) {
            return response()->json(['message' => 'Instructor not found'], 404);
        }

        if ($this->hasVerifiedEmail($instructor->id)) {
            return response()->json(['message' => 'Email already verified'], 400);
        }

        // Generate a new JWT token for email verification
        $user = new JWTUser($instructor->id);
        $verificationToken = JWTAuth::fromUser($user);

        // Set the token expiration time (e.g., 2 minutes)
        $expiresAt = now()->addMinutes(60);

        // Store the token in the email_verifications table
        DB::table('par_instructor_email_verifications')->updateOrInsert(
            ['instructor_id' => $instructor->id],
            ['token' => $verificationToken, 'expires_at' => $expiresAt, 'created_at' => now(), 'updated_at' => now()]
        );

        // Generate the email verification URL
        $verificationUrl = URL::temporarySignedRoute(
            'instructor-registration-email-verification.verification.verify',
            $expiresAt,
            ['id' => $instructor->id, 'hash' => $verificationToken]
        );

        // Send the verification email
        Mail::to($instructor->email)->send(new VerifyEmail($verificationUrl));

        return response()->json(['status' => 'Verification email resent']);
    }


    protected function hasVerifiedEmail($instructor_id)
    {
        $instructor = DB::table('par_instructors')->where('id', $instructor_id)->first();

        return $instructor && $instructor->email_verified;
    }


    // Method to handle sending password reset link
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $email = $request->input('email');

        // Check if the email exists in the par_instructors table
        $instructor = DB::table('par_instructors')->where('email', $email)->first();

        if (!$instructor) {
            Log::warning('Unable to send password reset link to email: ' . $email . '. Reason: Email not found.');
            // Mail::to($email)->send(new PasswordResetSendLinkFailed($email, 'Email address not found.'));
            return response()->json(['message' => 'Email address not found.'], 404);
        }

        // Generate a reset token
        $token = Str::random(60);

        // Store the token in the password_resets table
        DB::table('par_instructor_password_resets')->updateOrInsert(
            ['instructor_id' => $instructor->id],
            [
                'instructor_id' => $instructor->id,
                'token' => Hash::make($token),
                'created_at' => Carbon::now()
            ]
        );

        // Send the email with the reset token
        // $resetUrl = url('/reset-password?token=' . $token . '&instructor_id=' . $instructor->id);
        // Mail::send('emails.par_instructors_emails.password_reset', ['url' => $resetUrl], function ($message) use ($email) {
        //     $message->to($email)->subject('Password Reset Request');
        // });

        // Send the email with the reset token
        $resetUrl = url('http://localhost:4200/admin-buffalo/authentication-sub-system/reset-password?token=' . $token . '&instructor_id=' . $instructor->id);
        Mail::to($email)->send(new PasswordResetSendLink($resetUrl));

        Log::info('Password reset link sent to email: ' . $email);
        return response()->json(['message' => 'Password reset link sent!'], 200);
    }

    // Method to handle password reset
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'instructor_id' => 'required|integer',
            'password' => 'required|confirmed|min:8',
        ]);

        $instructor_id = $request->input('instructor_id');
        $password = $request->input('password');
        $token = $request->input('token');

        // Check if the token is valid  
        $reset = DB::table('par_instructor_password_resets')->where('instructor_id', $instructor_id)->first();

        if (!$reset || !Hash::check($token, $reset->token)) {
            $reason = 'Invalid or expired password reset token';
            Log::warning('Invalid or expired password reset token for instructor ID: ' . $instructor_id);
            Mail::to($instructor_id)->send(new PasswordResetFailed($instructor_id,  $reason));
            return response()->json(['message' => 'Invalid or expired password reset token.'], 400);
        }

        // Update the instructor's password
        DB::table('par_instructors')->where('id', $instructor_id)->update([
            'password' => Hash::make($password)
        ]);

        // Send confirmation email
        $instructor = DB::table('par_instructors')->where('id', $instructor_id)->first();
        Mail::to($instructor->email)->send(new PasswordResetSuccessful($instructor));

        // Delete the password reset token
        // DB::table('password_resets')->where('instructor_id', $instructor_id)->delete();

        Log::info('Password has been reset for instructor ID: ' . $instructor_id);
        return response()->json(['message' => 'Password has been reset!'], 200);
    }


    // public function checkEmail(Request $request)
    // {
    //     $email = $request->input('email');
    //     $exists = DB::table('par_instructors')->where('email', $email)->exists();
    //     return response()->json(['exists' => $exists]);
    // }
    public function checkEmailInInstructors(Request $request)
    {
        $email = $request->input('email');
        $exists = DB::table('par_instructors')->where('email', $email)->exists();
        return response()->json(['exists' => $exists]);
    }

    public function signOut(Request $request)
    {
        try {
            $token = JWTAuth::parseToken()->getToken();
            JWTAuth::invalidate($token);
            return response()->json(['message' => 'Successfully Logged Out'], 200);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Failed to log out, please try again.'], 500);
        }
    }
}
