<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return 'welcome';
});

Route::get('blog', [BlogController::class, 'getBlogs']);
Route::post('blog', [BlogController::class, 'createBlog'])->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
Route::get('/blog/{id}', [BlogController::class, 'getBlog']); 
Route::put('/blog/{id}', [BlogController::class, 'updateBlog'])->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]); 
Route::delete('/blog/{id}', [BlogController::class, 'deleteBlog'])->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]); 
Route::get('/user/{userId}/blogs', [BlogController::class, 'getUserBlogs']); 
Route::post('register', [AuthController::class, 'registerUser'])->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
Route::post('/login', [AuthController::class, 'loginUser'])->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
Route::get('/user', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout'])->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
