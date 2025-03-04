import {Outlet} from "react-router-dom";
import React, {createContext, useEffect, useState} from "react";
import Cookies from "js-cookie";

type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    token: string;
    setTokenData:  React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<null | AuthContextType>(null);

export default function App() {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [token, setTokenData] = useState<string>('');

    useEffect(() => {
        const storedToken = Cookies.get("token");
        if(storedToken) {
            setTokenData(storedToken);
            setAuthenticated(true);
        }
    }, []);

    const value = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setAuthenticated,
        token: token,
        setTokenData: setTokenData
    }

    return (
        <main>
            <AuthContext.Provider value={value}>
                <Outlet/>
            </AuthContext.Provider>
        </main>
    )
}