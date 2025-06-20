"use client";
import "../../../styles/pokedex/pokedex-modal.css";

export default function PokedexTypeDetails({ types, typeColours }: { types: string[], typeColours: string[] }) {
    return (
        <div className="flex items-center">
            <h3>Types:</h3>
            {types.map((type, i) => (
                !!type && <div key={type} className="pokedex-type-details" style={{ backgroundColor: typeColours[i] }}>{type}</div>
            ))}
        </div>
    );
}
