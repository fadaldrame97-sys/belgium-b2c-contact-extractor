<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateExportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // à restreindre aux rôles autorisés avec US-02
    }

    public function rules(): array
    {
        return [
            'nom' => ['nullable', 'string', 'max:100'],
            'prenom' => ['nullable', 'string', 'max:100'],
            'commune' => ['nullable', 'string', 'max:100'],
        ];
    }
}