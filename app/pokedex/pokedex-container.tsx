"use client";
import { useCallback, useMemo, useState } from "react";
import PokedexTile from "./pokedex-tile";
import Search from "../../components/search";
import { Pokemon } from "../../types/pokemon";
import PokedexModal from "./pokedex-modal";
import "../../styles/pokedex/pokedex-tile.css";
import PageHeader from "../../components/page-header";

export default function PokedexContainer({ pokemonList, error }: { pokemonList: Pokemon[]; error: string | null }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handleSearchChange = useCallback((query: string) => setSearch(query), []);

  const filteredList = useMemo(
    () => pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    ),
    [pokemonList, search]
  );

  const handleTileClick = useCallback((pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setModalOpen(true);
  }, []);

  const handleModalCloseAction = useCallback(() => {
    setModalOpen(false);
    setSelectedPokemon(null);
  }, []);

  return (
    <>
      <PageHeader title="Pokedex" />
      <div className="flex flex-col items-center mx-auto max-w-5xl mb-10">
        <Search onChangeAction={handleSearchChange} />
      </div>
      <div className="pokedex-container">
        {error && <div className="centered" style={{ color: 'red' }}>{error}</div>}
        {!error && !!filteredList.length && filteredList.map((pokemon, idx) => (
          <PokedexTile key={idx} pokemon={pokemon} onPokemonClicked={() => handleTileClick(pokemon)} />
        ))}
        {!error && filteredList.length === 0 && <div className="centered">No Pokémon found</div>}
      </div>
      {selectedPokemon && (
        <PokedexModal
          pokemon={selectedPokemon}
          isOpen={modalOpen}
          onCloseAction={handleModalCloseAction}
        />
      )}
    </>
  );
}
