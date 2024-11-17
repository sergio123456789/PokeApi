<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Poketroller extends Controller
{
    public function getPokemonCard($name)
    {
        $response = Http::get("https://pokeapi.co/api/v2/pokemon/{$name}");
        if ($response->successful()) {
            $pokemon = $response->json();

            $types = collect($pokemon['types'])->map(function ($type) {
                return ucfirst($type['type']['name']); 
            })->toArray();

            $data = [
                'id' => $pokemon['id'],
                'title' => ucfirst($pokemon['name']),
                'image' => $pokemon['sprites']['other']['official-artwork']['front_default'],
                'tipos' => $types,
                'url' => "https://pokeapi.co/api/v2/pokemon/{$pokemon['id']}"
            ];
            dd($data);
            $html = view('components.pokard', $data)->render();
            return response()->json(['html' => $html]);
        }
        return response()->json(['error' => 'No se pudo obtener la información del Pokémon'], 404);
    }
}
