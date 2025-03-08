import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import apiConfig from "../../shared/apiConfig.json";
import "./YandexMap.css";
import {useContext} from "react";
import {YandexMapContext} from "../../app/App.tsx";
import {GeoLocationData} from "../../interfaces/GeoLocationData.ts";

export default function YandexMap() {
    const yandexMapContext = useContext(YandexMapContext);

    const COORDINATES = [56.02, 92.78];
    const ZOOM = 10;

    //Получить цвет по типу сервисного обслуживания
    const getColorByServiceTypeName = (serviceTypeName : string) : string => {
        console.log(serviceTypeName);

        switch(serviceTypeName) {
            case "Теплоснабжение":
                return 'red';
            case "Холодное водоснабжение":
                return 'darkblue';
            case "Электроснабжение":
                console.log("blue")
                return 'lightblue';
            default:
                return 'gray';
        }
    }

    const getIconByServiceTypeName = (serviceTypeName : string) => {
        switch(serviceTypeName) {
            case "Теплоснабжение":
                return 'red';
            case "Холодное водоснабжение":
                return 'darkblue';
            case "Электроснабжение":
                console.log("blue")
                return 'lightblue';
            default:
                return 'gray';
        }
    }

    return(
            <div className="map-container">
                <YMaps query={{apiKey: apiConfig.YandexApiKey}}>
                    <Map defaultState={{center: COORDINATES, zoom: ZOOM}} width={"100%"} height={"100vh"}>
                        {yandexMapContext!.coords && yandexMapContext!.coords.map((item : GeoLocationData) => (
                            <div>
                                <h1>{item.latitude}</h1>
                                <h1>{item.longtitude}</h1>
                                <Placemark
                                    geometry={[item.latitude, item.longtitude]}
                                    properties={{
                                        iconCaption: `${item.address}`,
                                        hintContent: ``
                                    }}
                                    options={{
                                        preset: 'islands#redcircleDotIcon',
                                        iconColor: getColorByServiceTypeName(item.serviceTypeName),
                                    }}
                                />
                            </div>
                        ))}
                    </Map>
                </YMaps>
            </div>
    )
}