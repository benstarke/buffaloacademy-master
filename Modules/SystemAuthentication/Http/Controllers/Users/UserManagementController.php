<?php

namespace Modules\SystemAuthentication\Http\Controllers\Users;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use App\Helpers\DbHelper;
use Carbon\Carbon;

class UserManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     * GET ALL STUDENTS
     */
    public function indexStudents(): JsonResponse
    {
        $students = DB::table('par_students')->get();
        // Add duration field
        $students = $students->map(function ($student) {
            $createdDate = Carbon::parse($student->created_at);
            $student->duration = $createdDate->diffForHumans();
            return $student;
        });

        return response()->json([
            'success' => true,
            'data' => $students
        ]);
    }

    /**
     * Display a listing of the resource.
     * @return Renderable
     * GET ALL INSTRUCTORS
     */
    public function indexInstructors(): JsonResponse
    {
        $instructors = DB::table('par_instructors')->get();
        return response()->json($instructors);
    }
    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('systemauthentication::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('systemauthentication::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        return view('systemauthentication::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        //
    }
}
