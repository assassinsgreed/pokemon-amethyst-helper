"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs } from "@heroui/react";
import { Pokemon } from "../../types/pokemon";
import PokedexDetailsBody from "./details/pokedex-details-body";
import PokedexLocationsBody from "./locations/pokedex-locations-body";


export default function PokedexModal({ pokemon, isOpen, onCloseAction }: { pokemon: Pokemon, isOpen: boolean, onCloseAction: () => void }) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onCloseAction} size="3xl">
            <ModalContent className="min-h-[868px] max-h-[868px]">
                <ModalHeader>
                    #{pokemon.kulure_pokedex_number} - {pokemon.name}
                </ModalHeader>
                <ModalBody>
                    <Tabs variant="underlined" size="lg">
                    <Tab key="details" title="Details">
                        <PokedexDetailsBody pokemon={pokemon} />
                    </Tab>
                    <Tab key="locations" title="Locations">
                        <PokedexLocationsBody pokemon={pokemon} />
                    </Tab>
                    </Tabs>
                </ModalBody>
                <ModalFooter>
                    <Button variant="solid" color="primary" onPress={onCloseAction}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}