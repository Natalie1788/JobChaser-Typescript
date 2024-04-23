import React, { createContext, useEffect, useState } from "react";
import { auth } from "./../../firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";

/*interface User {
    id: string;
    name: string;
    email: string;
  }*/
  
interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    user: User | null;
}


export const AuthContext = createContext<AuthContextType>({
    user: null
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            console.log("user: ", user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};