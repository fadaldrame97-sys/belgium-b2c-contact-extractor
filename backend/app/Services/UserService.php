<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserService
{
    public function lister(){
        return User::select('id', 'name', 'email', 'role', 'is_active', 'created_at')
            ->orderBy('name')
            ->get();
    }

    public function creer(array $donnees): User{
        $donnees['password'] = Hash::make($donnees['password']);

        return User::create($donnees);
    }

    public function modifier(User $utilisateur, array $donnees, User $administrateur): User{
        if ($utilisateur->id === $administrateur->id
            && array_key_exists('is_active', $donnees)
            && $donnees['is_active'] === false) {
            throw ValidationException::withMessages([
                'is_active' => ['Vous ne pouvez pas désactiver votre propre compte.'],
            ]);
        }

        if (array_key_exists('password', $donnees) && $donnees['password']) {
            $donnees['password'] = Hash::make($donnees['password']);
        } else {
            unset($donnees['password']);
        }

        $utilisateur->update($donnees);

        if (array_key_exists('is_active', $donnees) && $donnees['is_active'] === false) {
            $utilisateur->tokens()->delete();
        }

        return $utilisateur->fresh();
    }
}
