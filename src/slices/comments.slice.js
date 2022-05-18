import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    comments: [],
}

export const getComments = createAsyncThunk(
    'comments/getComments',
    async postId => {
        const response = await axios.get(`/api/comments/${postId}`)
        return response
    }
)

export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ _id, commentData, token }) => {
        const response = await axios.post(`/api/comments/add/${_id}`, {
            commentData
        }, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

export const editComment = createAsyncThunk(
    'comments/editComment',
    async ({ postId, commentId, commentData, token }) => {
        const response = await axios.post(`/api/comments/edit/${postId}/${commentId}`, {
            commentData
        }, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async ({ postId, commentId, token }) => {
        const response = await axios.post(`/api/comments/delete/${postId}/${commentId}`, {}, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

export const upvoteComment = createAsyncThunk(
    'comments/upvoteComment',
    async ({ postId, commentId, token }) => {
        const response = await axios.post(`/api/comments/upvote/${postId}/${commentId}`, {}, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

export const downvoteComment = createAsyncThunk(
    'comments/downvoteComment',
    async ({ postId, commentId, token }) => {
        const response = await axios.post(`/api/comments/downvote/${postId}/${commentId}`, {}, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        initialiseComments: (state, action) => {
            state.comments = action.payload
        }
    },
    extraReducers: {
        [getComments.fulfilled]: (state, action) => {
            state.comments = action.payload.data.comments
        },
        [addComment.fulfilled]: (state, action) => {
            state.comments = action.payload.data.comments
        },
        [editComment.fulfilled]: (state, action) => {
            state.comments = action.payload.data.comments
        },
        [deleteComment.fulfilled]: (state, action) => {
            state.comments = action.payload.data.comments
        },
        [upvoteComment.fulfilled]: (state, action) => {
            state.comments = action.payload.data.comments
        },
        [downvoteComment.fulfilled]: (state, action) => {
            state.comments = action.payload.data.comments
        },
    }
})

export const { initialiseComments } = commentsSlice.actions

export const commentsReducer = commentsSlice.reducer