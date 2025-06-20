"use client";

export default function PokedexEggGroupDetails({ eggGroups }: { eggGroups: string[] }) {
    return (
        <div className="flex items-center">
            <h3 className="mr-1.5">Egg Groups:</h3>
            {eggGroups.map((group, i) => {
                return (
                    <span key={group}>
                        {i > 0 && <span className="mx-1.5"> and </span>}
                        {group !== "Undiscovered" ? (
                            <a
                                href={`https://bulbapedia.bulbagarden.net/wiki/${group.replace(" ", "_")}_(Egg_Group)`}
                                target="_blank"
                                className="pokedex-url text-center"
                                rel="noopener noreferrer"
                            >
                                {group}
                            </a>
                        ) : <span>{group}</span>
                        }
                    </span>
                );
            })}
        </div>
    );
}