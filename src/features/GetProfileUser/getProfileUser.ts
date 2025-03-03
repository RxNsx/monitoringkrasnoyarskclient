import {serverIp} from "../../app/providers/proxy.ts";

const getLocalStorageLoginName = () => {
    return localStorage.getItem("loginName");
}

export async function getProfileUserAsync() {
    const url = serverIp + "api/users/GetUser";
    const loginName = getLocalStorageLoginName();

    return await fetch(url + `?loginName=${loginName}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "GET"
    })
        .then(response => {
            if(!response.ok) {
                throw new Error("Ошибка получения профиля");
            }
            return response.json();
        })
        .then(data => {
            return {
                loginName: data.userName,
                userEmail: data.email
            }
        })
}