import { configureStore } from '@reduxjs/toolkit'
import { profileReducer, bookmarksReducer, loginReducer, postsReducer, signupReducer, commentsReducer, authReducer, modalReducer, logInMiddleware } from 'slices'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
        posts: postsReducer,
        bookmarks: bookmarksReducer,
        profile: profileReducer,
        comments: commentsReducer,
        auth: authReducer,
        modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})