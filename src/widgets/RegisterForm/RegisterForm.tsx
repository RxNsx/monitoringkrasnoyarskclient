import {useState} from "react";
import {useNavigate} from "react-router-dom";
import registerUserAsync from "../../features/RegisterUser/registerUser.ts";
import {RegisterUser} from "../../interfaces/RegisterUser.ts";
import {Alert, Button, Form} from "react-bootstrap";

export default function RegisterForm() {
    const [loginName, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(true);
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
                setShowError(true);
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
                Регистрация нового пользователя:
            </div>
            <Form onSubmit={onSubmitFormHandler} onReset={onResetFormHandler} title="Регистрация нового пользователя">
                <Form.Group className="p-3">
                    <Form.Label>
                        Имя пользователя:
                    </Form.Label>
                    <Form.Control required key="user-name" type="text" placeholder="Иван" />
                </Form.Group>
                <Form.Group className="p-3">
                    <Form.Label>
                        Электронная почта:
                    </Form.Label>
                    <Form.Control required type="email" placeholder="вашапочта@mail.ru" />
                </Form.Group>
                <Form.Group className="p-3">
                    <Form.Label>
                        Логин:
                    </Form.Label>
                    <Form.Control required type="text" />
                </Form.Group>
                <Form.Group className="p-3">
                    <Form.Label>
                        Пароль:
                    </Form.Label>
                    <Form.Control required type="password" />
                </Form.Group>
                <Form.Group className="p-3">
                    <Button className="btn btn-primary" type="submit">
                        Зарегистрироваться
                    </Button>
                </Form.Group>
            </Form>
            <Alert className="p-3" variant="danger" hidden={showError}>
                {errorMessage}
            </Alert>
        </>
    )
}