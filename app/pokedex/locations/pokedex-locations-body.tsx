"useclient"

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { Pokemon } from "../../../types/pokemon";
import PokedexLocationsDNSDetails from "./pokedex-locations-dns-details";
import PokedexLocationsTypeDetails from "./pokedex-locations-type-details";
import PokedexLocationsLevelsDetails from "./pokedex-locations-levels-details";
import PokedexLocationsRateDetails from "./pokedex-locations-rate-details";

export default function PokedexLocationsBody({ pokemon }: { pokemon: Pokemon }) {
    return (
        <>
        <Table isStriped className="min-h-[620] max-h-[620] overflow-auto">
            <TableHeader>
                <TableColumn>Location Name</TableColumn>
                <TableColumn>When</TableColumn>
                <TableColumn align="center">Type</TableColumn>
                <TableColumn align="end">Levels</TableColumn>
                <TableColumn align="end">Rate</TableColumn>
                <TableColumn>Notes</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Not found in the wild">
                {pokemon.locations?.map((location, idx) => (
                    <TableRow key={idx}>
                        <TableCell className="font-bold">{location.name}</TableCell>
                        <TableCell>
                            <PokedexLocationsDNSDetails isDayOnly={location.isDayOnly} isNightOnly={location.isNightOnly} />
                        </TableCell>
                        <TableCell>
                            <PokedexLocationsTypeDetails location={location} />
                        </TableCell>
                        <TableCell>
                            <PokedexLocationsLevelsDetails location={location} />
                        </TableCell>
                        <TableCell>
                            <PokedexLocationsRateDetails location={location} />
                        </TableCell>
                        <TableCell className="text-xs">{location.notes}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    )
}