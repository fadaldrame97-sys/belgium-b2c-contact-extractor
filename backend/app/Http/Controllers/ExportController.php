<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateExportRequest;
use App\Models\Export;
use App\Services\ExportService;

class ExportController extends Controller
{
    public function __construct(private ExportService $service)
    {
    }

    public function createExport(CreateExportRequest $request)
    {
        $export = $this->service->creer($request->validated(), $request->user()?->id);

        return response()->json([
            'id' => $export->id,
            'url' => $export->url_fichier,
            'nombre_contacts' => $export->nombre_contacts,
            'date_expiration' => $export->date_expiration,
        ], 201);
    }

    }

