import { getProfileUserAsync } from "../../features/GetProfileUser/getProfileUser.ts";
import { FormEvent, useEffect, useState } from "react";
import { UserProfile } from "../../interfaces/UserProfile.ts";
import './Profile.css';
import {Button, Col, Container, Dropdown, DropdownMenu, Form, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import {getStreetsData} from "../../features/GetStreetsData/getStreetDropdownData.ts";
import {StreetData} from "../../interfaces/StreetData.ts";

export default function Profile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [streets, setStreets] = useState<StreetData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFormDisabled, setIsFormDisabled] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProfileUserAsync();
            if (!data) {
                setError("Ошибка получения профиля");
            } else {
                setProfile(data);
                setLogin(data.loginName); // Initialize login state
                setEmail(data.userEmail); // Initialize email state
            }
        };

        const streetsData = async () => {
            const data = await getStreetsData();
            if(!data) {
                setError("Ошибка получение данных по улицам г. Красноярск");
            } else {
                setStreets(data);
            }
        }

        fetchData();
        streetsData();
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Загрузка профиля...</div>;
    }

    if (error) {
        return <div className="errorText">Ошибка загрузки профиля: {error}</div>;
    }


    const updateProfile = async (evt: FormEvent) => {

    }

    const onSubmitFormHandler = async (evt: FormEvent) => {
        evt.preventDefault();
        //TODO: Изменить данные пользователя
        setIsFormDisabled(true);
    };

    return (
        <div
            className="vh-100 d-flex align-items-center"
            style={{ background: 'linear-gradient(135deg, #99CCCC 0%, #2575fc 100%)' }}
        >
            <Container className="h-100">
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col md={8} lg={6} xl={5}>
                        <Form onSubmit={onSubmitFormHandler}>
                            <div className="mb-md-5 mt-md-4 pb-5">
                                <h2 className="fw-bold mb-2 text-uppercase">Профиль</h2>
                                <Form.Group className="p-3">
                                    <Form.Label>Имя пользователя:</Form.Label>
                                    <Form.Control
                                        className="control-color"
                                        disabled={isFormDisabled}
                                        required
                                        type="text"
                                        value={isFormDisabled ? profile?.loginName : login}
                                        onChange={(e) => setLogin(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="p-3">
                                    <Form.Label>Электронная почта:</Form.Label>
                                    <Form.Control
                                        className="control-color"
                                        disabled={isFormDisabled}
                                        required
                                        type="email"
                                        value={isFormDisabled ? profile?.userEmail : email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Dropdown className="p-3">
                                    <Dropdown.Toggle id="dropdown-autoclose-true">
                                        Абельмановская
                                    </Dropdown.Toggle>
                                    <DropdownMenu>
                                        {streets.map((item : StreetData) => (
                                            <Dropdown.Item onClick={}>
                                                {item.streetName}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                                {isFormDisabled ? (
                                    <Form.Group className="p-3">
                                        <Button
                                            className="btn btn-warning"
                                            onClick={() => setIsFormDisabled(false)}
                                        >
                                            Изменить профиль
                                        </Button>
                                    </Form.Group>
                                ) : (
                                    <>
                                        <Form.Group className="p-3">
                                            <Button
                                                className="btn btn-danger me-2"
                                                onClick={() => {
                                                    setIsFormDisabled(true);
                                                    setLogin(profile?.loginName || '');
                                                    setEmail(profile?.userEmail || '');
                                                }}
                                            >
                                                Отменить изменения
                                            </Button>
                                            <Button
                                                className="btn btn-success"
                                                type="submit"
                                            >
                                                Подтвердить изменения
                                            </Button>
                                        </Form.Group>
                                    </>
                                )}
                            </div>
                            <div className="mt-md-4 pb-2">
                                <Link to="/">Вернуться на главную</Link>
                            </div>
                        </Form>
                    </Col>
                </Row>ы
            </Container>
        </div>
    );
}