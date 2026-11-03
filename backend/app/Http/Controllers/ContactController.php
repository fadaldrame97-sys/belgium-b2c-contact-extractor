<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactIndexRequest;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class ContactController extends Controller{
    public function __construct(private ContactService $service){
    }

    public function index(ContactIndexRequest $request){
        $contacts = $this->service->lister($request->validated());

        return response()->json([
            'contacts' => $contacts,
        ]);
    }

    public function statistiques(){
        return response()->json([
            'statistiques' => $this->service->statistiques(),
        ]);
    }

    public function importer(){
        try {
            $resultat = $this->service->importer();

            return response()->json($resultat);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'L’importation a échoué. Vérifiez la connexion à FakeNamely et les journaux Laravel.',
            ], 502);
        }
    }
}
