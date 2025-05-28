"use client";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { Pokemon } from "../../types/pokemon";

export default function PokedexModal({ pokemon, isOpen, onCloseAction }: { pokemon: Pokemon, isOpen: boolean, onCloseAction: () => void }) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onCloseAction}>
            <ModalContent>
                <ModalHeader>Pokemon Details</ModalHeader>
                <ModalBody>{pokemon.name}</ModalBody>
                <ModalFooter>Footer</ModalFooter>
            </ModalContent>
        </Modal>
    );
}