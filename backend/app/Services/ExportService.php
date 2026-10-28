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

         $contenu = $this->genererCsv($contacts);
        Storage::disk('local')->put($this->chemin($export), $contenu);

                $export->update([
            'nombre_contacts' => $contacts->count(),
            'statut'          => 'termine',
            'url_fichier'     => route('exports.telecharger', $export),
        ]);

        return $export;

  } 

      public function telecharger(Export $export){
        
        if ($export->statut === 'expire' || $export->date_expiration->isPast()) {
            abort(410, 'Export expiré.');
        }

      
        if (!Storage::disk('local')->exists($this->chemin($export))) {
            abort(404);
        }

        return Storage::disk('local')->download(
            $this->chemin($export),
            "export_{$export->id}.csv"
        );
    }

  }   