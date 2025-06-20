import { Pokemon } from "../../types/pokemon";
import { firebaseService } from "../../services/firebase-service";
import { getPokemonIconUrl, getPokemonFullImageUrl } from "./pokedex-helpers";
import PokedexContainer from "./pokedex-container";
import "../../styles/globals.css";

export default async function Pokedex() {
    let pokemonList: Pokemon[] = [];
    let error: string | null = null;
    try {
        pokemonList = await firebaseService.getPokemon();
        pokemonList = pokemonList.map((pokemon: Pokemon) => ({
            ...pokemon,
            icon_url: getPokemonIconUrl(pokemon),
            full_image: getPokemonFullImageUrl(pokemon),
            type_colours: getTypeColours(pokemon.type),
        }));
    } catch (e) {
        console.error("Error fetching Pokémon data:", e);
        error = "Failed to load Pokémon data. Please try again later.";
    }

    return (
        <PokedexContainer pokemonList={pokemonList} error={error} />
    );
}

function getTypeColours(types: string[]): string[] {
    return types.filter(Boolean).map(type => `var(--type_${type})`);
}
