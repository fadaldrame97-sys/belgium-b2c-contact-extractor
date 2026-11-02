<?php

namespace App\Http\Controllers;

use App\Services\ContactService;

class ContactController extends Controller
{
    public function __construct(private ContactService $service)
    {
    }

    public function importer()
    {
        try {
            return response()->json($this->service->importer());
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 502);
        }
    }
}