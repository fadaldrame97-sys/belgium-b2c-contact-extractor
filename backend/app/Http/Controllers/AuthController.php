<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function __construct(private AuthService $authService)
    {
    }

    public function login(Request $request): JsonResponse
    {
        $donnees = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        try {
            $resultat = $this->authService->connecter($donnees);

            Log::info('Connexion utilisateur réussie', [
                'user_id' => $resultat['utilisateur']->id,
            ]);

            return response()->json([
                'message' => 'Connexion réussie.',
                'utilisateur' => $resultat['utilisateur'],
                'token' => $resultat['token'],
            ]);
        } catch (ValidationException $exception) {
            Log::warning('Échec de connexion', ['email' => $donnees['email']]);
            throw $exception;
        }
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'utilisateur' => $request->user(),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->deconnecter($request->user());

        return response()->json([
            'message' => 'Déconnexion réussie.',
        ]);
    }
}
