import axios from 'axios'
import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const logInUser = async (username, password) => {
        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password,
            })
            window.localStorage.setItem('userToken', response.data.encodedToken)
            setIsUserLoggedIn(true)
            return response
        } catch (e) {
            return e.response
        }
    }

    const signUpUser = async (username, password, firstName, lastName) => {
        try {
            const response = await axios.post('/api/auth/signup', {
                username,
                password,
                firstName,
                lastName
            })
            return response
        } catch (e) {
            return e.response
        }
    }

    const logoutUser = () => {
        window.localStorage.removeItem('userToken')
        setIsUserLoggedIn(false)
    }

    const getUserToken = () => window.localStorage.getItem('userToken')

    return (
        <AuthContext.Provider
            value={{
                isUserLoggedIn,
                setIsUserLoggedIn,
                logInUser,
                signUpUser,
                getUserToken,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
