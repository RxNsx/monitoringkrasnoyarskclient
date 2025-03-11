import {Link} from "react-router-dom";

export default function ErrorPage() {
    return (
        <>
            <h1>Такой страницы не существует</h1>
            <p>Пожалуйста сообщите об ошибке по следующему электронному адресу alpendev@mail.ru</p>
            <Link to="/">
                Вернуться на главную страницу
            </Link>
        </>
    )
}