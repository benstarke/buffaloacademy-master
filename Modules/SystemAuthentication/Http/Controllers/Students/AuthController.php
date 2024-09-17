<?php

namespace Modules\SystemAuthentication\Http\Controllers\Students;

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
use Modules\SystemAuthentication\Mail\Student\VerifyEmail;
use Modules\SystemAuthentication\Mail\Student\TokenExpiredNotification;
use Modules\SystemAuthentication\Mail\Student\EmailVerifiedConfirmation;
use Modules\SystemAuthentication\Mail\Student\InvalidTokenNotification;
use Modules\SystemAuthentication\Mail\Student\VerificationErrorConfirmation;
use Modules\SystemAuthentication\Mail\Student\PasswordResetSendLink;
use Modules\SystemAuthentication\Mail\Student\PasswordResetFailed;
use Modules\SystemAuthentication\Mail\Student\PasswordResetSuccessful;  

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


class AuthController extends Controller
{

    // •	JWT Authentication:
    public function signUpStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => ['required', 'string', 'email:rfc,dns,spoof', 'max:255', 'unique:par_students,email'],
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

            $studentId = DB::table('par_students')->insertGetId([
                'name_en' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'email_verified' => false,
            ]);

            Log::info('Student ID after insertion: ' . $studentId);

            if (is_null($studentId)) {
                throw new Exception('Student ID is null after insertion');
            }

            // Generate a JWT token for email verification
            $user = new JWTUser($studentId);
            $verificationToken = JWTAuth::fromUser($user);

            // Set the token expiration time (2 minutes)
            // $expiresAt = now()->addSeconds(10)(1);

            // Store the token in the par_student_email_verifications table
            DB::table('par_student_email_verifications')->insert([
                'student_id' => $studentId,
                'token' => $verificationToken,
                // 'expires_at' => $expiresAt,
                'expires_at' => now()->addMinutes(60),
                // 'expires_at' => now()->addSeconds(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Generate the email verification URL
            $verificationUrl = URL::temporarySignedRoute(
                'student-registration-email-verification.verification.verify', 
                now()->addMinutes(60), 
                ['id' => $studentId, 'hash' => $verificationToken]
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

    // public function signInCheck(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required',
    //         'password' => 'required',
    //         // 'remember' => 'boolean', // remember me
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 400);
    //     }

    //     try {
    //         $student = DB::table('par_students')->where('email', $request->email)->first();

    //         if ($student) {
    //             if (!$this->hasVerifiedEmail($student->id)) {
    //                 // return response()->json(['message' => 'Please verify your email address.'], 403);
    //                 // Resend the verification email
    //                 $this->resendVerificationEmailGet($student->id);
    //             return response()->json(['message' => 'We\'ve noticed you didn\'t verify your email address. A new email verification has been sent to your email, check and verify.'], 403);
    //         }

    //             if ($student->status == 1) {
    //                 if (Hash::check($request->password, $student->password)) {
    //                     $user = new JWTUser($student->id);
    //                     $token = JWTAuth::fromUser($user);
    //                     // $remember = $request->input('remember', false); // remember me
    //                     // $expiresIn = $remember ? 30 : 10; // 30 seconds or 10 seconds
    //                     // $expiresIn = $remember ? 43200 : 3600; // 30 days or 1 hour
    //                     $expiresIn = 3600; // Token expiration time in seconds (1 hour)

    //                     // Delete old tokens for the student
    //                     DB::table('par_student_tokens')->where('student_id', $student->id)->delete(); // Remove old tokens

    //                     // Insert the new token
    //                     DB::table('par_student_tokens')->insert([
    //                         'student_id' => $student->id,
    //                         'token' => hash('sha256', $token),
    //                         'created_at' => now(),
    //                         'updated_at' => now(),
    //                         'expires_at' => now()->addMinutes($expiresIn), // Token expiration time
    //                     ]);


    //                     return response()->json([
    //                         'message' => 'Successfully Logged In',
    //                         'authorization' => [
    //                             'token' => $token,
    //                             'type' => 'bearer',
    //                             'expires_in' => $expiresIn,
    //                             'student_id' => $student->id,
    //                             'role_id' => $student->role_id,
    //                         ],
    //                     ], 200);
    //                 } else {
    //                     return response()->json(['message' => 'Email or Password is wrong!'], 401);
    //                 }
    //             } else {
    //                 return response()->json(['message' => 'You are not an active user! Please contact the Authority'], 403);
    //             }
    //         } else {
    //             return response()->json(['message' => 'Email or Password is wrong!'], 401);
    //         }
    //     } catch (Exception $e) {
    //         return response()->json(['message' => 'Please Try Again', 'error' => $e->getMessage()], 500);
    //     }
    // }

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
            // Fetch the user from students table
            $student = DB::table('par_students')->where('email', $request->email)->first();

            if ($student) {
                // Ensure the student has role_id = 4
                if ($student->role_id != 4) {
                    return response()->json(['message' => 'Please use the instructor login page.'], 403);
                }

                // Check if the email is verified
                if (!$this->hasVerifiedEmail($student->id)) {
                    $this->resendVerificationEmailGet($student->id);
                    return response()->json(['message' => 'We\'ve noticed you didn\'t verify your email address. A new email verification has been sent to your email, check and verify.'], 403);
                }

                // Check if the student is active
                if ($student->status == 1) {
                    // Validate the password
                    if (Hash::check($request->password, $student->password)) {
                        $jwtUser = new JWTUser($student->id);
                        $token = JWTAuth::fromUser($jwtUser);
                        $expiresIn = 3600; // Token expiration time in seconds (1 hour)

                        // Delete old tokens for the student
                        DB::table('par_student_tokens')->where('student_id', $student->id)->delete();

                        // Insert the new token
                        DB::table('par_student_tokens')->insert([
                            'student_id' => $student->id,
                            'token' => hash('sha256', $token),
                            'created_at' => now(),
                            'updated_at' => now(),
                            'expires_at' => now()->addSeconds($expiresIn),
                        ]);

                        return response()->json([
                            'message' => 'Successfully Logged In',
                            'authorization' => [
                                'token' => $token,
                                'type' => 'bearer',
                                'expires_in' => $expiresIn,
                                'student_id' => $student->id,
                                'role_id' => $student->role_id,
                            ],
                        ], 200);
                    } else {
                        return response()->json(['message' => 'Email or Password is wrong!'], 401);
                    }
                } else {
                    return response()->json(['message' => 'You are not an active user! Please contact the Authority'], 403);
                }
            }

            // If not found in students, check in instructors table
            $instructor = DB::table('par_instructors')->where('email', $request->email)->first();

            if ($instructor) {
                // Redirect to the instructor login page
                return response()->json(['message' => 'Please use the instructor login page.'], 403);
            }

            // If neither student nor instructor, check in users table
            $user = DB::table('par_users')->where('email', $request->email)->first();

            if ($user) {
                // Redirect to the admin login page
                return response()->json(['message' => 'Please use the admin login page.'], 403);
            }

            // If neither student, instructor, nor user, return email or password error
            return response()->json(['message' => 'Email or Password is wrong!'], 401);

        } catch (Exception $e) {
            return response()->json(['message' => 'Please Try Again', 'error' => $e->getMessage()], 500);
        }
    }





    public function verifyEmail(Request $request, $id, $hash)
    {
        Log::info('Starting email verification process for student ID: ' . $id . ' with token: ' . $hash);
    
        try {
            $verification = DB::table('par_student_email_verifications')
                ->where('student_id', $id)
                ->where('token', $hash)
                ->first();
    
            if (!$verification) {
                Log::warning('Invalid verification token for student ID: ' . $id);
                // Send email notification about invalid token
                $student = DB::table('par_students')->where('id', $id)->first();
                Mail::to($student->email)->send(new InvalidTokenNotification());

                return response()->json(['message' => 'Invalid verification token'], 400);
            }
    
            Log::info('Verification record found: ', (array) $verification);
    
            // Check if the token is expired
            if (now()->greaterThan($verification->expires_at)) {
                Log::warning('Verification token has expired for student ID: ' . $id);
    
                // Send email notification about expired token
                $student = DB::table('par_students')->where('id', $id)->first();
                $resendUrl = route('student.verification.resendGet', ['id' => $id]);
                Mail::to($student->email)->send(new TokenExpiredNotification($resendUrl));
    
                return response()->json(['message' => 'Verification token has expired. A new email has been sent to your email address with a link to resend the verification email.'], 400);
            }
    
            // Mark email as verified
            DB::table('par_students')->where('id', $id)->update(['email_verified' => true]);

            // Update notified column to true
            DB::table('par_student_email_verifications')->where('student_id', $id)->update(['notified' => true]);

            // Send confirmation email
            $student = DB::table('par_students')->where('id', $id)->first();
            Mail::to($student->email)->send(new EmailVerifiedConfirmation($student));
    
            // Delete verification token
            // DB::table('email_verifications')->where('student_id', $id)->delete();
    
            Log::info('Email verified successfully for student ID: ' . $id);
            return response()->json(['message' => 'Email verified successfully']);
        } catch (Exception $e) {
            Log::error('Error verifying email for student ID: ' . $id . '. Error: ' . $e->getMessage());
            // Send email notification about the error
            $student = DB::table('par_students')->where('id', $id)->first();
            Mail::to($student->email)->send(new VerificationErrorNotification($e->getMessage()));

            return response()->json(['message' => 'Error verifying email', 'error' => $e->getMessage()], 500);
        }
    }


    public function resendVerificationEmailGet($id)
    {
        $student = DB::table('par_students')->where('id', $id)->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        if ($this->hasVerifiedEmail($student->id)) {
            return response()->json(['message' => 'Email already verified'], 400);
        }

        // Generate a new JWT token for email verification
        $user = new JWTUser($student->id);
        $verificationToken = JWTAuth::fromUser($user);

        // Set the token expiration time (e.g., 2 minutes)
        $expiresAt = now()->addMinutes(60);

        // Store the token in the email_verifications table
        DB::table('par_student_email_verifications')->updateOrInsert(
            ['student_id' => $student->id],
            ['token' => $verificationToken, 'expires_at' => $expiresAt, 'created_at' => now(), 'updated_at' => now()]
        );

        // Generate the email verification URL
        $verificationUrl = URL::temporarySignedRoute(
            'student-registration-email-verification.verification.verify',
            $expiresAt,
            ['id' => $student->id, 'hash' => $verificationToken]
        );

        // Send the verification email
        Mail::to($student->email)->send(new VerifyEmail($verificationUrl));

        return response()->json(['status' => 'Verification email resent']);
    }

    



    protected function hasVerifiedEmail($student_id)
    {
        $student = DB::table('par_students')->where('id', $student_id)->first();

        return $student && $student->email_verified;
    }


    // Method to handle sending password reset link
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $email = $request->input('email');

        // Check if the email exists in the par_students table
        $student = DB::table('par_students')->where('email', $email)->first();

        if (!$student) {
            Log::warning('Unable to send password reset link to email: ' . $email . '. Reason: Email not found.');
            // Mail::to($email)->send(new PasswordResetSendLinkFailed($email, 'Email address not found.'));
            return response()->json(['message' => 'Email address not found.'], 404);
        }

        // Generate a reset token
        $token = Str::random(60);

        // Store the token in the password_resets table
        DB::table('par_student_password_resets')->updateOrInsert(
            ['student_id' => $student->id],
            [
                'student_id' => $student->id,
                'token' => Hash::make($token),
                'created_at' => Carbon::now()
            ]
        );

        // Send the email with the reset token
        // $resetUrl = url('/reset-password?token=' . $token . '&student_id=' . $student->id);
        // Mail::send('emails.par_students_emails.password_reset', ['url' => $resetUrl], function ($message) use ($email) {
        //     $message->to($email)->subject('Password Reset Request');
        // });

        // Send the email with the reset token
        $resetUrl = url('http://localhost:4200/app-student-auth/authentication-sub-system/reset-password?token=' . $token . '&student_id=' . $student->id);
        Mail::to($email)->send(new PasswordResetSendLink($resetUrl));

        Log::info('Password reset link sent to email: ' . $email);
        return response()->json(['message' => 'Password reset link sent!'], 200);
    }

    // Method to handle password reset
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'student_id' => 'required|integer',
            'password' => 'required|confirmed|min:8',
        ]);

        $student_id = $request->input('student_id');
        $password = $request->input('password');
        $token = $request->input('token');

        // Check if the token is valid
        $reset = DB::table('par_student_password_resets')->where('student_id', $student_id)->first();

        if (!$reset || !Hash::check($token, $reset->token)) {
            $reason = 'Invalid or expired password reset token';
            Log::warning('Invalid or expired password reset token for student ID: ' . $student_id);
            Mail::to($student_id)->send(new PasswordResetFailed($student_id,  $reason));
            return response()->json(['message' => 'Invalid or expired password reset token.'], 400);
        }

        // Update the student's password
        DB::table('par_students')->where('id', $student_id)->update([
            'password' => Hash::make($password)
        ]);

        // Send confirmation email
        $student = DB::table('par_students')->where('id', $student_id)->first();
        Mail::to($student->email)->send(new PasswordResetSuccessful($student));

        // Delete the password reset token
        // DB::table('password_resets')->where('student_id', $student_id)->delete();

        Log::info('Password has been reset for student ID: ' . $student_id);
        return response()->json(['message' => 'Password has been reset!'], 200);
    }


    // public function checkEmail(Request $request)
    // {
    //     $email = $request->input('email');
    //     $exists = DB::table('par_students')->where('email', $email)->exists();
    //     return response()->json(['exists' => $exists]);
    // }
    public function checkEmailInStudents(Request $request)
    {
        $email = $request->input('email');
        $exists = DB::table('par_students')->where('email', $email)->exists();
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





    // •	Token-Based Authentication
    // public function signUpStore(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|max:255',
    //         'email' => ['required', 'string', 'email:rfc,dns,spoof', 'max:255', 'unique:par_students,email'],
    //         'password' => 'required|confirmed',
    //     ], [
    //         'email.required' => 'The email field is required.',
    //         'email.string' => 'The email must be a valid string.',
    //         'email.email' => 'The email must be a valid email address.',
    //         'email.max' => 'The email must not be greater than 255 characters.',
    //         'email.unique' => 'The email has already been taken.',
    //     ]);

    //     $validator->after(function ($validator) use ($request) {
    //         if ($request->password === $request->email) {
    //             $validator->errors()->add('password', 'The password cannot be the same as the email.');
    //         }
    //     });

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 400);
    //     }

    //     try {
    //         DB::beginTransaction();

    //         $studentId = DB::table('par_students')->insertGetId([
    //             'name_en' => $request->name,
    //             'email' => $request->email,
    //             'password' => Hash::make($request->password),
    //             'email_verified' => false,
    //         ]);

    //         Log::info('Student ID after insertion: ' . $studentId);

    //         if (is_null($studentId)) {
    //             throw new Exception('Student ID is null after insertion');
    //         }

    //         // Generate a unique token
    //         $token = Str::random(60);

    //         // Store the token in the email_verifications table
    //         DB::table('email_verifications')->insert([
    //             'student_id' => $studentId,
    //             'token' => $token,
    //         ]);

    //         $verificationUrl = URL::temporarySignedRoute(
    //             'student-registration-email-verification.verification.verify', 
    //             now()->addSeconds(10)(60), 
    //             ['id' => $studentId, 'hash' => $token]
    //         );

    //         Log::info('Verification URL: ' . $verificationUrl);

    //         if (is_null($verificationUrl)) {
    //             throw new Exception('Verification URL is null');
    //         }

    //         Mail::to($request->email)->send(new VerifyEmail($verificationUrl));

    //         DB::commit();

    //         return response()->json(['message' => 'Successfully Registered. Please verify your email.'], 201);
    //     } catch (Exception $e) {
    //         DB::rollBack();
    //         Log::error('Error during registration: ' . $e->getMessage());
    //         return response()->json(['message' => 'Please Try Again', 'error' => $e->getMessage()], 500);
    //     }
    // }


    // public function signInCheck(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required',
    //         'password' => 'required',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 400);
    //     }

    //     try {
    //         $student = DB::table('par_students')->where('email', $request->email)->first();

    //         if ($student) {
    //             if (! $this->hasVerifiedEmail($student->id)) {
    //                 return response()->json(['message' => 'Please verify your email address.'], 403);
    //             }

    //             if ($student->status == 1) {
    //                 if (Hash::check($request->password, $student->password)) {
    //                     $token = Str::random(60); // Generate a random token
    //                     $expiresIn = 3600; // Token expiration time in seconds (1 hour)

    //                     // Delete old tokens for the student
    //                     DB::table('student_tokens')->where('student_id', $student->id)->delete(); // Remove old tokens

    //                     // Insert the new token
    //                     DB::table('student_tokens')->insert([
    //                         'student_id' => $student->id,
    //                         'token' => hash('sha256', $token),
    //                         'created_at' => now(),
    //                         'updated_at' => now(),
    //                         'expires_at' => now()->addSeconds($expiresIn), // Token expiration time
    //                     ]);

    //                     return response()->json([
    //                         'message' => 'Successfully Logged In',
    //                         'authorization' => [
    //                             'token' => $token,
    //                             'type' => 'bearer',
    //                             'expires_in' => $expiresIn,
    //                             'student_id' => $student->id,
    //                         ],
    //                     ], 200);
    //                 } else {
    //                     return response()->json(['message' => 'Email or Password is wrong!'], 401);
    //                 }
    //             } else {
    //                 return response()->json(['message' => 'You are not an active user! Please contact the Authority'], 403);
    //             }
    //         } else {
    //             return response()->json(['message' => 'Email or Password is wrong!'], 401);
    //         }
    //     } catch (Exception $e) {
    //         return response()->json(['message' => 'Please Try Again', 'error' => $e->getMessage()], 500);
    //     }
    // }

    // public function verifyEmail(Request $request, $user_id)
    // {
    //     $token = $request->input('token');

    //     $verification = DB::table('email_verifications')
    //                         ->where('student_id', $user_id)
    //                         ->where('token', $token)
    //                         ->first();

    //     if (! $verification) {
    //         return response()->json(['status' => 'Invalid verification token'], 400);
    //     }

    //     // Mark email as verified
    //     DB::table('par_students')
    //         ->where('id', $user_id)
    //         ->update(['email_verified_at' => now()]);

    //     // Delete verification token
    //     DB::table('email_verifications')
    //         ->where('student_id', $user_id)
    //         ->delete();

    //     return response()->json(['status' => 'Email verified successfully']);
    // }

    // public function resendVerificationEmail(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required|email',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 400);
    //     }

    //     $student = DB::table('par_students')->where('email', $request->email)->first();

    //     if (! $student) {
    //         return response()->json(['message' => 'Email not found'], 404);
    //     }

    //     if ($this->hasVerifiedEmail($student->id)) {
    //         return response()->json(['message' => 'Email already verified'], 400);
    //     }

    //     // Generate new verification token
    //     $token = Str::random(60);

    //     // Update or insert verification token
    //     DB::table('email_verifications')
    //         ->updateOrInsert(
    //             ['student_id' => $student->id],
    //             ['token' => $token, 'created_at' => now(), 'updated_at' => now()]
    //         );

    //     // Send email verification notification (you can implement this part)

    //     return response()->json(['status' => 'Verification email resent']);
    // }

    // protected function hasVerifiedEmail($student_id)
    // {
    //     $student = DB::table('par_students')->where('id', $student_id)->first();

    //     return $student && $student->email_verified;
    // }


    // public function checkEmail(Request $request)
    // {
    //     $email = $request->input('email');

    //     // Query using DB::table() to check if email exists
    //     $exists = DB::table('par_students')->where('email', $email)->exists();

    //     return response()->json(['exists' => $exists]);
    // }

    // public function signOut(Request $request)
    // {
    //     $token = $request->header('Authorization');

    //     if ($token) {
    //         $token = str_replace('Bearer ', '', $token);
    //         DB::table('student_tokens')->where('token', hash('sha256', $token))->delete();
    //     }

    //     return response()->json(['message' => 'Successfully Logged Out'], 200);
    // }
}
