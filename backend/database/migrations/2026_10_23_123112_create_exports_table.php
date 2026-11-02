<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('type_export')->default('csv');
            $table->json('filtre_utilise')->nullable();
            $table->unsignedInteger('nombre_contacts')->default(0);
            $table->json('champs_exportes');
            $table->string('statut')->default('en_preparation');
            $table->string('url_fichier')->nullable();
            $table->dateTime('date_expiration')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exports');
    }
};