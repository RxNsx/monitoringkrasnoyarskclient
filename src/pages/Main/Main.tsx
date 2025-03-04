import {useContext} from "react";
import {AuthContext} from "../../app/App.tsx";
import YandexMap from "../../widgets/YandexMap/YandexMap.tsx";
import Navigation from "../../widgets/Navigation/Navigation.tsx";

export default function Main () {
    const authContext = useContext(AuthContext);

    return (
        <div>
            <h1>Hello Main Page</h1>
            <YandexMap />
            <h2>{`Hello ${authContext?.token}`}</h2>
            <Navigation/>
        </div>
    )
}