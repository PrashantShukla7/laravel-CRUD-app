<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Blog;

class BlogController extends Controller
{
    //

    function getBlogs(Request $request) {
        $blogs = Blog::orderBy('created_at', 'DESC');

    // Search by keyword if provided
    if (!empty($request->keyword)) {
        $blogs->where('title', 'like', '%' . $request->keyword . '%');
    }

    // Order by latest created blogs
    $blogs = $blogs->get();
        return response()->json([
            'status'=> true,
            'message' => 'Blogs retrieved successfully',
            'data' => $blogs
        ]);
    }

    public function createBlog(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'title'       => 'required|min:10|max:255',
            'author'      => 'required|min:3',
            'description' => 'required|min:20',
        ]);

        // Return validation errors
        if ($validator->fails()) {
            return response()->json([
                'status'  => false,
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }

        // Create a new blog
        $blog = Blog::create([
            'user_id'     => auth()->id(), // Associate with authenticated user
            'title'       => $request->title,
            'author'      => $request->author,
            'description' => $request->description
        ]);

        // Return success response
        return response()->json([
            'status'  => true,
            'message' => 'Blog created successfully',
            'data'    => $blog
        ], 201);
    }

    function getBlog (Request $request) {
        $blog = Blog::find($request->id);
        if(!$blog) {
            return response()->json([
               'status'=> false,
               'message' => 'Blog not found'
            ]);
        }
        return response()->json([
           'status'=> true,
           'message' => 'Blog retrieved successfully',
            'data' => $blog
        ]);
    } 

    public function getUserBlogs($userId)
    {
        $blogs = Blog::where('user_id', $userId)->get();
        return response()->json($blogs);
    }

    public function updateBlog(Request $request, $id) {
        // Validate request
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:10|max:255',
            'author' => 'required|min:3',
            'description' => 'required|min:20',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid blog data',
                'errors' => $validator->errors()
            ], 400);
        }
    
        // Find the blog post
        $blog = Blog::find($id);
        
        if (!$blog) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found'
            ], 404);
        }
    
        // Update the blog fields
        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->description = $request->description;
        $blog->save();
    
        return response()->json([
            'status' => true,
            'message' => 'Blog updated successfully',
            'data' => $blog
        ]);
    }

    public function deleteBlog($id) {
        $blog = Blog::find($id);
        
        if (!$blog) {
            return response()->json([
               'status' => false,
               'message' => 'Blog not found'
            ], 404);
        }

        $blog->delete();

        return response()->json([
           'status' => true,
           'message' => 'Blog deleted successfully'
        ]);
    }
}
