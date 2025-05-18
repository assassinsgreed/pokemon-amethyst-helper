"use client";

import { firebaseService } from "@/services/firebase-service";
import PokedexTile from "./pokedex-tile";
import { Pokemon } from "@/models/pokemon";
import { getPokemonIconUrl } from "./pokedex-helpers";
import { useEffect, useState } from "react";

export default function PokedexContainer() {
    const [pokemonListHtml, setPokemonListHtml] = useState<React.ReactNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log("Setting up component");

    useEffect(() => {
        console.log("Fetching");
        firebaseService.getPokemon()
            .then((pokemonList) => {
                console.log("Fetched");
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
                console.log("Caught error");
                if (e instanceof Error) {
                    setError(`Error fetching Pokemon data: ${e.message}`);
                } else {
                    setError("Error fetching Pokemon data: Unknown error");
                }
            })
            .finally(() => {
                console.log("Finalizing loading");
                setLoading(false)
            });
    }, []);

    return (
        <>
            <div className="centered">
                <h1>Pokedex</h1>
                <p>Click on a Pokemon to view its details.</p>
            </div>
            <div className="pokedex-container">
                {loading && <div className="centered">Loading...</div>}
                {!loading && error && <div className="centered">{error}</div>}
                {!loading && !error && pokemonListHtml}
            </div>
        </>
    );
}
