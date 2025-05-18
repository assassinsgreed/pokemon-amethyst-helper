import { Pokemon } from "@/models/pokemon";
import { firebaseService } from "@/services/firebase-service";
import PokedexTile from "./pokedex-tile";
import { getPokemonIconUrl } from "./pokedex-helpers";

export default function PokedexContainerWrapper() {
    return (
      <PokedexContainer />
    );
}

async function PokedexContainer() {
    let pokemonListHtml: React.ReactNode[] = [];
    let error: string | null = null;
    try {
        const pokemonList = await firebaseService.getPokemon();
        pokemonListHtml = pokemonList.map((pokemon: Pokemon, idx: number) => {
            pokemon.icon_url = getPokemonIconUrl(pokemon);
            pokemon.first_type_colour = `var(--type_${pokemon.type[0]})`;
            pokemon.second_type_colour = pokemon.type[1] ? `var(--type_${pokemon.type[1]})` : pokemon.first_type_colour;
            return (<PokedexTile key={idx} pokemon={pokemon} />);
        });
    } catch (e) {
        console.error("Error fetching Pokemon data:", e);
        error = "Failed to load Pokémon data. Please try again later.";
    }

    return (
        <>
            <div className="centered">
                <h1>Pokedex</h1>
                <p>Click on a Pokemon to view its details.</p>
            </div>
            <div className="pokedex-container">
                {error && <div className="centered" style={{color: 'red'}}>{error}</div>}
                {!error && pokemonListHtml}
            </div>
        </>
    );
}
