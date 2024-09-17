<?php

namespace Modules\SystemCourses\Http\Controllers\Courses;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Helpers\DbHelper;
use Carbon\Carbon;

class ReviewsController extends Controller
{
    /**
     * Display a listing of the reviews.
     */
    public function index(): JsonResponse
    {
        $reviews = DB::table('par_reviews')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $reviews
        ]);
    }

    /**
     * Display the specified review.
     */
    public function show($id): JsonResponse
    {
        $review = DB::table('par_reviews')->find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $review
        ]);
    }

    /**
     * Store a newly created review in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            'rating' => 'required|integer|between(1,5)',
            'comment' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $reviewId = DB::table('par_reviews')->insertGetId([
            'student_id' => $request->input('student_id'),
            'course_id' => $request->input('course_id'),
            'rating' => $request->input('rating'),
            'comment' => $request->input('comment'),
            'created_by' => auth()->id(),
            'created_at' => now(),
        ]);

        // Audit trail logic for creation
        $auditTrailData = [
            'table_name' => 'par_reviews',
            'table_action' => 'insert',
            'current_tabledata' => json_encode($reviewId),
            'user_id' => auth()->id(),
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            null,
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'message' => 'Review created successfully',
            'data' => $reviewId
        ], 201);
    }

    /**
     * Update the specified review in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $review = DB::table('par_reviews')->find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            'rating' => 'required|integer|between(1,5)',
            'comment' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $previousData = (array)$review;

        DB::table('par_reviews')
            ->where('id', $id)
            ->update([
                'student_id' => $request->input('student_id'),
                'course_id' => $request->input('course_id'),
                'rating' => $request->input('rating'),
                'comment' => $request->input('comment'),
                'updated_by' => auth()->id(),
                'updated_at' => now(),
            ]);

        // Audit trail logic for update
        $updatedReview = DB::table('par_reviews')->find($id);

        $auditTrailData = [
            'table_name' => 'par_reviews',
            'table_action' => 'update',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => json_encode($updatedReview),
            'user_id' => auth()->id(),
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            $auditTrailData['prev_tabledata'],
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully',
            'data' => $updatedReview
        ], 200);
    }

    /**
     * Remove the specified review from storage.
     */
    public function destroy($id): JsonResponse
    {
        $review = DB::table('par_reviews')->find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        // Audit trail logic for deletion
        $previousData = (array)$review;

        $auditTrailData = [
            'table_name' => 'par_reviews',
            'table_action' => 'delete',
            'prev_tabledata' => json_encode($previousData),
            'current_tabledata' => null,
            'user_id' => auth()->id(),
        ];

        DbHelper::auditTrail(
            $auditTrailData['table_name'],
            $auditTrailData['table_action'],
            $auditTrailData['prev_tabledata'],
            $auditTrailData['current_tabledata'],
            $auditTrailData['user_id']
        );

        DB::table('par_reviews')->where('id', $id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ], 200);
    }
}
