import axios from 'axios'
<<<<<<< HEAD
import { createContext, useContext, useState } from "react";
import { API_LOGIN, API_SIGNUP } from 'utils'
||||||| parent of b8112bc (feat - explore page added)
=======
import { createContext, useContext, useState } from "react";
>>>>>>> b8112bc (feat - explore page added)

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const logInUser = async (username, password) => {
        try {
            const response = await axios.post(API_LOGIN, {
                username,
                password,
            })
<<<<<<< HEAD
            window.localStorage.setItem('userToken', response.data.encodedToken)
            window.localStorage.setItem('username', response.data.foundUser.username)
            setIsUserLoggedIn(true)
||||||| parent of b8112bc (feat - explore page added)
=======
            window.localStorage.setItem('userToken', response.data.encodedToken)
            setIsUserLoggedIn(true)
>>>>>>> b8112bc (feat - explore page added)
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

<<<<<<< HEAD
    const logoutUser = () => {
        window.localStorage.removeItem('userToken')
        window.localStorage.removeItem('username')
        setIsUserLoggedIn(false)
    }

    const getUserToken = () => window.localStorage.getItem('userToken')

    const getUsername = () => window.localStorage.getItem('username')

||||||| parent of b8112bc (feat - explore page added)
=======
    const logoutUser = () => {
        window.localStorage.removeItem('userToken')
        setIsUserLoggedIn(false)
    }

    const getUserToken = () => window.localStorage.getItem('userToken')

>>>>>>> b8112bc (feat - explore page added)
    return (
        <AuthContext.Provider
            value={{
                isUserLoggedIn,
                setIsUserLoggedIn,
                logInUser,
<<<<<<< HEAD
                signUpUser,
                logoutUser,
                getUserToken,
                getUsername,
||||||| parent of b8112bc (feat - explore page added)
                signUpUser
=======
                signUpUser,
                getUserToken,
                logoutUser,
>>>>>>> b8112bc (feat - explore page added)
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
