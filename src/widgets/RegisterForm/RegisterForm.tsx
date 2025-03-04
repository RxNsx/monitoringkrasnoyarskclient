import {useState} from "react";
import {useNavigate} from "react-router-dom";
import registerUserAsync from "../../features/RegisterUser/registerUser.ts";
import {RegisterUser} from "../../interfaces/RegisterUser.ts";
import {Alert, Button, Form} from "react-bootstrap";

export default function RegisterForm() {
    const [loginName, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isShowError, setIsShowError] = useState<boolean>(false);
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
            .catch(error => {
                setErrorMessage(`Ошибка регитстрации пользователя ${error.message}`)
                setIsShowError(true);
            });
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
            <div className="p-3">
                <h1>Регистрация нового пользователя:</h1>
            </div>
            <Form onSubmit={onSubmitFormHandler} onReset={onResetFormHandler} title="Регистрация нового пользователя">
                <Form.Group className="p-3">
                    <Form.Label>
                        Имя пользователя:
                    </Form.Label>
                    <Form.Control
                        required
                        key="user-name"
                        type="text"
                        placeholder="Иван"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="p-3">
                    <Form.Label>
                        Электронная почта:
                    </Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="вашапочта@mail.ru"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
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
                        Зарегистрироваться
                    </Button>
                </Form.Group>
            </Form>
            <Alert className="p-3" variant="danger" hidden={!isShowError}>
                {errorMessage}
            </Alert>
        </>
    )
}