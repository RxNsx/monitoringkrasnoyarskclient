import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import apiConfig from "../../shared/apiConfig.json";
import "./YandexMap.css";
import {useContext} from "react";
import {YandexMapContext} from "../../app/App.tsx";
import {GeoLocationData} from "../../interfaces/GeoLocationData.ts";

export default function YandexMap() {
    const yandexMapContext = useContext(YandexMapContext);

    const COORDINATES = [56.02, 92.78];
    const ZOOM = 9;


    return(
            <div className="map-container">
                <YMaps query={{apiKey: apiConfig.YandexApiKey}}>
                    <Map defaultState={{center: COORDINATES, zoom: ZOOM}} width={"100%"} height={"100vh"}>
                        {yandexMapContext!.coords && yandexMapContext!.coords.map((item : GeoLocationData) => (
                            <div>
                                <h1>{item.latitude}</h1>
                                <h1>{item.longtitude}</h1>
                                <Placemark geometry={[item.latitude, item.longtitude]} />
                            </div>
                        ))}
                    </Map>
                </YMaps>
            </div>
    )
}