<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// use App\Models\TravelPost;
use APP\Http\Controllers\TravelpostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('travelposts', 'App\Http\Controllers\TravelpostController@index');


Route::post('upload', 'App\Http\Controllers\TravelpostController@upload');