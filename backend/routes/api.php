<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\ContactController;

Route::post('/exports', [ExportController::class, 'createExport']);

Route::get('/exports/{export}/telecharger', [ExportController::class, 'telecharger'])
    ->name('exports.telecharger');

Route::post('/contacts/importer', [ContactController::class, 'importer']);