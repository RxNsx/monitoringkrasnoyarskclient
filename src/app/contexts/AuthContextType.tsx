import React from "react";

export type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    token: string;
    setTokenData:  React.Dispatch<React.SetStateAction<string>>;
}