import { Location } from "../../../types/location";

export default function PokedexLocationsLevelsDetails({ location }: { location: Location}) {
    const config = [
        {data: location.grass},
        {data: location.rocks},
        {data: location.water},
        {data: location.fish_old},
        {data: location.fish_good},
        {data: location.fish_super},
        {data: location.static}
    ]

    return (
        <>
        <div className="flex flex-col items-center gap-2">
            {config.map((item) =>
            !!item.data && (
                <span key="item.data" className="text-right w-full block">{item.data.levels[0]} - {item.data.levels[1]}</span>
            )
            )}
        </div>
        </>
    )
}