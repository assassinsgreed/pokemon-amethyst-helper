import Image from "next/image";
import { Pokemon } from "@/models/pokemon";
import styles from "./pokedex-tile.module.css";

export default function PokedexTile({ pokemon }: { pokemon: Pokemon }) {
    const iconUrl = `https://projectpokemon.org/images/sprites-models/sv-sprites-home/${pokemon.national_pokedex_number.toString().padStart(4, "0")}.png`;
    const firstTypeColourVar = `var(--type_${pokemon.type[0]})`;
    const secondTypeColourVar = pokemon.type[1] ? `var(--type_${pokemon.type[1]})` : firstTypeColourVar;

    return (
        <div
            className={styles["pokedex-tile"]}
            style={{ backgroundImage: `linear-gradient(to bottom right, ${firstTypeColourVar}, ${secondTypeColourVar})` }}
        >
            <Image
                src={iconUrl}
                alt={pokemon.name}
                width={48}
                height={48}
                className={styles["pokedex-tile__icon"]} />
            <b>{pokemon.name}</b>
        </div>
    );   
}