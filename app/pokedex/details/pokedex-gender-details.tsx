"use client";

export default function PokedexGenderDetails({ genderRatios }: { genderRatios: number[] }) {
    return (
        <div className="flex items-center">
            <h3>Gender Ratios:</h3>
            {genderRatios.length === 0 && <p className="ml-2">Genderless</p>}
            {genderRatios.length > 0 && genderRatios.map((gender, i) => (
                <span key={i} className={`ml-2 ${i === 0 ? "text-blue-400" : "text-red-400"}`}>
                    {gender}% {i === 0 ? "♂" : "♀"}
                </span>
            ))}
        </div>
    );
}
