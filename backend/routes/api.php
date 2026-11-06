
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\AdminUserController;



Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1');


Route::middleware('auth:sanctum')->group(function () {


    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

 
    Route::post('/contacts/importer', [ContactController::class, 'importer']);

    Route::post('/exports', [ExportController::class, 'createExport']);

    Route::get('/exports/{export}/telecharger', [ExportController::class, 'telecharger'])
        ->name('exports.telecharger');


    Route::middleware('role:administrateur')
        ->prefix('admin')
        ->group(function () {

            Route::get('/users', [AdminUserController::class, 'index']);
            Route::post('/users', [AdminUserController::class, 'store']);
            Route::put('/users/{user}', [AdminUserController::class, 'update']);

        });

});
