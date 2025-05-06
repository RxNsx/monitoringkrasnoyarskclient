import {GeoLocationData} from "../../interfaces/GeoLocationData.ts";


export async function getGeoLocationDataByDistrictId(districtId : string | undefined) : Promise<GeoLocationData[]> {
    const url = `http://127.0.0.1:5000/api/Geocode/GetDistrictGeoCoordinates?districtId=${districtId}`;

    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "GET"
    })
        .then(response => {
            if(!response.ok) {
                throw new Error(`Ошибка получения геоданных по району ${districtId}`);
            }

            return response.json();
        })
        .then(data => {
            return [...data];
        })
}