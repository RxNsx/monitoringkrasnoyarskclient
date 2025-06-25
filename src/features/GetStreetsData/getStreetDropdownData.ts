import {StreetData} from "../../interfaces/StreetData.ts";

export async function getStreetsData(): Promise<StreetData[]> {
    // const localAddress = "http://127.0.0.1:5000/"
    const localAddress = ""
    const url = localAddress + "api/streets/getallstreets";
    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "GET"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка входа`);
            }
            return response.json();
        })
        .then(data => {
            return [...data];
        });
}