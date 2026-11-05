<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');
        $name = env('ADMIN_NAME', 'Administrateur');

        if (!$email || !$password) {
            $this->command->warn(
                'AdminSeeder ignoré : définissez ADMIN_EMAIL et ADMIN_PASSWORD dans .env.'
            );
            return;
        }

        if (strlen($password) < 12) {
            throw new RuntimeException('ADMIN_PASSWORD doit contenir au moins 12 caractères.');
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => 'administrateur',
                'is_active' => true,
            ]
        );

        $this->command->info('Compte administrateur créé ou mis à jour.');
    }
}
