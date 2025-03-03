import {serverIp} from "../../app/providers/proxy.ts";
import {LoginUser} from "../../entities/LoginUser.ts";
import {LoginResponse} from "../../entities/LoginResponse.ts";

export async function loginUserAsync(props : LoginUser)
    : Promise<LoginResponse> {

    const url = serverIp + "api/Login/LoginUser";

    const loginData = {
        loginName: props.loginName,
        password: props.password
    }

    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(loginData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка входа`);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("loginName", data.loginName);
            return {
                loginName: data.loginName,
                tokenData: data.tokenData,
            }
        });
}