import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from 'slices'

export const store = configureStore({
    reducer: {
        login: loginReducer
    }
})