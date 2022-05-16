import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    comments: [],
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        initialiseComments: (state, action) => {
            state.comments = action.payload
        }
    }
})

export const { initialiseComments } = commentsSlice.actions

export default commentsSlice.reducer