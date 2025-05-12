import { Pokemon } from "@/models/pokemon";
import "./pokedex-tile.css";

export default function PokedexTile({ pokemon }: { pokemon: Pokemon }) {
    let iconUrl = `https://projectpokemon.org/images/sprites-models/sv-sprites-home/${pokemon.national_pokedex_number.toString().padStart(4, "0")}.png`;
    let type1CSS = `var(--type_${pokemon.type[0]})`;
    let type2CSS = pokemon.type[1] ? `var(--type_${pokemon.type[1]})` : type1CSS;

    return (
        <div
            className="pokedex-tile"            
            style={{ backgroundImage: `linear-gradient(to bottom right, ${type1CSS}, ${type2CSS})` }}
        >
            <img src={iconUrl} alt={pokemon.name} className="pokedex-tile__icon" />
            <b>{pokemon.name}</b>
        </div>
    );   
}