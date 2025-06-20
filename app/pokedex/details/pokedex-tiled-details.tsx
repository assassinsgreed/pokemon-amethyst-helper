"use client";
import { Card, CardHeader, CardBody } from "@heroui/react";

export default function PokedexTiledDetails({ label, value, url }: { label: string, value: string | number, url: string }) {
    return (
        <Card key={label} shadow="sm" className="w-30 h-24">
            <CardHeader className="font-bold text-center flex flex-col items-center justify-center">{label}:</CardHeader>
            <CardBody className="flex flex-col items-center justify-center">
                <a href={url} target="_blank" className="pokedex-url text-center">{value}</a>
            </CardBody>
        </Card>
    );
}