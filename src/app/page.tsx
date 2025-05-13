import { Pokemon } from "@/models/pokemon";
import { firebaseService } from "@/services/firebase-service";
import PokedexTile from "./pokedex/pokedex-tile";

export default async function Home() {
  let pokemonListHtml: React.ReactNode[] = [];
  await firebaseService.getPokemon().then((pokemonList) => {
    pokemonListHtml = pokemonList.map((pokemon: Pokemon, idx: number) => (
      <PokedexTile key={idx} pokemon={pokemon} />
    ));
  });

  return (
    <>
    <div className="centered">
      <h1>Pokemon Amethyst Helper</h1>
      {/* TODO Later: this should be it's own component */}
      <div className="pokedex-container">
        {pokemonListHtml}
      </div>
      <p>TODO: Everything</p>
    </div>
    </>
  );
}
