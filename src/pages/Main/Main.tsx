import YandexMap from "../../widgets/YandexMap/YandexMap.tsx";
import Navigation from "../../widgets/Navigation/Navigation.tsx";
import "./Main.css";

export default function Main () {
    return (
        <>
            <section>
                <nav>
                    <Navigation/>
                </nav>
                <article>
                    <YandexMap/>
                </article>
            </section>

        </>
    )
}