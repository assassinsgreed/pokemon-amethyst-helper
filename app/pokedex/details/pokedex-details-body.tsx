"use client";

import Image from "next/image";
import PokedexTypeDetails from "./pokedex-type-details";
import PokedexAbilityDetails from "./pokedex-ability-details";
import PokedexBaseStatsDetails from "./pokedex-base-stats-details";
import PokedexItemDetails from "./pokedex-item-details";
import PokedexGenderDetails from "./pokedex-gender-details";
import PokedexTiledDetails from "./pokedex-tiled-details";
import PokedexEggGroupDetails from "./pokedex-egg-groups-details";
import PokedexEvYieldDetails from "./pokedex-ev-yield-details";
import { Pokemon } from "../../../types/pokemon";

export default function PokedexDetailsBody({ pokemon }: { pokemon: Pokemon }) {
  return (
    <>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col items-center">
          <Image
            src={pokemon.full_image}
            alt={pokemon.name}
            width={192}
            height={192}
            priority
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <PokedexTypeDetails types={pokemon.type} typeColours={pokemon.type_colours} />
          <PokedexAbilityDetails abilities={pokemon.abilities} />
          <PokedexItemDetails items={pokemon.items} />
          <PokedexGenderDetails genderRatios={pokemon.gender_ratio} />
          <PokedexEggGroupDetails eggGroups={pokemon.egg_groups} />
        </div>
      </div>
      <div className="flex flex-row gap-6 mt-6">
        <PokedexEvYieldDetails evYield={pokemon.ev_yield} />
        <div className="flex-1 ml-2.5">
          <PokedexBaseStatsDetails baseStats={pokemon.base_stats} />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <PokedexTiledDetails
          label="Catch Rate"
          value={pokemon.catch_rate}
          url="https://bulbapedia.bulbagarden.net/wiki/Catch_rate"
        />
        <PokedexTiledDetails
          label="Exp. Yield"
          value={pokemon.exp_yield}
          url="https://bulbapedia.bulbagarden.net/wiki/Experience#Relation_to_level"
        />
        <PokedexTiledDetails
          label="Egg Cycles"
          value={pokemon.egg_cycles}
          url="https://bulbapedia.bulbagarden.net/wiki/Egg_cycle"
        />
        <PokedexTiledDetails
          label="Friendship"
          value={pokemon.friendship}
          url="https://bulbapedia.bulbagarden.net/wiki/Friendship"
        />
      </div>
    </>
  );
}
