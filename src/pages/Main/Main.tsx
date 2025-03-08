import YandexMap from "../../widgets/YandexMap/YandexMap.tsx";
import Navigation from "../../widgets/Navigation/Navigation.tsx";
import "./Main.css";

export default function Main () {

    return (
        <>
            <section>
                <nav style={{background: 'linear-gradient(135deg, #99CCCC 0%, #2575fc 100%)'}}>
                    <Navigation/>
                </nav>
                <article>
                    <YandexMap />
                </article>
            </section>

        </>
    )
}