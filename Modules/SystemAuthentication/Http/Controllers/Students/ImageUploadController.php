<?php

namespace Modules\SystemAuthentication\Http\Controllers\Students;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Exception;

class ImageUploadController extends Controller
{
    public function uploadTempImage(Request $request)
    {
        try {
            // Validate the request to ensure the file is an image and not too large
            $request->validate([
                'image' => 'required|image|max:2048', // max size 2MB
            ]);

            // Generate a unique file name
            $imageName = rand(111, 999) . time() . '.' . $request->image->extension();

            // Move the image to a temporary location
            $request->image->move(public_path('views/dev_portal/buffalofrontend/src/assets/uploads/temp/students'), $imageName);

            return response()->json(['success' => 'Image uploaded successfully.', 'imageName' => $imageName], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to upload image', 'error' => $e->getMessage()], 500);
        }
    }
}
