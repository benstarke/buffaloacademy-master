<?php

namespace Modules\SystemAuthentication\Http\Controllers\Students;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Exception;
 
use Illuminate\Support\Facades\Mail;
use Modules\SystemAuthentication\Mail\ProfileUpdated;
use Modules\SystemAuthentication\Mail\PasswordChanged; 
use Modules\SystemAuthentication\Mail\ImageUpdated;

class ProfileController extends Controller
{
    private function getCurrentStudentId(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            throw new Exception('Token not provided', 401);
        }

        $payload = JWTAuth::setToken($token)->getPayload();
        return $payload['sub'];
    }

    public function index(Request $request)
    {
        try {
            $studentId = $this->getCurrentStudentId($request);
            $student_info = DB::table('par_students')->where('id', $studentId)->first();
            $enrollment = DB::table('par_enrollments')->where('student_id', $studentId)->get();

            return response()->json([
                'student_info' => $student_info,
                'enrollment' => $enrollment
            ], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to fetch profile', 'error' => $e->getMessage()], 500);
        }
    }

    public function save_profile(Request $request)
    {
        try {
            $studentId = $this->getCurrentStudentId($request);
            $student = DB::table('par_students')->where('id', $studentId)->first();

            // Validate input
            $request->validate([
                'name_en' => 'required|string|max:255',
                'contact_en' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'date_of_birth' => 'required|date',
                // 'gender' => 'required|string|max:255',
                'bio' => 'nullable|string',
                'profession' => 'nullable|string|max:255',
                'nationality' => 'nullable|string|max:255',
            ]);

            // Check if the new email is unique, excluding the current user's email
            $emailExists = DB::table('par_students')
                ->where('email', $request->email)
                ->where('id', '!=', $studentId)
                ->exists();

            if ($emailExists) {
                return response()->json(['message' => 'The email address is already taken.'], 400);
            }

            // Prepare data for update
            $data = [
                'name_en' => $request->name_en,
                'contact_en' => $request->contact_en,
                'email' => $request->email,
                'date_of_birth' => $request->date_of_birth,
                // 'gender' => $request->gender,
                'bio' => $request->bio,
                'profession' => $request->profession,
                'nationality' => $request->nationality,
                'language' => 'en'
            ];

            if ($request->hasFile('image')) {
                $imageName = rand(111, 999) . time() . '.' . $request->image->extension();
                $request->image->move(public_path('uploads/students'), $imageName);
                $data['image'] = $imageName;
            }

            // Attempt to send email first
            try {
                Mail::to($student->email)->send(new ProfileUpdated($student));
            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to send email notification', 'error' => $e->getMessage()], 500);
            }

            // Proceed with profile update only if email is successfully sent
            DB::table('par_students')->where('id', $studentId)->update($data);

            return response()->json(['success' => 'Your changes have been saved'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to save profile', 'error' => $e->getMessage()], 500);
        }
    }


    // public function save_profile(Request $request)
    // {
    //     try {
    //         $studentId = $this->getCurrentStudentId($request);
    //         $student = DB::table('par_students')->where('id', $studentId)->first();

    //         // Validate input
    //         $request->validate([
    //             'name_en' => 'required|string|max:255',
    //             'contact_en' => 'required|string|max:255',
    //             'email' => 'required|email|max:255',
    //             'date_of_birth' => 'required|date',
    //             // 'gender' => 'required|string|max:255',
    //             'bio' => 'nullable|string',
    //             'profession' => 'nullable|string|max:255',
    //             'nationality' => 'nullable|string|max:255',
    //         ]);

    //         // Check if the new email is unique, excluding the current user's email
    //         $emailExists = DB::table('par_students')
    //             ->where('email', $request->email)
    //             ->where('id', '!=', $studentId)
    //             ->exists();

    //         if ($emailExists) {
    //             return response()->json(['message' => 'The email address is already taken.'], 400);
    //         }

    //         // Prepare data for update
    //         $data = [
    //             'name_en' => $request->name_en,
    //             'contact_en' => $request->contact_en,
    //             'email' => $request->email,
    //             'date_of_birth' => $request->date_of_birth,
    //             // 'gender' => $request->gender,
    //             'bio' => $request->bio,
    //             'profession' => $request->profession,
    //             'nationality' => $request->nationality,
    //             'language' => 'en'
    //         ];

    //         if ($request->hasFile('image')) {
    //             $imageName = rand(111, 999) . time() . '.' . $request->image->extension();
    //             $request->image->move(public_path('uploads/students'), $imageName);
    //             $data['image'] = $imageName;
    //         }

    //         DB::table('par_students')->where('id', $studentId)->update($data);

    //          // Send email notification
    //         Mail::to($student->email)->send(new ProfileUpdated($student));

    //         return response()->json(['success' => 'Your changes have been saved'], 200);
    //     } catch (Exception $e) {
    //         return response()->json(['message' => 'Failed to save profile', 'error' => $e->getMessage()], 500);
    //     }
    // }

    public function change_password(Request $request)
    {
        try {
            $studentId = $this->getCurrentStudentId($request);
            $student = DB::table('par_students')->where('id', $studentId)->first();

            // Validate input
            $request->validate([
                'current_password' => 'required',
                'new_password' => 'required|min:6|confirmed', // `confirmed` checks the `new_password_confirmation` field
            ]);

            // Validate current password
            if (!Hash::check($request->current_password, $student->password)) {
                return response()->json(['message' => 'Current password is incorrect.'], 400);
            }

            // Store old password for email
            $oldPassword = $request->current_password;
            $newPassword = $request->new_password;

            // Attempt to send email first
            try {
                Mail::to($student->email)->send(new PasswordChanged($oldPassword, $newPassword, $student));
            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to send email notification', 'error' => $e->getMessage()], 500);
            }

            // Proceed with password change only if email is successfully sent
            DB::table('par_students')->where('id', $studentId)->update([
                'password' => Hash::make($request->new_password),
                'language' => 'en'
            ]);

            return response()->json(['success' => 'Password has been changed'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to change password', 'error' => $e->getMessage()], 500);
        }
    }


    // public function changeImage(Request $request)
    // {
    //     try {
    //         $studentId = $this->getCurrentStudentId($request);
    //         $student = DB::table('par_students')->where('id', $studentId)->first();

    //         if ($request->hasFile('image')) {
    //             // Define the absolute folder path where the image will be stored
    //             $folderPath = 'C:/Users/omusi/Desktop/elk/angular-new/version-17-8.12.2-primeng/elbapp/public/views/dev_portal/buffalofrontend/src/assets/uploads/students';

    //             // Generate a unique file name for the image
    //             $imageName = uniqid() . '.' . $request->image->extension();

    //             // Store the image in the specified folder with the unique file name
    //             $request->image->move($folderPath, $imageName);

    //             // Update the student's image path in the database
    //             DB::table('par_students')->where('id', $studentId)->update(['image' => 'assets/uploads/students/' . $imageName]);

    //             // Send email notification
    //             Mail::to($student->email)->send(new ImageUpdated($student));

    //             return response()->json(['success' => 'Image changed successfully.'], 200);
    //         } else {
    //             return response()->json(['message' => 'Please select a valid image file.'], 400);
    //         }
    //     } catch (Exception $e) {
    //         return response()->json(['message' => 'Failed to change image', 'error' => $e->getMessage()], 500);
    //     }
    // }




    // public function changeImage(Request $request)
    // {
    //     try {
    //         $studentId = $this->getCurrentStudentId($request);
    //         $student = DB::table('par_students')->where('id', $studentId)->first();

    //         if ($request->hasFile('image')) {
    //             $imageName = rand(111, 999) . time() . '.' . $request->image->extension();
    //             $request->image->move(public_path('uploads/students'), $imageName);

    //             DB::table('par_students')->where('id', $studentId)->update(['image' => $imageName]);

    //             // Send email notification
    //             Mail::to($student->email)->send(new ImageUpdated($student));

    //             return response()->json(['success' => 'Image changed successfully.'], 200);
    //         } else {
    //             return response()->json(['message' => 'Please select a valid image file.'], 400);
    //         }
    //     } catch (Exception $e) {
    //         return response()->json(['message' => 'Failed to change image', 'error' => $e->getMessage()], 500);
    //     }
    // }

    public function changeImage(Request $request)
    {
        try {
            $studentId = $this->getCurrentStudentId($request);
            $student = DB::table('par_students')->where('id', $studentId)->first();

            if ($request->hasFile('image')) {
                $imageName = rand(111, 999) . time() . '.' . $request->image->extension();
                $imagePath = 'views/dev_portal/buffalofrontend/src/assets/uploads/students/' . $imageName;
                $request->image->move(public_path('uploads/students'), $imageName);

                DB::table('par_students')->where('id', $studentId)->update(['image' => $imagePath]);

                // Send email notification
                Mail::to($student->email)->send(new ImageUpdated($student));

                return response()->json(['success' => 'Image changed successfully.', 'imagePath' => $imagePath], 200);
            } else {
                return response()->json(['message' => 'Please select a valid image file.'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to change image', 'error' => $e->getMessage()], 500);
        }
    }

}