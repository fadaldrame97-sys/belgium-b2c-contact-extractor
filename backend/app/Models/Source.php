<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Source extends Model
{
    protected $fillable = ['nom', 'url', 'statut_autorisation'];

    public function contactSources(): HasMany
    {
        return $this->hasMany(ContactSource::class);
    }
}