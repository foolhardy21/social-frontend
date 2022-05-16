import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    loading: false,
}

export const postsSlice = createSlice({
    name: 'postsState',
    initialState,
    reducers: {
        initialisePosts: (state, action) => {
            state.posts = action.payload
        },
        setPostsLoading: (state) => {
            state.loading = true
        },
        removePostsLoading: (state) => {
            state.loading = false
        },
        initialiseFeed: (state, action) => {
            state.posts = action.payload
        },
        initialiseProfilePosts: (state, action) => {
            state.posts = action.payload
        }
    }
})

export const { initialiseFeed, initialisePosts, initialiseProfilePosts, setPostsLoading, removePostsLoading } = postsSlice.actions

export default postsSlice.reducer
