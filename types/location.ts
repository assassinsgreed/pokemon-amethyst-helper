import { SpawnData } from "./spawn_data";

export interface Location {
    id: number; // Sort id
    name: string; // Location name
    grass: SpawnData | undefined;
    rocks: SpawnData | undefined;
    water: SpawnData | undefined;
    fish_old: SpawnData | undefined;
    fish_good: SpawnData | undefined;
    fish_super: SpawnData | undefined;
    static: SpawnData | undefined; // For gifts, trades, events, and legendary encounters
    isDayOnly: boolean | undefined; // If set, only appears during morning/day
    isNightOnly: boolean | undefined; // If set, only appears during evening/night
    notes: string | undefined; // Any extra notes to pay attention to
}