import axios from 'axios'
import { API_POST_BOOKMARK, API_REMOVE_BOOKMARK } from "utils";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    bookmarks: [],
    loading: false,
}

export const removeBookmarkFromPost = createAsyncThunk(
    '/bookmarks/removeBookmark',
    async ({ _id, token }) => {
        const response = await axios.post(`/api/users/remove-bookmark/${_id}`, {}, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

export const getBookmarks = createAsyncThunk(
    'bookmarks/getBookmarks',
    async (token) => {
        const response = await axios.get(API_POST_BOOKMARK, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

export const bookmarkPost = createAsyncThunk(
    'bookmarks/bookmarkPost',
    async ({ _id, token }) => {
        const response = await axios.post(`${API_POST_BOOKMARK}/${_id}`, {}, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

export const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        initialiseBookmarks: (state, action) => {
            state.bookmarks = action.payload
        },
        setBookmarksLoading: (state) => {
            state.loading = true
        },
        removeBookmarksLoading: (state) => {
            state.loading = false
        },
    },
    extraReducers: {
        [removeBookmarkFromPost.fulfilled]: (state, action) => {
            console.log(action)
            state.bookmarks = action.payload.data.bookmarks
        },
        [getBookmarks.pending]: (state) => {
            state.loading = true
        },
        [getBookmarks.fulfilled]: (state, action) => {
            state.loading = false
            state.bookmarks = action.payload.data.bookmarks
        },
        [bookmarkPost.fulfilled]: (state, action) => {
            state.bookmarks = action.payload.data.bookmarks
        }
    }
})

export const { initialiseBookmarks, setBookmarksLoading, removeBookmarksLoading } = bookmarksSlice.actions

export const bookmarksReducer = bookmarksSlice.reducer