import {loginUserAsync} from "../../features/LoginUser/loginUser.ts";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import './LoginForm.css';
import Cookies from "js-cookie";
import {AuthContext} from "../../app/App.tsx";
import {LoginUser} from "../../entities/LoginUser.ts";

export default function LoginForm() {
    const authContext = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmitFormHandler = async (evt) => {
        evt.preventDefault();
        const newProfile : LoginUser = {
            loginName: login,
            password: password
        };

        try
        {
            const response = await loginUserAsync(newProfile)
                .catch(error => setErrorMessage(error.message));
            Cookies.set("token", response.tokenData);
            authContext?.setIsAuthenticated(true);
            authContext?.setTokenData(response.tokenData);
            evt.target.reset();
            navigate("/");
        }
        catch (error) {
            setErrorMessage(`Error: ` + error.message);
        }
    }

    const onResetFormHandler = () => {
        setLogin('');
        setPassword('');
        setErrorMessage('');
    }

    return (
        <>
            <form onSubmit={onSubmitFormHandler} onReset={onResetFormHandler}>
                <label htmlFor="login">
                    Логин:
                    <input
                        required
                        type="text"
                        id="login"
                        onChange={e => setLogin(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    Пароль:
                    <input
                        required
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>

                <button type="submit" value="Войти в систему">
                    Войти в систему
                </button>
                <button type="reset" value="Сбросить поля">
                    Сбросить поля
                </button>
            </form>
            <p className="errorText">{errorMessage}</p>
        </>
    )
}