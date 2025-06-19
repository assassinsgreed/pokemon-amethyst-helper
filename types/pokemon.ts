export interface Pokemon {
    // Presentation
    icon_url: string; // Programmatically constructed based on form (eg. "001" for Bulbasaur, or "026_01" for Alolan Raichu)
    first_type_colour: string; // CSS variable for the first type colour (eg. "var(--type_grass)")
    second_type_colour: string; // CSS variable for the second type colour (eg. "var(--type_electric)")

    // Data
    national_pokedex_number: number;
    kulure_pokedex_number: number;
    name: string;
    type: string[];
    abilities: string[];
    base_stats: number[]; // [hp, attack, defense, specialAttack, specialDefense, speed]
    catch_rate: number;
    exp_yield: number;
    items: string[]; // First (if any) is 50%, second (if any) is 5%
    gender_ratio: number[]; // [Male %, Female %], or genderless if empty
    egg_cycles: number;
    friendship: number;
    growth_rate: string;
    egg_groups: string[]; // 1-2 entry array
}