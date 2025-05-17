import { Pokemon } from "@/models/pokemon";

export function getPokemonIconUrl(pokemon: Pokemon) {
    if (!pokemon || !pokemon.national_pokedex_number || !pokemon.name) {
        throw new Error("Invalid Pokemon data; cannot generate icon URL");
    }

    let pokedex_number = pokemon.national_pokedex_number.toString().padStart(4, "0");
    if (pokemon.name.endsWith("-A") || pokemon.name.endsWith("-G")) {
        pokedex_number += "_01";
    }
    return `https://projectpokemon.org/images/sprites-models/sv-sprites-home/${pokedex_number}.png`;
}
