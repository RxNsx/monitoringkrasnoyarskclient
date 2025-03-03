import {Map, YMaps} from "@pbe/react-yandex-maps";

export default function YandexMap() {
    const COORDINATES = [57.75, 37.57];
    const ZOOM = 9;

    return(
            <>
                <YMaps>
                    <Map defaultState={{center: COORDINATES, zoom: ZOOM}} />
                </YMaps>
            </>
    )
}