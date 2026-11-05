<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function connecter(array $donnees): array
    {
        $utilisateur = User::where('email', $donnees['email'])->first();

        if (!$utilisateur || !Hash::check($donnees['password'], $utilisateur->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects.'],
            ]);
        }

        if (!$utilisateur->is_active) {
            throw ValidationException::withMessages([
                'email' => ['Ce compte est désactivé. Contactez l’administrateur.'],
            ]);
        }

        $token = $utilisateur->createToken('react-app')->plainTextToken;

        return [
            'utilisateur' => $utilisateur,
            'token' => $token,
        ];
    }