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
                return null;
            }
            return response.json();
        })
        .then(data => {
            const profileData : UserProfile = {
                userId: data.userId,
                loginName: data.loginName,
                userEmail: data.email,
                districtId: data.districtId,
                districtName: data.districtName,
                streetId: data.streetId,
                streetName: data.streetName
            }
            return profileData;
        })
}