import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_POSTS, API_POST_DISLIKE, API_POST_LIKE } from "utils";

const initialState = {
    posts: [],
    loading: false,
    status: '',
}

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async () => {
        const response = await axios.get(API_POSTS)
        return response
    }
)

export const likePost = createAsyncThunk(
    'posts/likePost',
    async ({ _id, token, username }) => {
        const response = await axios.post(`${API_POST_LIKE}/${_id}`, {}, {
            headers: {
                authorization: token
            }
        })
        return username ? response.data.posts.filter(post => post.username === username)
            : response.data.posts
    }
)

export const dislikePost = createAsyncThunk(
    'posts/dislikePost',
    async ({ _id, token, username }) => {
        const response = await axios.post(`${API_POST_DISLIKE}/${_id}`, {}, {
            headers: {
                authorization: token
            }
        })
        return username ? response.data.posts.filter(post => post.username === username)
            : response.data.posts
    }
)

export const getProfilePosts = createAsyncThunk(
    'posts/getProfilePosts',
    async (username) => {
        const response = await axios.get(`/api/posts/user/${username}`)
        return response
    }
)

export const createPost = createAsyncThunk(
    'posts/createPost',
    async ({ postValue, token }) => {
        const response = await axios.post('/api/posts', {
            postData: {
                content: postValue
            }
        }, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

export const removePost = createAsyncThunk(
    'posts/removePost',
    async ({ _id, token }) => {
        const response = await axios.delete(`/api/posts/${_id}`, {
            headers: {
                authorization: token
            }
        })
        return _id
    }
)

export const editPost = createAsyncThunk(
    'posts/editPost',
    async ({ _id, post, token }) => {
        const response = await axios.post(`/api/posts/edit/${_id}`,
            {
                postData: post
            },
            {
                headers: { authorization: token }
            })
        return response.data.posts.find(post => post._id === _id)
    }
)

export const postsSlice = createSlice({
    name: 'posts',
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
    },
    extraReducers: {
        [getPosts.pending]: (state) => {
            state.loading = true
        },
        [getPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload.status
            state.posts = action.payload.data.posts
        },
        [getPosts.rejected]: (state, action) => {
            state.loading = false
            state.status = action.error.message
        },
        [likePost.fulfilled]: (state, action) => {
            state.posts = action.payload
        },
        [dislikePost.fulfilled]: (state, action) => {
            state.posts = action.payload
        },
        [getProfilePosts.pending]: (state) => {
            state.loading = true
        },
        [getProfilePosts.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload.data.posts
            state.status = action.payload.status
        },
        [getProfilePosts.rejected]: (state, action) => {
            state.loading = false
            state.status = action.error.message
        },
        [createPost.fulfilled]: (state, action) => {
            state.posts = action.payload.data.posts
            state.status = action.payload.status
        },
        [removePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter(statePost => statePost._id !== action.payload)
            state.status = action.payload.status
        },
        [editPost.fulfilled]: (state, action) => {
            state.posts = state.posts.map(statePost => statePost._id === action.payload._id ? action.payload : statePost)
            state.status = action.payload.status
        },

    }
})

export const { initialiseFeed, initialisePosts, initialiseProfilePosts, setPostsLoading, removePostsLoading } = postsSlice.actions

export const postsReducer = postsSlice.reducer
