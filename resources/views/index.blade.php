<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>POKEAPI PERRONA</title>
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.1/dist/aos.css">
    </head>
    <body class="pokedexbody font-sans antialiased dark:bg-black dark:text-white/50">
        <div id="pokedex" class="pokedex" >
            <header class="header">
                <h1 class= "pokedex-title">Tarjetas Pokémon</h1>
                <input type="text" id="search" placeholder="Buscar Pokémon..." class="search-bar">
            </header>
            <main class="pokard-grid">
                <div id="Mazo" class="Mazo d-flex flex-wrap justify-content-start gap-3">
                </div>
            </main>
        </div>
        <div id="pokedex-detail" style="display: none;" class="pokedex-detail blankclass">
            <header class="header">
                <button id="backButton" onclick="VerPokedexView()" class="volver">← Volver a la Pokédex</button>
                <h1 class= "pokedex-title">Detalles del Pokémon</h1>
            </header>
            <h2 id="pokeName" class="pokeNombre pokedex-title">Detalles del Pokémon</h1>
            <div class="pokard-detail-container">
                <div id="pokeImageContainer" class="pokeImageContainer image-container blankclass">
                    <img id="pokeImage" src="" alt="Imagen del Pokémon" class="pokefoto-detail">
                </div>
                <div class="info-container">
                    
                    <h2 id="pokeNameDetail" class="pokeNombreDetail"></h2>
                    <p><strong>ID:</strong> <span id="pokeId"></span></p>
                    <p><strong>Altura:</strong> <span id="pokeHeight"></span> cm</p>
                    <p><strong>Peso:</strong> <span id="pokeWeight"></span> kg</p>
                    
                    <div id="pokeTypes" class="list-tipo-detail"></div>
                    <h3>Debilidades</h3>
                    <div id="pokeWeaknesses" class="list-tipo-detail"></div>
                    <h3>Estadísticas</h3>
                    <ul id="pokeStats" class="stats-list"></ul>
                    <h3>Habilidades</h3>
                    <ul id="pokeAbilities" class="abilities-list">
                    </ul>
                    <h3>Movimientos</h3>
                    <ul id="pokeMoves" class="moves-list"></ul>
                    <h3>Descripción</h3>
                    <p id="pokeDescription" class="poke-description"></p>


                </div>
            </div>
        </div>
        <footer class="footer">
            <p>&copy; 2024 - Mi PokeAPI</p>
        </footer>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/aos@2.3.1/dist/aos.js"></script>  
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="{{ asset('js/app.js') }}" defer></script>

</html>
