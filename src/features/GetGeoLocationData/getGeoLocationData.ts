import {GeoLocationData} from "../../interfaces/GeoLocationData.ts";

const setLocalStorageGeoLocationData = (geolocationData : GeoLocationData[]) : void => {
    localStorage.setItem("geoLocationData", JSON.stringify(geolocationData));
}

export async function getGeoLocationDataByDistrictId(districtId : string | undefined) : Promise<GeoLocationData[]> {
    // const localAddress = "http://127.0.0.1:5000/"
    const localAddress = ""
    const url = localAddress + `api/Geocode/GetDistrictGeoCoordinates?districtId=${districtId}`;

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
            setLocalStorageGeoLocationData(data);
            return [...data];
        })
}

export async function getGeoLocationDataByStreetId(streetId : string | undefined) : Promise<GeoLocationData[]> {
    const url = `http://127.0.0.1:5000/api/Geocode/GetStreetGeoCoordinates?streetId=${streetId}`;

    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "GET"
    })
        .then(response => {
            if(!response.ok) {
                throw new Error(`Ошибка получения геоданных по улице ${streetId}`);
            }

            return response.json();
        })
        .then(data => {
            setLocalStorageGeoLocationData(data);
            return [...data];
        })
}