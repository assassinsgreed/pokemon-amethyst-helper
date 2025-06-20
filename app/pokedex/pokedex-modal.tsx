"use client";
import Image from "next/image";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { Pokemon } from "../../types/pokemon";
import PokedexTypeDetails from "./details/pokedex-type-details";
import PokedexAbilityDetails from "./details/pokedex-ability-details";
import PokedexBaseStatsDetails from "./details/pokedex-base-stats-details";
import PokedexItemDetails from "./details/pokedex-item-details";
import PokedexGenderDetails from "./details/pokedex-gender-details";
import PokedexTiledDetails from "./details/pokedex-tiled-details";
import PokedexEggGroupDetails from "./details/pokedex-egg-groups-details";

export default function PokedexModal({ pokemon, isOpen, onCloseAction }: { pokemon: Pokemon, isOpen: boolean, onCloseAction: () => void }) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onCloseAction} size="lg">
            <ModalContent>
                <ModalHeader>#{pokemon.kulure_pokedex_number} - {pokemon.name} Details</ModalHeader>
                <ModalBody>
                    <Image
                        src={pokemon.full_image}
                        alt={pokemon.name}
                        width={192}
                        height={192}
                        priority
                        unoptimized
                    />
                    <PokedexTypeDetails types={pokemon.type} typeColours={pokemon.type_colours} />
                    <PokedexAbilityDetails abilities={pokemon.abilities} />
                    <PokedexItemDetails items={pokemon.items} />
                    <PokedexGenderDetails genderRatios={pokemon.gender_ratio} />
                    <PokedexEggGroupDetails eggGroups={pokemon.egg_groups} />
                    <PokedexBaseStatsDetails baseStats={pokemon.base_stats} />
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        <PokedexTiledDetails label="Catch Rate" value={pokemon.catch_rate} url="https://bulbapedia.bulbagarden.net/wiki/Catch_rate" />
                        <PokedexTiledDetails label="Exp. Yield" value={pokemon.exp_yield} url="https://bulbapedia.bulbagarden.net/wiki/Experience#Relation_to_level" />
                        <PokedexTiledDetails label="Egg Cycles" value={pokemon.egg_cycles} url="https://bulbapedia.bulbagarden.net/wiki/Egg_cycle" />
                        <PokedexTiledDetails label="Friendship" value={pokemon.friendship} url="https://bulbapedia.bulbagarden.net/wiki/Friendship" />
                    </div>
                </ModalBody>
                <ModalFooter>Footer</ModalFooter>
            </ModalContent>
        </Modal>
    );
}