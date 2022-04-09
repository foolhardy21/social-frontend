import { createContext, useContext } from "react";
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const logInUser = async (username, password) => {
        try {
            const response = await axios.post('/api/auth/login', {
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