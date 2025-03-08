import {loginUserAsync} from "../../features/LoginUser/loginUser.ts";
import {FormEvent, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {AuthContext} from "../../app/App.tsx";
import {LoginUser} from "../../interfaces/LoginUser.ts";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";

export default function LoginForm() {
    const authContext = useContext(AuthContext);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [isShowError, setIsShowError] = useState(false);
    const navigate = useNavigate();

    const onSubmitFormHandler = async (evt : FormEvent) => {
        evt.preventDefault();

        const newProfile : LoginUser = {
            loginName: login,
            password: password
        };

        const response = await loginUserAsync(newProfile)
        if(response === null) {
            setErrorMessage("Ошибка входа в систему")
            setIsShowError(true);
        }

        Cookies.set("token", response.tokenData);
        authContext?.setIsAuthenticated(true);
        authContext?.setTokenData(response.tokenData);
        navigate("/");
    }

    const onResetFormHandler = () => {
        setLogin('');
        setPassword('');
        setErrorMessage('');
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
                                          title="Форма входа в систему">
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                            <h2 className="fw-bold mb-2 text-uppercase">Вход</h2>
                                            <Form.Group className="p-3">
                                                <Form.Label>
                                                    Логин:
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Ваш логин для входа"
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
                                                    placeholder="Ваш пароль для входа"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="p-3">
                                                <Button className="btn btn-primary" type="submit">
                                                    Войти в систему
                                                </Button>
                                            </Form.Group>
                                        </div>
                                        <p className="mb-0">
                                            Еще не зарегистрированы?
                                            <br/>
                                            <Link to="/register">
                                                Зарегистрироваться
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