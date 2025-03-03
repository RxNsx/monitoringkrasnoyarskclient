import {serverIp} from "../../app/providers/proxy.ts";
import {RegisterResponse} from "../../entities/RegisterResponse.ts";
import {RegisterUser} from "../../entities/RegisterUser.ts";

export default async function registerUserAsync(props : RegisterUser)
    : Promise<RegisterResponse> {
    const url = serverIp + "api/Users/RegisterUser";

    const registerData = {
        userName: props.userName,
        email: props.email,
        loginName: props.loginName,
        password: props.password
    }

    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method: "POST",
        body: JSON.stringify(registerData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка регистрации пользователя. Попробуйте позже`)
            }
            return response.json();
        })
        .then(data => {
            const responseData : RegisterResponse = {
                loginName: data.loginName,
                userName: data.userName,
                email: data.email,
            }
            return responseData;
        });
}