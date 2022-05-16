import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bio: {},
    loading: false
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileLoading: (state) => {
            state.loading = true
        },
        removeProfileLoading: (state) => {
            state.loading = false
        },
        setProfileBio: (state, action) => {
            state.bio = action.payload
        }
    }
})

export const { setProfileLoading, removeProfileLoading, setProfileBio } = profileSlice.actions

export default profileSlice.reducer