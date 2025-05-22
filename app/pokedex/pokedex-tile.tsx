import Image from "next/image";
import { Pokemon } from "../../types/pokemon";

export default function PokedexTile({ pokemon }: { pokemon: Pokemon }) {
    return (
        <div
            className="pokedex-tile"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${pokemon.first_type_colour}, ${pokemon.second_type_colour}) ` }}
        >
            <Image
                src={pokemon.icon_url}
                alt={pokemon.name}
                width={68}
                height={68}
                className="pokedex-tile__icon" />
            <b>{pokemon.name}</b>
        </div>
    );   
}