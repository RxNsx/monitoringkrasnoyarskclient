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
                                <td>{item.dateFrom} - {item.dateTo}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}