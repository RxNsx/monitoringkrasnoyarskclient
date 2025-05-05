import {UserProfile} from "../../interfaces/UserProfile.ts";

const getLocalStorageLoginName = () => {
    return localStorage.getItem("loginName");
}

export async function getProfileUserAsync() : Promise<UserProfile> {
    const url = "http://127.0.0.1:5000/api/users/GetUser";
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
                return null;
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