"use client";
import Image from "next/image";
import "../../../styles/pokedex/pokedex-modal.css";

export default function PokedexItemDetails({ items }: { items: string[] }) {
    return (
        <div className="flex items-center">
            <h3>Held Items:</h3>
            {items.filter(Boolean).length === 0 && <p className="ml-2">None</p>}
            {items.map((item, i) => (
                !!item && <div key={item} className="flex items-center ml-1.5">
                    <Image src={`/items/${item}.png`} alt={item} width={32} height={32} />
                    {getItemAnchorTag(item)}
                    {i === 0 ? " (50%)" : " (5%)"}
                </div>
            ))}
        </div>
    );
}

function getItemAnchorTag(item: string) {
    let formattedItemName = item.replace(" ", "_");
    if (formattedItemName === "Pearl") {
        formattedItemName = "Pearl_(item)";
    }

    return (
        <a
            href={`https://bulbapedia.bulbagarden.net/wiki/${formattedItemName}`}
            target="_blank"
            className="pokedex-url mr-1.5"
        >
            {item}
        </a>
    );
}
