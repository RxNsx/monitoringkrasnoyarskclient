import {DistrictItem} from "../../interfaces/DistrictDataResponse.ts";

export async function getDistrictsDataAsync() : Promise<DistrictItem[]> {
    const url = "api/Districts/GetDistricts";

    console.log("start handling getDistrictsDataAsync");

    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "GET"
    })
        .then(response => {
            if(!response.ok) {
                throw new Error("Ошибка загрузки информации по районам")
            }
            return response.json();
        })
        .then(data => {
            return [...data];
        })
}