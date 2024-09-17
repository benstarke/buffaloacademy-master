<?php

namespace Modules\SystemAuthentication\Http\Middleware\Instructors;

use Closure;
use Illuminate\Http\Request;

use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class JWTMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Log the Authorization header
        Log::info('Authorization Header: ' . $request->header('Authorization'));

        // Check if the token is present
        $token = $request->bearerToken();
        if (!$token) {
            Log::error('Authorization Token not found in request headers.');
            return response()->json(['status' => 'Authorization Token not found'], 401);
        }

        Log::info('Token found: ' . $token);

        try {
            $payload = JWTAuth::parseToken()->getPayload();
            $studentId = $payload['sub'];

            Log::info('Student ID from token: ' . $studentId);

            $student = DB::table('par_students')->where('id', $studentId)->first();

            if (!$student) {
                Log::error('Student not found in database.');
                return response()->json(['status' => 'Student not found'], 404);
            }

            Log::info('Student authenticated: ' . json_encode($student));
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                Log::error('Token is Invalid: ' . $e->getMessage());
                return response()->json(['status' => 'Token is Invalid'], 401);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                Log::error('Token is Expired: ' . $e->getMessage());
                return response()->json(['status' => 'Token is Expired'], 401);
            } else {
                Log::error('Authorization Token not found: ' . $e->getMessage());
                return response()->json(['status' => 'Authorization Token not found'], 401);
            }
        }

        return $next($request);
    }
}
