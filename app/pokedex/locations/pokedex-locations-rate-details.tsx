import { Location } from "../../../types/location";

export default function PokedexLocationsRateDetails({ location }: { location: Location}) {
    let config = [
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
                <span className="text-right w-full block">{item.data.rate}%</span>
            )
            )}
        </div>
        </>
    )
}