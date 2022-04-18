import axios from 'axios'
import { createContext, useContext } from "react";
import { API_LOGIN, API_SIGNUP } from '../utils'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const logInUser = async (username, password) => {
        try {
            const response = await axios.post(API_LOGIN, {
                username,
                password,
            })
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

    return (
        <AuthContext.Provider
            value={{
                logInUser,
                signUpUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
