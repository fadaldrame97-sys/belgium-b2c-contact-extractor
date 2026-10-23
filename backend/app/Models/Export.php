<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Export extends Model
{
    protected $fillable = [
        'utilisateur_id', 'type_export', 'filtre_utilise', 'nombre_contacts',
        'champs_exportes', 'statut', 'url_fichier', 'date_expiration',
    ];

    protected $casts = [
        'filtre_utilise' => 'array',
        'champs_exportes' => 'array',
        'date_expiration' => 'datetime',
    ];
}