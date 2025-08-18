import { Tooltip } from "@heroui/react";
import { Location } from "../../../types/location";
import Image from "next/image";

export default function PokedexLocationsTypeDetails({ location }: { location: Location}) {
    let config = [
        {where: location.grass, img: `/locations/Grass.png`, desc: "tall grass"},
        {where: location.rocks, img: `/locations/Rocks.png`, desc: "breakable rocks"},
        {where: location.water, img: `/locations/Water.png`, desc: "water while surfing"},
        {where: location.fish_old, img: `/locations/Fish_Old.png`, desc: "water while fishing (old rod)"},
        {where: location.fish_good, img: `/locations/Fish_Good.png`, desc: "water while fishing (good rod)"},
        {where: location.fish_super, img: `/locations/Fish_Super.png`, desc: "water while fishing (super rod)"},
        {where: location.static, img: `locations/Static.png`, desc: "specific places"}
    ]

    return (
        <>
        <div className="flex flex-col items-center gap-2">
            {config.map((item, idx) =>
                !!item.where && (
                    <Tooltip key={idx} content={`Found in ${item.desc}`}>
                        <Image src={item.img} alt={item.desc} width={24} height={24} />
                    </Tooltip>
                )
            )}
        </div>
        </>
    )
}