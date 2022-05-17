import axios from 'axios'
import { createContext, useContext, useState } from "react";
import { API_LOGIN, API_SIGNUP } from 'utils'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const logInUser = async (username, password) => {
        try {
            const response = await axios.post(API_LOGIN, {
                username,
                password,
            })
            window.localStorage.setItem('userToken', response.data.encodedToken)
            window.localStorage.setItem('username', response.data.foundUser.username)
            setIsUserLoggedIn(true)
            return response
        } catch (e) {
            return e.response
        }
    }

    const signUpUser = async (username, password, firstName, lastName) => {
        try {
            const response = await axios.post(API_SIGNUP, {
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
        window.localStorage.removeItem('username')
        setIsUserLoggedIn(false)
    }

    const getUserToken = () => window.localStorage.getItem('userToken')

    const getUsername = () => window.localStorage.getItem('username')

    return (
        <AuthContext.Provider
            value={{
                // isUserLoggedIn,
                // setIsUserLoggedIn,
                // logInUser,
                // signUpUser,
                // logoutUser,
                getUserToken,
                getUsername,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
