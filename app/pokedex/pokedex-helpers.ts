import { Pokemon } from "../../types/pokemon";

export function getPokemonIconUrl(pokemon: Pokemon) {
    if (!pokemon || !pokemon.national_pokedex_number || !pokemon.name) {
        throw new Error("Invalid Pokemon data; cannot generate icon URL");
    }

    let pokedex_number = pokemon.national_pokedex_number.toString().padStart(4, "0");
    if (/-[AG]$/.test(pokemon.name)) {
        pokedex_number += "_01";
    }
    return `https://projectpokemon.org/images/sprites-models/sv-sprites-home/${pokedex_number}.png`;
}

export function getPokemonFullImageUrl(pokemon: Pokemon) {
    if (!pokemon || !pokemon.national_pokedex_number || !pokemon.name) {
        throw new Error("Invalid Pokemon data; cannot generate full image URL");
    }

    let normalizedName = pokemon.name
        .replace(".", "")
        .replace(" ", "-")
        .replace("'", "")
        .replace("-A", "-alolan")
        .replace("-G", "-galarian")
        .toLowerCase();

    if (pokemon.name === "Darmanitan-G") {
        normalizedName = "darmanitan-galarian-standard";
    }

    return `https://img.pokemondb.net/sprites/home/normal/${normalizedName}.png`;
}
