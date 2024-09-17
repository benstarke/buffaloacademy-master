<?php

namespace Modules\SystemActivityLogs\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use Illuminate\Support\Facades\DB;


class ActivityLogsController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index(Request $request)
    {
        // Fetch logs with pagination
        $logs = DB::table('system_activity_logs')->orderBy('created_at', 'desc')->paginate(10); // Adjust the number per page as needed

        return response()->json($logs);
    }
}
