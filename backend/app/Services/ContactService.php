<?php
namespace App\Services;
use App\Models\Contact;
use App\Models\Source;
use App\Models\ContactSource;
use Illuminate\Support\Facades\Http;


class ContactService
{
    public function importer()
    {
     
        $reponse = Http::timeout(20)->get(
            'https://fakenamely.com/api/v1/identity',
            [
                'count' => 20,
                'country' => 'be',
                'seed' => 'belgium-demo'
            ]
        );


        if (!$reponse->successful()) {
            throw new \Exception('Impossible de contacter FakeNamely.');
        }

        $donnees = $reponse->json();

        if (!isset($donnees['success']) || !$donnees['success']) {
            throw new \Exception('La réponse de FakeNamely est invalide.');
        }

      
        $source = Source::firstOrCreate(
            ['nom' => 'FakeNamely'],
            [
                'url' => 'https://fakenamely.com/api',
                'statut_autorisation' => 'demo_fictive'
            ]
        );

        $nombreImporte = 0;

    
        foreach ($donnees['data'] as $personne) {

            $nom = $personne['name']['last'] ?? '';
            $prenom = $personne['name']['first'] ?? '';

            $adresse = $personne['address']['street'] ?? null;
            $commune = $personne['address']['city'] ?? null;
            $codePostal = $personne['address']['postalCode'] ?? null;
            $province = $personne['address']['stateOrRegion'] ?? null;

            $telephone = $personne['contact']['phone'] ?? null;

          
            $contact = Contact::firstOrCreate(
                [
                    'nom' => $nom,
                    'prenom' => $prenom,
                    'adresse' => $adresse
                ],
                [
                    'telephone' => $telephone,
                    'code_postal' => $codePostal,
                    'commune' => $commune,
                    'province' => $province,
                    'statut' => 'actif'
                ]
            );

        
            $contact->contactSources()->firstOrCreate(
                ['source_id' => $source->id],
                [
                    'source_reference' => $personne['seed'] ?? null,
                    'date_collecte' => now()
                ]
            );

            $nombreImporte++;
        }

        return [
            'message' => 'Importation terminée.',
            'nombre_importe' => $nombreImporte,
            'source' => $source->nom,
            'donnees_fictives' => true
        ];
    }
}
