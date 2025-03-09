import {GeoLocationData} from "../../interfaces/GeoLocationData.ts";


export async function getGeoLocationData(districtId : string) : Promise<GeoLocationData[]> {
    const url = `api/Geocode/GetDistrictGeoCoordinates?districtId=${districtId}`;
    console.log(`GeoLocationData URL: ${url}`);

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

            console.log(data)
            return [...data];
        })
}