import {loginUserAsync} from "../../features/LoginUser/loginUser.ts";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {AuthContext} from "../../app/App.tsx";
import {LoginUser} from "../../interfaces/LoginUser.ts";
import {Alert, Button, Form} from "react-bootstrap";

export default function LoginForm() {
    const authContext = useContext(AuthContext);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [isShowError, setIsShowError] = useState(false);
    const navigate = useNavigate();

    const onSubmitFormHandler = async (evt) => {
        evt.preventDefault();

        const newProfile : LoginUser = {
            loginName: login,
            password: password
        };

        const response = await loginUserAsync(newProfile)
            .catch(error => {
                setErrorMessage(error.message)
                setIsShowError(true);
            });
        Cookies.set("token", response.tokenData);
        authContext?.setIsAuthenticated(true);
        authContext?.setTokenData(response.tokenData);
        evt.target.reset();
        navigate("/");

    }

    const onResetFormHandler = () => {
        setLogin('');
        setPassword('');
        setErrorMessage('');
    }

    return (
        <>
            <div className="p-3">
                <h1>Вход в систему:</h1>
            </div>
            <Form onSubmit={onSubmitFormHandler} onReset={onResetFormHandler} title="Регистрация нового пользователя">
                <Form.Group className="p-3">
                    <Form.Label>
                        Логин:
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="p-3">
                    <Form.Label>
                        Пароль:
                    </Form.Label>
                    <Form.Control
                        required
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="p-3">
                    <Button className="btn btn-primary" type="submit">
                        Войти в систему
                    </Button>
                </Form.Group>
            </Form>
            <Alert className="p-3" variant="danger" hidden={!isShowError}>
                {errorMessage}
            </Alert>
        </>
    )
}