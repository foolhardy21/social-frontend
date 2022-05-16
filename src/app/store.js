import { configureStore } from '@reduxjs/toolkit'
import { loginReducer, signupReducer } from 'slices'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
    }
})