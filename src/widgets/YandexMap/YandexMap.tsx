import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import apiConfig from "../../shared/apiConfig.json";
import "./YandexMap.css";
import {useContext, useMemo, useState} from "react";
import {YandexMapContext} from "../../app/App.tsx";
import {GeoLocationData} from "../../interfaces/GeoLocationData.ts";

export default function YandexMap() {
    const yandexContext = useContext(YandexMapContext);
    const [geoLocationData, setGeoLocationData] = useState<GeoLocationData[] | undefined>();

    const COORDINATES = [56.02, 92.78];
    const ZOOM = 10;

    //Получить цвет по типу сервисного обслуживания
    const getColorByServiceTypeName = (serviceTypeName : string) : string => {
        switch(serviceTypeName) {
            case "Теплоснабжение":
                return 'red';
            case "Холодное водоснабжение":
                return 'darkblue';
            case "Электроснабжение":
                return 'lightblue';
            default:
                return 'gray';
        }
    }

    useMemo(() => {
        const geoData = localStorage.getItem("geoLocationData");
        if(geoData && geoData.length > 0) {
            setGeoLocationData(JSON.parse(geoData));
        }
    }, []);


    if(yandexContext && !yandexContext.coords && geoLocationData && geoLocationData.length > 0) {
        console.log("HERE");
        yandexContext.coords = geoLocationData;
    }

    return(
            <div className="map-container">
                <YMaps query={{apikey: apiConfig.YandexApiKey}}>
                    <Map defaultState={{center: COORDINATES, zoom: ZOOM}} width={"100%"} height={"65vh"}>
                        {yandexContext!.coords && yandexContext!.coords.map((item : GeoLocationData) => (
                            <div>
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