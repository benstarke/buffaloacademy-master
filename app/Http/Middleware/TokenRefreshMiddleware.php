<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class TokenRefreshMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $hashedToken = hash('sha256', $token);
        $tokenRecord = DB::table('student_tokens')->where('token', $hashedToken)->first();

        if (!$tokenRecord) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $expiresAt = Carbon::parse($tokenRecord->expires_at);
        $lastActivity = Carbon::parse($tokenRecord->updated_at);
        $currentTime = Carbon::now();

        // Check if the user has been inactive for more than 30 minutes
        if ($currentTime->diffInMinutes($lastActivity) > 30) {
            // Log out the user
            DB::table('student_tokens')->where('token', $hashedToken)->delete();
            return response()->json(['message' => 'Session expired, please log in again'], 401);
        }

        // Refresh the token if it is not yet expired
        if ($currentTime->lessThanOrEqualTo($expiresAt)) {
            $newExpiresAt = $currentTime->addSeconds(3600);

            // Delete the old token
            DB::table('student_tokens')->where('token', $hashedToken)->delete();

            // DB::table('student_tokens')->where('token', $hashedToken)->update([
            //     'updated_at' => $currentTime,
            //     'expires_at' => $newExpiresAt
            // ]);

            // $newToken = Str::random(60);
            // $hashedNewToken = hash('sha256', $newToken);

            DB::table('student_tokens')->insert([
                'student_id' => $tokenRecord->student_id,
                'token' => $hashedNewToken,
                'created_at' => $currentTime,
                'updated_at' => $currentTime,
                'expires_at' => $newExpiresAt,
            ]);

            return response()->json([
                'message' => 'Token refreshed',
                'authorization' => [
                    'token' => $newToken,
                    'type' => 'bearer',
                    'expires_in' => 3600,
                    'student_id' => $tokenRecord->student_id,
                ],
            ]);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}