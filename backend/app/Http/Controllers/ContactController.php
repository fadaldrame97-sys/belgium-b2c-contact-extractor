
<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Source;
use Illuminate\Support\Facades\Http;

class ContactController extends Controller
{
    public function importer()
    {
        try {
           
            $reponse = Http::timeout(20)->get(
                'https://fakenamely.com/api/v1/identity',
                [
                    'count' => 20,
                    'country' => 'be',
                    'seed' => 'belgium-demo'
                ]
            );

            if (!$reponse->successful()) {
                return response()->json([
                    'message' => 'Impossible de contacter FakeNamely.'
                ], 502);
            }

            $donnees = $reponse->json();

            if (!isset($donnees['success']) || !$donnees['success']) {
                return response()->json([
                    'message' => 'La réponse de l’API est invalide.'
                ], 502);
            }

                    $source = Source::firstOrCreate(
                ['nom' => 'FakeNamely'],
                [
                    'url' => 'https://fakenamely.com/api',
                    'statut_autorisation' => 'demo_fictive'
                ]
            );

            $nombreImporte = 0;