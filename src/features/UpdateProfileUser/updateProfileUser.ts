import {UpdateUserProfileResponse} from "../../interfaces/UpdateUserProfileResponse.ts";

export async function updateProfileUser(userId: string,
                                        login: string,
                                        email: string,
                                        districtId: string,
                                        streetId: string): Promise<UpdateUserProfileResponse> {
    const url = "http://127.0.0.1:5000/api/Profiles/UpdateProfile";

    const updateProfileData = {
        userId: userId,
        loginName: login,
        email: email,
        districtId: districtId,
        streetId: streetId,
    }
    console.log(updateProfileData);

    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(updateProfileData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка обновления профиля`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            return data;
        });
}