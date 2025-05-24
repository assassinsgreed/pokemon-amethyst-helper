import { Pokemon } from "../../types/pokemon";
import { firebaseService } from "../../services/firebase-service";
import { getPokemonIconUrl } from "./pokedex-helpers";
import PokedexClient from "./pokedex-client";
import "../../styles/globals.css";

export default async function Pokedex() {
    let pokemonList: Pokemon[] = [];
    let error: string | null = null;
    try {
        pokemonList = await firebaseService.getPokemon();
        pokemonList = pokemonList.map((pokemon: Pokemon) => ({
            ...pokemon,
            icon_url: getPokemonIconUrl(pokemon),
            first_type_colour: `var(--type_${pokemon.type[0]})`,
            second_type_colour: pokemon.type[1] ? `var(--type_${pokemon.type[1]})` : `var(--type_${pokemon.type[0]})`,
        }));
    } catch (e) {
        console.error("Error fetching Pokemon data:", e);
        error = "Failed to load Pokémon data. Please try again later.";
    }

    return (
        <PokedexClient pokemonList={pokemonList} error={error} />
    );
}
