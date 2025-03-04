import {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {AuthContext} from "../../app/App.tsx";
import {Nav} from "react-bootstrap";
import {PeopleFill} from "react-bootstrap-icons";
import {getDistrictsDataAsync} from "../../features/GetDistrictsData/GetDistrictsData.ts";
import {DistrictDataResponse, DistrictItem} from "../../interfaces/DistrictDataResponse.ts";

export default function Navigation () {
    const authContext = useContext(AuthContext);
    const [districtsData, setDistrictsData] = useState<DistrictDataResponse | null>();

    useEffect(() => {
        const fetchDistrictData = async () => {
            const data = await getDistrictsDataAsync();
            setDistrictsData(data);
        }

        fetchDistrictData();
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
            {districtsData.map((district : DistrictItem) => (
                <Nav.Link key={district.id} onClick={() => console.log(`Clicked ${district.id}`)}>
                    {replaceDistrict(district.name)}
                </Nav.Link>
            ))}

            <br/>
            <br/>
            <div>
                <PeopleFill className="d-block m-auto"/>
                {authContext?.isAuthenticated
                    ? <>
                        <Nav.Link href="/profile">Профиль</Nav.Link>
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