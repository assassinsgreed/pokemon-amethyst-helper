"use client";

import { Pokemon } from "@/models/pokemon";
import { firebaseService } from "@/services/firebase-service";
import PokedexTile from "./pokedex-tile";
import { getPokemonIconUrl } from "./pokedex-helpers";
import { useEffect, useState } from "react";

export default function PokedexContainer() {
    const [pokemonListHtml, setPokemonListHtml] = useState<React.ReactNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        firebaseService.getPokemon()
            .then((pokemonList) => {
                setPokemonListHtml(
                    pokemonList.map((pokemon: Pokemon, idx: number) => {
                        pokemon.icon_url = getPokemonIconUrl(pokemon);
                        pokemon.first_type_colour = `var(--type_${pokemon.type[0]})`;
                        pokemon.second_type_colour = pokemon.type[1] ? `var(--type_${pokemon.type[1]})` : pokemon.first_type_colour;
                        return (<PokedexTile key={idx} pokemon={pokemon} />);
                    })
                );
            })
            .catch((e) => {
                console.error("Error fetching Pokemon data:", e);
                setError("Failed to load Pokémon data. Please try again later.");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div className="centered">
                <h1>Pokedex</h1>
                <p>Click on a Pokemon to view its details.</p>
            </div>
            <div className="pokedex-container">
                {loading && <div className="centered">Loading...</div>}
                {error && <div className="centered" style={{color: 'red'}}>{error}</div>}
                {!loading && !error && pokemonListHtml}
            </div>
        </>
    );
}
