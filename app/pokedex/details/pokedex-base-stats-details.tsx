"use client";
import {Table, TableBody, TableRow, TableColumn, TableCell, TableHeader} from "@heroui/react";
import "../../../styles/pokedex/pokedex-modal.css";

const STAT_LABELS = [
    "HP",
    "Attack",
    "Defense",
    "Sp. Attack",
    "Sp. Defense",
    "Speed",
];

export default function PokedexBaseStatsDetails({ baseStats }: { baseStats: number[] }) {
    return (
        <div className="flex flex-col">
            <h3 className="mr-1.5">Base Stats:</h3>
            <Table hideHeader shadow="none">
                <TableHeader>
                    <TableColumn>Stat Name</TableColumn>
                    <TableColumn>Value</TableColumn>
                    <TableColumn>Visualization</TableColumn>
                </TableHeader>
                <TableBody>
                    <>
                        {STAT_LABELS.map((label, idx) => (
                            <TableRow key={label}>
                                <TableCell className="text-right w-26">{label}</TableCell>
                                <TableCell className="text-right w-6">{baseStats[idx]}</TableCell>
                                <TableCell>
                                    <div
                                        className="pokedex-stat-bar"
                                        style={{
                                            width: `${baseStats[idx] / 2}%`,
                                            backgroundColor: computeStatsBarColour(baseStats[idx]),
                                        }}
                                    ></div>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow key="Total">
                            <TableCell className="text-right w-26">Total</TableCell>
                            <TableCell className="text-right w-6">{baseStats.reduce((a, b) => a + b, 0)}</TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </>
                </TableBody>
            </Table>
        </div>
    );
}

function computeStatsBarColour(stat: number): string {
    if (stat <= 29) return "#ff0000"; // Red for low stats
    if (stat <= 59) return "#ff8000"; // Orange for medium-low stats
    if (stat <= 89) return "#ffff00"; // Yellow for medium stats
    if (stat <= 119) return "#00ff00"; // Green for medium-high stats
    if (stat <= 149) return "#00ffff"; // Cyan for high stats
    return "#0074cc"; // Blue for very high stats
}
