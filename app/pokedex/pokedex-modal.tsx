"use client";
import Image from "next/image";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { Pokemon } from "../../types/pokemon";
import PokedexTypeDetails from "./details/pokedex-type-details";
import PokedexAbilityDetails from "./details/pokedex-ability-details";
import PokedexBaseStatsDetails from "./details/pokedex-base-stats-details";
import PokedexItemDetails from "./details/pokedex-item-details";

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
                    <p>Gender Ratio: {pokemon.gender_ratio[0]} Male {pokemon.gender_ratio[1]}</p>
                    <PokedexBaseStatsDetails baseStats={pokemon.base_stats} />
                    <p>Catch Rate: {pokemon.catch_rate}</p>
                    <p>Exp Yield: {pokemon.exp_yield}</p>
                    {/* TODO later: get icon(s) using url like: https://img.pokemondb.net/sprites/items/ability-capsule.png */}
                    <p>Egg Groups: {pokemon.egg_groups}</p>
                    <p>Egg Cycles: {pokemon.egg_cycles}</p>
                    <p>Friendship: {pokemon.friendship}</p>
                    <p>Growth Rate: {pokemon.growth_rate}</p>
                </ModalBody>
                <ModalFooter>Footer</ModalFooter>
            </ModalContent>
        </Modal>
    );
}