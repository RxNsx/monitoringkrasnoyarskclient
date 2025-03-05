import {Outlet} from "react-router-dom";
import React, {createContext, useEffect, useMemo, useState} from "react";
import Cookies from "js-cookie";
import {GeoLocationData} from "../interfaces/GeoLocationData.ts";
import {AuthContextType} from "./contexts/AuthContextType.tsx";
import {YandexMapContextType} from "./contexts/YandexContextType.tsx";

export const AuthContext = createContext<null | AuthContextType>(null);
export const YandexMapContext = createContext<YandexMapContextType | null>(null);

export default function App() {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [token, setTokenData] = useState<string>('');

    const [coords, setCoords] = useState<GeoLocationData[]>();
    const memoCoords = useMemo(() => ({coords, setCoords }), [coords])

    useEffect(() => {
        const storedToken = Cookies.get("token");
        if(storedToken) {
            setTokenData(storedToken);
            setAuthenticated(true);
        }
    }, []);

    const authValue = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setAuthenticated,
        token: token,
        setTokenData: setTokenData
    }

    return (
        <main>
            <AuthContext.Provider value={authValue}>
                <YandexMapContext.Provider value={memoCoords}>
                    <Outlet/>
                </YandexMapContext.Provider>
            </AuthContext.Provider>
        </main>
    )
}