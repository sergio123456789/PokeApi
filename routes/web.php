<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PokeController;

Route::get('/', function () {
    return view('index');
});


Route::get('/pokemon-card/{index}', [PokeController::class, 'getPokemonCard']);

