import {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {AuthContext, YandexMapContext} from "../../app/App.tsx";
import {Nav} from "react-bootstrap";
import {PeopleFill} from "react-bootstrap-icons";
import {getDistrictsDataAsync} from "../../features/GetDistrictsData/GetDistrictsData.ts";
import {DistrictItem} from "../../interfaces/DistrictDataResponse.ts";
import {getGeoLocationDataByDistrictId} from "../../features/GetGeoLocationData/getGeoLocationData.ts";
import {UserProfile} from "../../interfaces/UserProfile.ts";
import {getProfileUserAsync} from "../../features/GetProfileUser/getProfileUser.ts";
import "./Navigation.css";

export default function Navigation () {
    const authContext = useContext(AuthContext);
    const yandexMapContext = useContext(YandexMapContext);
    const [districtsData, setDistrictsData] = useState<DistrictItem[] | null>();
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchDistrictData = async () => {
            const data = await getDistrictsDataAsync();
            setDistrictsData(data);
        }

        const getProfileData = async () => {
            const profileData = await getProfileUserAsync();
            setProfile(profileData);
        }

        fetchDistrictData();
        getProfileData();
    }, []);

    const logout = () => {
        Cookies.remove("token");
        localStorage.removeItem("loginName");
        authContext?.setIsAuthenticated(false);
        authContext?.setTokenData('');
    }

    function replaceDistrict(districtName : string) : string {
        return districtName.replace("район", "");
    }

    return (
        <Nav defaultActiveKey="/home" className="flex-column justify-content-center align-items-start p-3" >
            <h4>Красноярск</h4>
            {districtsData?.map((district : DistrictItem) => (
                <Nav.Link
                    key={district.id}
                    onClick={async () => {
                        const geoLocationData =  await getGeoLocationDataByDistrictId(district.id)
                        yandexMapContext?.setCoords(geoLocationData);
                    }}
                >
                    {replaceDistrict(district.name)}
                </Nav.Link>
            ))}
                <Nav.Link
                    key="all"
                    onClick={async () => {
                        const geoLocationData =  await getGeoLocationDataByDistrictId("all");
                        yandexMapContext?.setCoords(geoLocationData);
                    }}
                >
                    Все районы
                </Nav.Link>

            <br/>
            <br/>
            <div>
                <PeopleFill className="d-block m-auto"/>
                {authContext?.isAuthenticated
                    ? <>
                        <Nav.Link href="/profile">Профиль</Nav.Link>
                        <div className="subscribe-container p-3">
                            <p>Подписки:</p>
                            {profile?.districtId
                                ? (
                                    <>
                                        <p>Район:</p>
                                        <Nav.Link
                                            onClick={async () => {
                                                const geoLocationData =  await getGeoLocationDataByDistrictId(profile?.districtId);
                                                yandexMapContext?.setCoords(geoLocationData);
                                            }}
                                        >
                                            {profile?.districtName}
                                        </Nav.Link>
                                    </>
                                )
                                : (
                                    <>
                                        <p>Выберите район в профиле</p>
                                    </>
                                )
                            }
                            {profile?.streetId
                                ? (
                                    <>
                                        <p>Улица:</p>
                                        <Nav.Link
                                            onClick={async () => {
                                                //TODO: Сделать запрос по улице
                                                const geoLocationData = await getGeoLocationDataByDistrictId(profile?.streetId);
                                                yandexMapContext?.setCoords(geoLocationData);
                                            }}
                                        >
                                            {profile?.streetName}
                                        </Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <p>Выберите улицу в профиле</p>
                                    </>
                                )
                            }
                        </div>
                        <Nav.Link onClick={logout}>
                            Выйти
                        </Nav.Link>
                    </>
                    : <>
                        <Nav.Link href="/register">Зарегистрироваться</Nav.Link>
                        <Nav.Link href="/login">Войти</Nav.Link>
                    </>
                }
            </div>
        </Nav>
    )
}