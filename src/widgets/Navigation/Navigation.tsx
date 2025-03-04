import {useContext} from "react";
import Cookies from "js-cookie";
import {AuthContext} from "../../app/App.tsx";
import {Nav, Navbar} from "react-bootstrap";
import districts from "../../interfaces/district.ts";

export default function Navigation () {
    const authContext = useContext(AuthContext);

    const logout = () => {
        Cookies.remove("token");
        localStorage.removeItem("loginName");
        authContext?.setIsAuthenticated(false);
        authContext?.setTokenData('');
    }

    return (
            <Navbar className="bg-gradient" color="dark" expand="md">
                <Nav defaultActiveKey="/home" className="flex-column">
                    {districts.map((district) => (
                        <>
                            <Nav.Link onClick={() => console.log("Clicked")}>
                                {district.title}
                            </Nav.Link>
                        </>
                    ))}

                    {authContext?.isAuthenticated
                        ? <>
                            <Nav.Link href="/profile">Профиль</Nav.Link>
                            <button onClick={() => {logout()}}>Выйти</button>
                        </>
                        : <>
                            <Nav.Link href="/register">Зарегистрироваться</Nav.Link>
                            <Nav.Link href="/login">Войти</Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar>
    )
}