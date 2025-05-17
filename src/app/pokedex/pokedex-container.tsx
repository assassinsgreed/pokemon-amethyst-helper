import { Pokemon } from "@/models/pokemon";
import { firebaseService } from "@/services/firebase-service";
import PokedexClient from "./pokedex-client";

export default async function PokedexContainer() {
    let pokemon: Pokemon[] = [];
    let error: string | null = null;

    try {
        pokemon = await firebaseService.getPokemon();
    } catch (e) {
        if (e instanceof Error) {
            error = `Error fetching Pokemon data: ${e.message}`;
        } else {
            error = "Error fetching Pokemon data: Unknown error";
        }
        console.error(error);
    }

    return <PokedexClient pokemon={pokemon} error={error} />;
}
