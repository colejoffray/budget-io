import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem('auth')
        return storedAuth ? JSON.parse(storedAuth) : { isLoggedIn: false, user: null, id: null}
    });


    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
        console.log(auth)
      }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;