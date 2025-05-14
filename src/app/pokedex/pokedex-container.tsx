import { Pokemon } from "@/models/pokemon";
import { firebaseService } from "@/services/firebase-service";
import PokedexTile from "./pokedex-tile";

export default async function PokedexContainer() {
    let pokemonListHtml: React.ReactNode[] = [];
        await firebaseService.getPokemon().then((pokemonList) => {
          pokemonListHtml = pokemonList.map((pokemon: Pokemon, idx: number) => {
            pokemon.icon_url = getPokemonIconUrl(pokemon);
            pokemon.first_type_colour = `var(--type_${pokemon.type[0]})`;
            pokemon.second_type_colour = pokemon.type[1] ? `var(--type_${pokemon.type[1]})` : pokemon.first_type_colour;
            return (<PokedexTile key={idx} pokemon={pokemon} />);
          });
        });

    return (
        <>
          <div className="centered">
              <h1>Pokedex</h1>
              <p>Click on a Pokemon to view its details.</p>
          </div>
          <div className="pokedex-container">
              {pokemonListHtml}
              {/* TODO Later: List vs tiles based on preference */}
          </div>
        </>
    )
}

function getPokemonIconUrl(pokemon: Pokemon) {
    let pokedex_number = pokemon.national_pokedex_number.toString().padStart(4, "0");
    if (pokemon.name.endsWith("-A") || pokemon.name.endsWith("-G")) {
        pokedex_number += "_01";
    }
    return `https://projectpokemon.org/images/sprites-models/sv-sprites-home/${pokedex_number}.png`;
}
