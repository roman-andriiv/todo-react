import {createContext, useState} from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [number, setNumber] = useState(10);

    return (
        <AuthContext.Provider value={{number}}>
            {children}
        </AuthContext.Provider>
    );

}
