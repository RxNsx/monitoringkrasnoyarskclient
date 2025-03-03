import Navbar from "../../widgets/Navbar/Navbar.tsx";
import {useContext} from "react";
import {AuthContext} from "../../app/App.tsx";
import YandexMap from "../../widgets/YandexMap/YandexMap.tsx";

export default function Main () {
    const authContext = useContext(AuthContext);

    return (
        <div>
            <h1>Hello Main Page</h1>
            <YandexMap />
            <h2>{`Hello ${authContext?.token}`}</h2>
            <Navbar/>
        </div>
    )
}