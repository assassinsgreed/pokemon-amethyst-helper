"use client";
import { useState } from "react";
import PokedexTile from "./pokedex-tile";
import Search from "../../components/search";
import { Pokemon } from "../../types/pokemon";
import "../../styles/pokedex/pokedex-tile.css";

interface PokedexClientProps {
  pokemonList: Pokemon[];
  error: string | null;
}

export default function PokedexClient({ pokemonList, error }: PokedexClientProps) {
  const [search, setSearch] = useState("");
  const [list, setList] = useState<Pokemon[]>(pokemonList);

  const filteredList = list.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="centered min-w-8/10 mb-10">
        <h1 className="mb-10">Pokedex</h1>
        <Search onChangeAction={setSearch} />
      </div>
      <div className="pokedex-container">
        {error && <div className="centered" style={{ color: 'red' }}>{error}</div>}
        {!error && filteredList.map((pokemon, idx) => (
          <PokedexTile key={idx} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}
