import './ServiceAddressTable.css'
import {useContext} from "react";
import {YandexMapContext} from "../../app/App.tsx";


export default function ServiceAddressTable() {
    const yandexContext = useContext(YandexMapContext);

    if(!yandexContext?.coords){
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
                                {/*<td>Широта: {item.latitude} Долгота: {item.longtitude}</td>*/}
                                <td>03 мая 11-25 - 03 мая 16:00</td>
                            </tr>
                        )}
                    <tr>
                    <td>Холодное водоснабжение</td>
                        <td>Калинина 80</td>
                        <td>03 мая 11-25 - 03 мая 16:00</td>
                    </tr>
                    <tr>
                        <td>Холодное водоснабжение</td>
                        <td>Киренского 80ст1</td>
                        <td>03 мая 11-25 - 03 мая 16:00</td>
                    </tr>
                    <tr>
                        <td>Холодное водоснабжение</td>
                        <td>Киренского Калинина 80ст2</td>
                        <td>03 мая 11-25 - 03 мая 16:00</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}