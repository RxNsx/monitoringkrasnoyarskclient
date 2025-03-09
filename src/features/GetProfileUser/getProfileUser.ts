import {UserProfile} from "../../interfaces/UserProfile.ts";

const getLocalStorageLoginName = () => {
    return localStorage.getItem("loginName");
}

export async function getProfileUserAsync() : Promise<UserProfile> {
    const url = "api/users/GetUser";
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
            const profileData : UserProfile = {
                loginName: data.userName,
                userEmail: data.email
            }
            return profileData;
        })
}