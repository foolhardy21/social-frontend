import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookmarks: [],
    loading: false,
}

export const bookmarksSlice = createSlice({
    name: 'bookmarksState',
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
    }
})

export const { initialiseBookmarks, setBookmarksLoading, removeBookmarksLoading } = bookmarksSlice.actions

export default bookmarksSlice.reducer