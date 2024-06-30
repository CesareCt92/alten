<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeerController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});
Route::post('/login', [AuthController::class, 'login']);

Route::post('/checkToken', [BeerController::class, 'checkToken']);
Route::get('/beer-list', [BeerController::class, 'list']);

