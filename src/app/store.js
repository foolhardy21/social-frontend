import { configureStore } from '@reduxjs/toolkit'
import { profileReducer, bookmarksReducer, loginReducer, postsReducer, signupReducer, commentsReducer } from 'slices'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
        posts: postsReducer,
        bookmarks: bookmarksReducer,
        profile: profileReducer,
        comments: commentsReducer,
    }
})