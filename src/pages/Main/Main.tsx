import YandexMap from "../../widgets/YandexMap/YandexMap.tsx";
import Navigation from "../../widgets/Navigation/Navigation.tsx";
import "./Main.css";
import {useContext} from "react";
import {YandexMapContext} from "../../app/App.tsx";

export default function Main () {
    const yandexMapContext = useContext(YandexMapContext);

    return (
        <>
            <section>
                <nav>
                    <Navigation/>
                </nav>
                <article>
                    <YandexMap />
                </article>
            </section>

        </>
    )
}