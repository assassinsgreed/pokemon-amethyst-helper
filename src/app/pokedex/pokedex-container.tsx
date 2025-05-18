"use client";

import { Pokemon } from "@/models/pokemon";
import { firebaseService } from "@/services/firebase-service";
import PokedexClient from "./pokedex-client";
import { useEffect, useState } from "react";

export default function PokedexContainer() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebaseService.getPokemon()
            .then(setPokemon)
            .catch((e) => {
                if (e instanceof Error) {
                    setError(`Error fetching Pokemon data: ${e.message}`);
                } else {
                    setError("Error fetching Pokemon data: Unknown error");
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return <PokedexClient pokemon={pokemon} error={error} loading={loading} />;
}
