"use client";
import React from "react";

const STAT_META = [
    { name: "HP", color: "bg-green-700" },
    { name: "Attack", color: "bg-yellow-700" },
    { name: "Defense", color: "bg-orange-700" },
    { name: "Sp. Attack", color: "bg-cyan-700" },
    { name: "Sp. Defense", color: "bg-purple-700" },
    { name: "Speed", color: "bg-pink-700" },
];

type PokedexEvYieldDetailsProps = {
    evYield: number[];
};

const PokedexEvYieldDetails: React.FC<PokedexEvYieldDetailsProps> = ({ evYield }) => (
    <section className="flex flex-col items-center max-w-[192px] min-h-[312px]" aria-label="EV Yield Details">
        <h3 className="mr-1.5 mb-2 self-start">EV Yield:</h3>
        <div className="grid grid-cols-2 grid-rows-3 gap-6 mt-4">
            {STAT_META.map(({ name, color }, i) => (
                <div
                    key={name}
                    className={`flex flex-col items-center justify-center w-20 h-16 text-center shadow text-xs rounded-md ${color}`}
                >
                    <div className="font-semibold">{name}</div>
                    <div className="text-base">{evYield?.[i] ?? 0}</div>
                </div>
            ))}
        </div>
    </section>
);

export default PokedexEvYieldDetails;