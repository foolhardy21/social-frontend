import axios from 'axios'
import { createContext, useContext, useReducer } from 'react'
import { profileReducer } from 'reducers'

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
    const [profileState, profileDispatch] = useReducer(profileReducer, {
        bio: {
            loading: false,
            value: {}
        },
        posts: {
            loading: false,
            value: []
        }
    })

    const getProfileBio = async (username) => {
        profileDispatch({ type: 'SET_PROFILE_BIO_LOADING' })
        try {
            const { data: { users } } = await axios.get('/api/users')
            const loggedInUser = users.find(user => user.username === username)
            const response = await axios.get(`/api/users/${loggedInUser._id}`)
            return response
        } catch (e) {
            return e.response
        } finally {
            profileDispatch({ type: 'REMOVE_PROFILE_BIO_LOADING' })
        }
    }

    const getProfilePosts = async (username) => {
        profileDispatch({ type: 'SET_PROFILE_POSTS_LOADING' })
        try {
            const response = await axios.get(`/api/posts/user/${username}`)
            return response
        } catch (e) {
            return e.response
        } finally {
            profileDispatch({ type: 'REMOVE_PROFILE_POSTS_LOADING' })
        }
    }

    return (
        <ProfileContext.Provider
            value={{
                profileState,
                profileDispatch,
                getProfileBio,
                getProfilePosts,
            }}
        >
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext)