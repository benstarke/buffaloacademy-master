<?php

namespace Modules\SystemActivityLogs\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AudiTrailController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable 
     */
    public function index(): JsonResponse
    {
        $audits = DB::table('api_misaudit_trail')->orderBy('created_at', 'desc')->get();

        // Add duration field
        $audits = $audits->map(function ($audit) {
            $createdDate = Carbon::parse($audit->created_at);
            $audit->duration = $createdDate->diffForHumans();
            return $audit;
        });

        return response()->json([
            'success' => true,
            'data' => $audits
        ]);
    }
    
}
