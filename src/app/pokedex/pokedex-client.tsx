"use client";
import { Pokemon } from "@/models/pokemon";
import PokedexTile from "./pokedex-tile";
import { getPokemonIconUrl } from "./pokedex-helpers";

interface PokedexClientProps {
  pokemon: Pokemon[];
  error?: string | null;
  loading?: boolean;
}

export default function PokedexClient({ pokemon, error, loading = false }: PokedexClientProps) {
  let pageContent: React.ReactElement[] = [<div key="loading" className="centered">Loading...</div>];

  if (!loading) {
    if (error) {
      pageContent = [<div key="error" className="centered">An error occured while loading data: {error}</div>];
    } else if (pokemon.length === 0) {
      pageContent = [<div key="no_content" className="centered">No Pokemon found</div>];
    } else {
      pageContent = pokemon.map((pokemon: Pokemon, idx: number) => {
        pokemon.icon_url = getPokemonIconUrl(pokemon);
        pokemon.first_type_colour = `var(--type_${pokemon.type[0]})`;
        pokemon.second_type_colour = pokemon.type[1] ? `var(--type_${pokemon.type[1]})` : pokemon.first_type_colour;
        return (<PokedexTile key={idx} pokemon={pokemon} />);
      });
    }
  }

  return (
    <>
      <div className="centered">
        <h1>Pokedex</h1>
      </div>
      {!loading && <p>Click on a Pokemon to view its details.</p>}
      <div className="pokedex-container">
        {pageContent}
      </div>
    </>
  );
}
