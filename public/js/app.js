let totalPokemons =0; 
let limit = 20; 
let offset = 0; 
let isLoading = false; 
AOS.init();

// carga de pokemones
$.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon',
    type: 'GET',
    success: function (response) {
        totalPokemons = response.count; 
        loadPokemonCards(); 
    },
    error: function (error) {
        console.error("Error al obtener el total de Pokémon:", error);
    }
});

function loadPokemonCards() {
    if (isLoading || offset >= totalPokemons) {
        return; 
    }
    isLoading = true; 
    const pokemonIds = [];
    for (let i = offset + 1; i <= Math.min(offset + limit, totalPokemons); i++) {
        pokemonIds.push(i);
    }
    let requests = pokemonIds.map((id) => { return $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
            type: 'GET'
        });
    });

    $.when(...requests)
        .done(function (...pokemonDetails) {
                pokemonDetails.forEach((pokemonResponse) => {
                    const pokemon = pokemonResponse[0];
                    const firstType = pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
                    const types = pokemon.types.map(type =>`<li class="TP${type.type.name.charAt(0).toUpperCase() +type.type.name.slice(1) } tipopk badge bg-info text-white mb-1">${type.type.name}</li>`).join('');
                    const image = pokemon.sprites.other['official-artwork'].front_default;
                    const id = pokemon.id;
                    const title = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                const html = `
                    <div class="TP${firstType} pokard m-3 shadow-lg border-0 protector" data-id=${id}>
                        <div class="d-flex justify-content-center">
                            <span class="Npoke overlay-text">${id}</span>
                            <span class="pokeNombre card-title text-center mb-3 text-dark">${title}</span>
                        </div>
                        <div class="${firstType} pokefotoContainer d-flex justify-content-center lazy" loading="lazy">
                            <img src="${image}" class="centered-image pokefoto lazy" alt="${title}" loading="lazy"> 
                        </div>
                        <div class="card-body p-4">
                            <ul class="card-text list-tipo">
                               ${types}
                            </ul>
                        </div>
                    </div>
                `;
                $('#Mazo').append(html);
            });

            offset += limit;
            isLoading = false; 
            if (offset < totalPokemons) {
                loadPokemonCards();
            }
        })
        .fail(() => {
            console.error("No se pudo obtener la información de algunos Pokémon");
            isLoading = false; 
        });
}
//buscar en el curpo donde estan las tarjetas
document.getElementById('search').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.pokard');
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase(); 
        const id = card.querySelector('.Npoke').textContent.toLowerCase(); 

        if (title.includes(searchTerm) || id.includes(searchTerm)) {
            card.style.display = ''; 
        } else {
            card.style.display = 'none'; 
        }
    });
});
//

document.getElementById('Mazo').addEventListener('click', function (e) {
    const card = e.target.closest('.pokard');
    if (card) {
        const id = card.getAttribute('data-id'); 
        console.log(id); 
        getDetail(id); 
    }
});


function getDetail(pokemonId) {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
        type: 'GET',
        success: function (pokemon) {
            $('#pokeName').text(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
            $('#pokeNameDetail').text(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
            $('#pokedex-detail').removeClass(function(index, className) {
                return className.split(' ').pop(); 
            });
            $('#pokedex-detail').addClass("TP"+pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1));

            $('#pokeId').text(`#${pokemon.id}`);
            let altura = pokemon.height * 10;
            let peso = pokemon.weight / 10; 

            $('#pokeHeight').text(altura);
            $('#pokeWeight').text(peso);
            $('#pokeImage').attr('src', pokemon.sprites.other['official-artwork'].front_default);
            $('#pokeImageContainer').removeClass(function(index, className) {
                return className.split(' ').pop(); 
            });
            $('#pokeImageContainer').addClass(pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1));

            const typesHtml = pokemon.types.map(type => `
                <li class="TP${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)} badge">
                    ${type.type.name}
                </li>
            `).join('');
            $('#pokeTypes').html(typesHtml);
           
            const statsHtml = pokemon.stats.map(stat => `
                <li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>
            `).join('');
            $('#pokeStats').html(statsHtml);
           
            $('#pokeMoves').empty();
            pokemon.moves.slice(0, 5).forEach(move => {  
                $('#pokeMoves').append('<li>' + move.move.name + '</li>');
            });
           
            $('#pokeAbilities').empty();
            pokemon.abilities.forEach(ability => {
                $('#pokeAbilities').append('<li>' + ability.ability.name + '</li>');
            });
            if (pokemon.description) {
                
                $('#pokeDescription').text(pokemon.description);
            } else {
                $('#pokeDescription').text("No disponible.");
            }
            
            $('#pokeWeaknesses').empty();
            const weaknesses = getWeaknesses(pokemon.types)
            const weaknessesHTML = weaknesses.map(weakness => 
                `<li class="TP${weakness.charAt(0).toUpperCase() + weakness.slice(1)} tipopk badge bg-info text-white mb-1">${weakness}</li>`
            ).join('');
            $('#pokeWeaknesses').append(weaknessesHTML);

            VerPokedexView();


        },
        error: function (error) {
            console.error("Error al obtener los detalles del Pokémon:", error);
        }
    });
}



function getWeaknesses(types) {
    const typeWeaknesses = {
        'normal': ['fighting'],
        'fire': ['water', 'rock', 'ground'],
        'water': ['electric', 'grass'],
        'electric': ['ground'],
        'grass': ['fire', 'ice', 'poison', 'flying', 'bug'],
        'ice': ['fire', 'fighting', 'rock', 'steel'],
        'fighting': ['fairy', 'flying', 'psychic'],
        'poison': ['ground', 'psychic'],
        'ground': ['water', 'ice', 'plant', 'water'],
        'flying': ['electric', 'rock', 'ice'],
        'psychic': ['bug', 'ghost', 'dark'],
        'bug': ['fire', 'flying', 'rock'],
        'rock': ['water', 'plant', 'fighting', 'ground', 'steel'],
        'ghost': ['ghost', 'dark'],
        'dragon': ['ice', 'fairy', 'dragon'],
        'dark': ['fairy', 'fighting', 'bug'],
        'steel': ['fire', 'fighting', 'ground'],
        'fairy': ['steel', 'poison']
    };

    let weaknesses = [];
    types.forEach(type => {
        if (typeWeaknesses[type.type.name]) {
            weaknesses = weaknesses.concat(typeWeaknesses[type.type.name]);
        }
    });

    return [...new Set(weaknesses)]; // Eliminar duplicados
}


function VerPokedexView() {
    const pokedex = document.getElementById('pokedex');
    const pokedexDetail = document.getElementById('pokedex-detail');

    // Alternar visibilidad
    if (pokedex.style.display === 'none') {
        pokedex.style.display = 'block';
        pokedexDetail.style.display = 'none';
    } else {
        pokedex.style.display = 'none';
        pokedexDetail.style.display = 'block';
    }
}