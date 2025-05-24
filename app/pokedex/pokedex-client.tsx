"use client";
import { useCallback, useState, useMemo } from "react";
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
  const [list] = useState<Pokemon[]>(pokemonList);

  const handleSearchChange = useCallback((query: string) => setSearch(query), []);

  const filteredList = useMemo(
    () => list.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    ),
    [list, search]
  );

  return (
    <>
      <div className="centered min-w-6/10 mb-10">
        <h1 className="mb-10">Pokedex</h1>
        <Search onChangeAction={handleSearchChange} />
      </div>
      <div className="pokedex-container">
        {error && <div className="centered" style={{ color: 'red' }}>{error}</div>}
        {!error && !!filteredList.length && filteredList.map((pokemon, idx) => (
          <PokedexTile key={idx} pokemon={pokemon} />
        ))}
        {!error && filteredList.length === 0 && <div className="centered">No Pokémon found</div>}
      </div>
    </>
  );
}
