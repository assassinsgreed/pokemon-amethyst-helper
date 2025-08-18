import { Tooltip } from "@heroui/react";
import Image from "next/image";

export default function PokedexLocationsDNSDetails({ isDayOnly, isNightOnly}: { isDayOnly: boolean | undefined, isNightOnly: boolean | undefined}) {
    let config = [
        {when: !!isNightOnly == false, times: "4AM and 5PM", img: `/locations/DNSDay.png`},
        {when: !!isDayOnly == false, times: "5PM and 4AM", img: `locations/DNSNight.png`}
    ];
    
    return (
        <>
            <div className="flex items-center gap-2">
                {config.map((item, idx) =>
                    !!item.when && (
                        <Tooltip key={idx} content={`Found between ${item.times}`}>
                            <Image src={item.img} alt={item.times.includes("AM") ? "Day" : "Night"} width={24} height={24} />
                        </Tooltip>
                    )
                )}
            </div>
        </>
    )
}