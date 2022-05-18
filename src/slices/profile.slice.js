import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    bio: {},
    loading: false
}

export const getProfileBio = createAsyncThunk(
    'profile/getProfileBio',
    async (username) => {
        const { data: { users } } = await axios.get('/api/users')
        const loggedInUser = users.find(user => user.username === username)
        const response = await axios.get(`/api/users/${loggedInUser._id}`)

        return response

    }
)

export const editBio = createAsyncThunk(
    'profile/editBio',
    async ({ user, token }) => {
        const response = await axios.post('/api/users/edit', {
            userData: user
        }, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

export const followUser = createAsyncThunk(
    'profile/followUser',
    async ({ _id, token }) => {
        const response = axios.post(`/api/users/follow/${_id}`, {}, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

export const unFollowUser = createAsyncThunk(
    'profile/unFollowUser',
    async ({ _id, token }) => {
        const response = axios.post(`/api/users/unfollow/${_id}`, {}, {
            headers: {
                authorization: token
            }
        })
        return response
    }
)

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
        },
    },
    extraReducers: {
        [getProfileBio.pending]: (state) => {
            state.loading = true
        },
        [getProfileBio.fulfilled]: (state, action) => {
            state.loading = false
            state.bio = action.payload.data.user
        },
        [editBio.fulfilled]: (state, action) => {
            state.bio = action.payload.data.user
        },
        [followUser.fulfilled]: (state, action) => {
            state.bio = action.payload.data.followUser
        },
        [unFollowUser.fulfilled]: (state, action) => {
            state.bio = action.payload.data.followUser
        },
    }
})

export const { setProfileLoading, removeProfileLoading, setProfileBio } = profileSlice.actions

export const profileReducer = profileSlice.reducer