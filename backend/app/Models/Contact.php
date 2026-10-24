<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Contact extends Model {

    protected $fillable = [
        'nom', 'prenom', 'telephone', 'adresse',
        'code_postal', 'commune', 'province', 'statut',
    ];

    public function contactSources(): HasMany {
        return $this->hasMany(ContactSource::class);
    }

    public function scopeActif(Builder $query){
        $query->where('statut', 'actif');
    }

   
    public function scopeFiltrer(Builder $query, array $filtres){
        foreach (['nom', 'prenom', 'commune'] as $champ) {
            if (!empty($filtres[$champ])) {
                $query->where($champ, 'like', '%' . $filtres[$champ] . '%');
            }
        }
    }
}