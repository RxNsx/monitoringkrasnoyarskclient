import districts from "../../entities/district.ts";
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import Cookies from "js-cookie";
import {AuthContext} from "../../app/App.tsx";

export default function Navbar () {
    const authContext = useContext(AuthContext);

    const logout = () => {
        Cookies.remove("token");
        localStorage.removeItem("loginName");
        authContext?.setIsAuthenticated(false);
        authContext?.setTokenData('');
    }

    return (
        <>
            {districts.map(item => (
                <li key={item.id}>{item.title}</li>
            ))}

            <br/>

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