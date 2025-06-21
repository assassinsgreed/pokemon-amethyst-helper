"use client";

export default function PokedexEvYieldDetails({ evYield }: { evYield: number[] }) {
    const statName = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"];
    const statColours = [
        "bg-green-700",    // HP
        "bg-yellow-700",   // Attack
        "bg-orange-700",   // Defense
        "bg-cyan-700",     // Sp. Attack
        "bg-purple-700",   // Sp. Defense (lavender)
        "bg-pink-700"      // Speed
    ];

    return (
        <div className="flex flex-col items-center max-w-[192px] min-h-[312px]">
            <h3 className="mr-1.5 mb-2 self-start">EV Yield:</h3>
            <div className="grid grid-cols-2 grid-rows-3 gap-6">
                {evYield.map((value, i) => (
                    <div
                        key={statName[i]}
                        className={`flex flex-col items-center justify-center w-20 h-16 text-center shadow text-xs rounded-md ${
                            statColours[i]
                        }`}
                    >
                        <div className="font-semibold">{statName[i]}</div>
                        <div className="text-base">{value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}