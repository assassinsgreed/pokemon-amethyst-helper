export interface Pokemon {
    national_pokedex_number: number;
    kulure_pokedex_number: number;
    name: string;
    type: string[];
    abilities: string[];
    base_stats: number[]; // [hp, attack, defense, specialAttack, specialDefense, speed]
}