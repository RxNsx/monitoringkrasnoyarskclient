import districts from "../../interfaces/district.ts";
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import Cookies from "js-cookie";
import {AuthContext} from "../../app/App.tsx";
import { Button } from "react-bootstrap";

export default function Navigation () {
    const authContext = useContext(AuthContext);

    const logout = () => {
        Cookies.remove("token");
        localStorage.removeItem("loginName");
        authContext?.setIsAuthenticated(false);
        authContext?.setTokenData('');
    }

    return (
        <>
            <table>
                <tbody>
                    {districts.map((district, index) => (
                        <tr key={index}>
                            <td>{district.id}</td>
                            <td onClick={() => console.log(`clicked ${district.title}`)}>
                                {district.title}
                            </td>
                            <td>
                                <Button variant="light" size="lg">
                                    {district.title}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {authContext?.isAuthenticated
                ? <>
                    <NavLink to="/profile">Профиль</NavLink>
                    <button onClick={() => {logout()}}>Выйти</button>
                </>
                : <>
                    <NavLink to="/register">Зарегистрироваться</NavLink>
                    <NavLink to="/login">Войти</NavLink>
                </>
            }
        </>
    )
}