import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import registerUserAsync from "../../features/RegisterUser/registerUser.ts";
import {RegisterUser} from "../../interfaces/RegisterUser.ts";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";

export default function RegisterForm() {
    const [loginName, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isShowError, setIsShowError] = useState<boolean>(false);
    const navigate = useNavigate();

    const checkEqualPasswords = () : boolean => {
        if(confirmPassword !== password) {
            setErrorMessage("Пароли не совпадают")
            setIsShowError(true);
            return false;
        }

        setErrorMessage("");
        setIsShowError(false);
        return true;
    }

    const onSubmitFormHandler = async (evt) => {
        evt.preventDefault();

        if(!checkEqualPasswords()) {
            return;
        }

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
            <div className="vh-100 d-flex align-items-center" style={{background: 'linear-gradient(135deg, #99CCCC 0%, #2575fc 100%)'}}>
                <Container className="py-5 h-100">
                    <Row className="d-flex justify-content-center align-items-center h-100">
                        <Col md={8} lg={6} xl={5}>
                            <Card bg="dark" text="white" style={{borderRadius: '1rem'}}>
                                <Card.Body className="p-5 text-center">
                                    <Form onSubmit={onSubmitFormHandler} onReset={onResetFormHandler}
                                          title="Регистрация нового пользователя">
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                            <h2 className="fw-bold mb-2 text-uppercase">Регистрация</h2>
                                            <Form.Group className="p-3">
                                                <Form.Label>
                                                    Имя пользователя:
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Имя пользователя"
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
                                                    placeholder="Ваш логин для входа в систему"
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
                                                    placeholder="Ваш пароль"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="p-3">
                                                <Form.Label>
                                                    Подтверждение пароля:
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    placeholder="Подтверждение вашего пароля"
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="p-3">
                                                <Button className="btn btn-primary" type="submit">
                                                    Зарегистрировать пользователя
                                                </Button>
                                            </Form.Group>
                                        </div>
                                        <p className="mb-0">
                                            Уже зарегистрированы?
                                            <br/>
                                            <Link to="/login">
                                                Войти в систему
                                            </Link>
                                        </p>
                                        <div className="mt-md-4 pb-2">
                                            <Link to="/">
                                                Вернуться на главную
                                            </Link>
                                        </div>
                                    </Form>
                                    <Alert className="p-3" variant="danger" hidden={!isShowError}>
                                        {errorMessage}
                                    </Alert>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}