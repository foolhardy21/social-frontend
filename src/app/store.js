import { configureStore } from '@reduxjs/toolkit'
import { profileReducer, bookmarksReducer, loginReducer, postsReducer, signupReducer } from 'slices'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
        postsState: postsReducer,
        bookmarksState: bookmarksReducer,
        profile: profileReducer,
    }
})