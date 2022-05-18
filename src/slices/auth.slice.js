import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_LOGIN, API_SIGNUP } from 'utils'
import axios from 'axios'

const initialState = {
    isUserLoggedIn: false,
    isUserSignedUp: false,
    error: '',
}

export const logInUser = createAsyncThunk(
    'auth/logInUser',
    async ({ username, password }) => {
        const response = await axios.post(API_LOGIN, {
            username,
            password,
        })
        window.localStorage.setItem('userToken', response.data.encodedToken)
        window.localStorage.setItem('username', response.data.foundUser.username)
        return response
    }
)

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async ({ username, password, firstName, lastName }) => {
        const response = await axios.post(API_SIGNUP, {
            username,
            password,
            firstName,
            lastName
        })
        return response
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOutUser: (state) => {
            state.isUserLoggedIn = false
        },
        updateUserLogInStatus: (state) => {
            state.isUserLoggedIn = true
        }
    },
    extraReducers: {
        [logInUser.fulfilled]: (state) => {
            state.isUserLoggedIn = true
            state.error = ''
        },
        [logInUser.rejected]: (state, action) => {
            state.isUserLoggedIn = false
            if (action.error.message.includes('404')) {
                state.error = 'user not found'
            } else if (action.error.message.includes('401')) {
                state.error = 'wrong password'
            }
        },
        [signUpUser.fulfilled]: (state) => {
            state.error = ''
            state.isUserSignedUp = true
        },
        [signUpUser.rejected]: (state, action) => {
            state.isUserSignedUp = false
            if (action.error.message.includes('422')) {
                state.error = 'user already exists'
            }
        },
    }
})

export const { logOutUser, updateUserLogInStatus } = authSlice.actions

export const authReducer = authSlice.reducer