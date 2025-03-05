import {GeoLocationData} from "../../interfaces/GeoLocationData.ts";
import React from "react";

export type YandexMapContextType = {
    coords: GeoLocationData[] | undefined,
    setCoords: React.Dispatch<React.SetStateAction<GeoLocationData[] | undefined>>
}