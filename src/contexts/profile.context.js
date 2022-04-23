import axios from 'axios'
import { createContext, useContext, useReducer } from 'react'
import { profileReducer } from 'reducers'
import { ACTION_REMOVE_LOADING, ACTION_SET_LOADING } from 'utils'
import { useAuth } from './auth.context'

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
    const [profileState, profileDispatch] = useReducer(profileReducer, {
        bio: {},
        loading: false,
    })
    const { getUserToken } = useAuth()

    const getProfileBio = async (username) => {
        profileDispatch({ type: ACTION_SET_LOADING })
        try {
            const { data: { users } } = await axios.get('/api/users')
            const loggedInUser = users.find(user => user.username === username)
            const response = await axios.get(`/api/users/${loggedInUser._id}`)
            return response
        } catch (e) {
            return e.response
        } finally {
            profileDispatch({ type: ACTION_REMOVE_LOADING })
        }
    }

    const editBio = async (user) => {
        try {
            const response = await axios.post('/api/users/edit', {
                userData: user
            }, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response
        } catch (e) {
            return e.response
        }
    }

    const followUser = async userId => {
        try {
            const response = axios.post(`/api/users/follow/${userId}`, {}, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response
        } catch (e) {
            return e.response
        }
    }

    const unFollowUser = async userId => {
        try {
            const response = axios.post(`/api/users/unfollow/${userId}`, {}, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response
        } catch (e) {
            return e.response
        }
    }

    return (
        <ProfileContext.Provider
            value={{
                profileState,
                profileDispatch,
                getProfileBio,
                editBio,
                followUser,
                unFollowUser,
            }}
        >
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext)