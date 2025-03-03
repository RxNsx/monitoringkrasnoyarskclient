import {useState} from "react";
import registerUserAsync from "../../features/RegisterUser/registerUser.ts";
import {useNavigate} from "react-router-dom";
import {RegisterUser} from "../../interfaces/RegisterUser.ts";

export default function RegisterForm() {
    const [loginName, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const onSubmitFormHandler = async (evt) => {
        evt.preventDefault();

        const registerUser : RegisterUser = {
            userName: userName,
            email: email,
            loginName: loginName,
            password: password
        }

        const response = await registerUserAsync(registerUser)
            .catch(error => setErrorMessage(`Ошибка регитстрации пользователя ${error.message}`));
        if(response?.loginName === registerUser.loginName
            && response?.userName === registerUser.userName
            && response?.email === registerUser.email ) {
            navigate('/');
        }
    }

    const onResetFormHandler = () => {
        setUserName('')
        setEmail('')
        setLogin('')
        setPassword('')
    }

    return (
        <>
            <form onSubmit={onSubmitFormHandler} onReset={onResetFormHandler}>
                <label htmlFor="userName">
                    Имя пользователя:
                    <input
                        required
                        id="userName"
                        type="text"
                        onChange={(evt) => setUserName(evt.target.value)}
                    />
                </label>
                <label htmlFor="email">
                    Почтовый адрес:
                    <input
                        required
                        id="email"
                        type="email"
                        onChange={(evt) => setEmail(evt.target.value)}
                    />
                </label>
                <label htmlFor="login">
                    Логин:
                    <input
                        required
                        type="text"
                        id="login"
                        onChange={e => setLogin(e.target.value)}
                    />
                </label>
                <label htmlFor="passowrd">
                    Пароль:
                    <input
                        required
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>

                <button type="submit" value="Войти в систему">
                    Зарегистрироваться
                </button>
                <button type="reset" value="Сбросить поля">
                    Сбросить поля
                </button>
            </form>
            <p className="errorText">{errorMessage}</p>
        </>
    )
}