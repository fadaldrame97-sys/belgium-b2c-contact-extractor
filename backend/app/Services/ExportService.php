<?php
use App\Models\ContactSource;
use App\Models\Export;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;


class ExportService
{
   
    public const CHAMPS = [
        'nom', 'prenom', 'code_postal', 'commune', 'province', 'source', 'date_collecte',
    ];


      private const FILTRES = ['nom', 'prenom', 'commune'];

    public function creer(array $filtres, ?int $utilisateurId): Export
    {
        $lignes = $this->chercherContacts($filtres);

        $export = Export::create([
            'utilisateur_id' => $utilisateurId,
            'type_export' => 'csv',
            'filtre_utilise' => array_filter($filtres),
            'champs_exportes' => self::CHAMPS,
            'statut' => 'en_preparation',
            'date_expiration' => now()->addDays(30),
        ]);

        
  } 

  }   