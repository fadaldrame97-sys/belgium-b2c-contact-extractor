
<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Source;
use Illuminate\Support\Facades\Http;

class ContactController extends Controller
{
    public function importer()
    {
        try {
           
            $reponse = Http::timeout(20)->get(
                'https://fakenamely.com/api/v1/identity',
                [
                    'count' => 20,
                    'country' => 'be',
                    'seed' => 'belgium-demo'
                ]
            );