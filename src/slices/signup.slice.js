import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    alert: {
        message: '',
        type: ''
    },
    passwordInputType: 'password'
}

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        toggleSignupPasswordType: (state) => {
            state.passwordInputType === 'password' ? state.passwordInputType = 'text' : state.passwordInputType = 'password'
        },
        updateSignupUsername: (state, action) => {
            state.username = action.payload
        },
        updateSignupPassword: (state, action) => {
            state.password = action.payload
        },
        updateSignupFirstName: (state, action) => {
            state.firstName = action.payload
        },
        updateSignupLastName: (state, action) => {
            state.lastName = action.payload
        },
        updateSignupAlert: (state, action) => {
            state.alert.type = action.payload.type
            state.alert.message = action.payload.message
        }
    }
})

export const { toggleSignupPasswordType, updateSignupUsername, updateSignupPassword, updateSignupLastName, updateSignupFirstName, updateSignupAlert } = signupSlice.actions

export default signupSlice.reducer