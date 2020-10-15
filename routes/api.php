<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['prefix' => 'auth'], function ($router) {

    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
});
Route::group(['middleware' => 'jwt.auth'], function ($router) {

    Route::get('customers', 'App\Http\Controllers\CustomerController@all');
    Route::get('customers/{id}', 'App\Http\Controllers\CustomerController@get');
    Route::post('customers/new', 'App\Http\Controllers\CustomerController@new');
});