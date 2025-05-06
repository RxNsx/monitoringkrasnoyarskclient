import './ServiceAddressTable.css'
import {useContext, useMemo, useState} from "react";
import {YandexMapContext} from "../../app/App.tsx";
import {GeoLocationData} from "../../interfaces/GeoLocationData.ts";


export default function ServiceAddressTable() {
    const yandexContext = useContext(YandexMapContext);
    const [geoLocationData, setGeoLocationData] = useState<GeoLocationData[] | undefined>();

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

    if(yandexContext && yandexContext.coords?.length == 0) {
        return <div>
            <h3>Выберите район с отключениями из навигационного меню</h3>
        </div>
    }

    return (
        <>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Тип отключения \ обслуживания</th>
                        <th>Адрес отключения</th>
                        <th>Время отключения</th>
                    </tr>
                        {yandexContext?.coords?.map(item =>
                            <tr>
                                <td>{item.serviceTypeName}</td>
                                <td>{item.address}</td>
                                <td>{item.dateFrom} - {item.dateTo}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}