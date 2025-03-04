import {useContext} from "react";
import Cookies from "js-cookie";
import {AuthContext} from "../../app/App.tsx";
import {Nav} from "react-bootstrap";
import districts from "../../interfaces/district.ts";
import {PeopleFill} from "react-bootstrap-icons";

export default function Navigation () {
    const authContext = useContext(AuthContext);

    const logout = () => {
        Cookies.remove("token");
        localStorage.removeItem("loginName");
        authContext?.setIsAuthenticated(false);
        authContext?.setTokenData('');
    }

    return (
        <Nav defaultActiveKey="/home" className="flex-lg-column align-items-center">
            <h4>Красноярск</h4>
            {districts.map((district) => (
                <>
                    <Nav.Link onClick={() => console.log("Clicked")}>
                        {district.title}
                    </Nav.Link>
                </>
            ))}

            <br/>
            <div>
                <PeopleFill className="d-block m-auto"/>
                {authContext?.isAuthenticated
                    ? <>
                        <Nav.Link href="/profile">Профиль</Nav.Link>
                        <button onClick={() => {
                            logout()
                        }}>
                            Выйти
                        </button>
                    </>
                    : <>
                        <Nav.Link href="/register">Зарегистрироваться</Nav.Link>
                        <Nav.Link href="/login">Войти</Nav.Link>
                    </>
                }
            </div>



        </Nav>
    )
}