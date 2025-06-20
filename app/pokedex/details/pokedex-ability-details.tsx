"use client";
import "../../../styles/pokedex/pokedex-modal.css";

export default function PokedexAbilityDetails({ abilities }: { abilities: string[] }) {
    return (
        <div className="flex items-center">
            <h3 className="mr-1.5">Abilities:</h3>
            {abilities
                .map((ability, i) => {
                    if (!ability) return null; // Some Pokemon do not have their second normal ability or hidden ability, so we skip those
                    return (
                        <span key={ability}>
                            {i === 1 && <span className="mx-1.5">/</span>}
                            {i === 2 ? (
                                <span className="ml-2.5">(Hidden: {GetAbilityAnchorTag(ability)})</span>
                            ) : (
                                GetAbilityAnchorTag(ability)
                            )}
                        </span>
                    );
                })}
        </div>
    );
}

function GetAbilityAnchorTag(ability: string) {
    return (
        <a
            href={`https://bulbapedia.bulbagarden.net/wiki/${ability}_(Ability)`}
            target="_blank"
            className="pokedex-ability-details"
        >
            {ability}
        </a>
    )
}
