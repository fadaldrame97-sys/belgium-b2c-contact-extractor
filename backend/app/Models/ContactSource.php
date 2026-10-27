<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactSource extends Model
{
    protected $fillable = [
        'contact_id', 'source_id', 'source_reference',
        'date_collecte', 'date_verification',
    ];

    protected $casts = [
        'date_collecte' => 'datetime',
        'date_verification' => 'datetime',
    ];

    public function contact(): BelongsTo{
        return $this->belongsTo(Contact::class);
    }

    public function source(): BelongsTo{
        return $this->belongsTo(Source::class);
    }
}