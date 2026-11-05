<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminUserController extends Controller
{
    public function __construct(private UserService $userService)
    {
    }

    public function index(): JsonResponse{
        return response()->json([
            'utilisateurs' => $this->userService->lister(),
        ]);
    }

    public function store(Request $request): JsonResponse{
        $donnees = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:12'],
            'role' => ['required', Rule::in(['administrateur', 'utilisateur', 'auditeur'])],
        ]);

        $donnees['is_active'] = true;
        $utilisateur = $this->userService->creer($donnees);

        return response()->json([
            'message' => 'Utilisateur créé avec succès.',
            'utilisateur' => $utilisateur,
        ], 201);
    }

    public function update(Request $request, User $user): JsonResponse{
        $donnees = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['sometimes', 'nullable', 'string', 'min:12'],
            'role' => ['sometimes', 'required', Rule::in(['administrateur', 'utilisateur', 'auditeur'])],
            'is_active' => ['sometimes', 'required', 'boolean'],
        ]);

        $utilisateur = $this->userService->modifier($user, $donnees, $request->user());

        return response()->json([
            'message' => 'Utilisateur mis à jour.',
            'utilisateur' => $utilisateur,
        ]);
    }
}
