import { configureStore } from '@reduxjs/toolkit'
import { loginReducer, postsReducer, signupReducer } from 'slices'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
        postsState: postsReducer,
    }
})