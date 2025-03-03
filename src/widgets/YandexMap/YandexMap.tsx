import {Map, YMaps} from "@pbe/react-yandex-maps";
import apiConfig from "../../shared/apiConfig.json";
import "./YandexMap.css";

export default function YandexMap() {
    const COORDINATES = [57.75, 37.57];
    const ZOOM = 9;

    return(
            <div className="map-container">
                <YMaps query={{apiKey: apiConfig.YandexApiKey}}>
                    <Map defaultState={{center: COORDINATES, zoom: ZOOM}} width={"100%"} height={"100%"} />
                </YMaps>
            </div>
    )
}