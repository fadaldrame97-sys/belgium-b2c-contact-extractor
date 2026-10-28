<?php

use App\Http\Controllers\ExportController;

Route::post('/exports', [ExportController::class, 'createExport']);
Route::get('/exports/{export}/telecharger', [ExportController::class, 'telecharger'])
    ->name('exports.telecharger');
