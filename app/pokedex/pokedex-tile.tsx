import Image from "next/image";
import { Pokemon } from "../../types/pokemon";

export default function PokedexTile({ pokemon, onPokemonClicked }: { pokemon: Pokemon; onPokemonClicked?: () => void }) {
    return (
        <div
            className="pokedex-tile"
            onClick={onPokemonClicked}
            style={{ cursor: onPokemonClicked ? 'pointer' : undefined, backgroundImage: `linear-gradient(to bottom right, ${pokemon.first_type_colour}, ${pokemon.second_type_colour}) ` }}
        >
            <span className="pokedex-tile__number">{pokemon.kulure_pokedex_number}</span>
            <div className="pokedex-tile__contents">
                <Image
                    src={pokemon.icon_url}
                    alt={pokemon.name}
                    width={68}
                    height={68}
                    className="pokedex-tile__icon" />
                <b>{pokemon.name}</b>
            </div>
        </div>
    );   
}