import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: '',
    password: '',
    alert: {
        message: '',
        type: ''
    },
    passwordInputType: 'password'
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        toggleLoginPasswordType: (state) => {
            state.passwordInputType === 'password' ? state.passwordInputType = 'text' : state.passwordInputType = 'password'
        },
        updateLoginUsername: (state, action) => {
            state.username = action.payload
        },
        updateLoginPassword: (state, action) => {
            state.password = action.payload
        },
        updateLoginAlert: (state, action) => {
            state.alert.type = action.payload.type
            state.alert.message = action.payload.message
        },
    },
})

export const { toggleLoginPasswordType, updateLoginUsername, updateLoginPassword, updateLoginAlert } = loginSlice.actions

export default loginSlice.reducer