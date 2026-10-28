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

  }   