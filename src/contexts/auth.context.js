import { createContext, useContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const getUserToken = () => window.localStorage.getItem('userToken')

    const getUsername = () => window.localStorage.getItem('username')

    return (
        <AuthContext.Provider
            value={{
                getUserToken,
                getUsername,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
