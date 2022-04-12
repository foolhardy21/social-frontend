import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { postsReducer } from "reducers";
import { useAuth } from "./";

const PostsContext = createContext({})

export const PostsProvider = ({ children }) => {
    const [postsState, postsDispatch] = useReducer(postsReducer, {
        posts: [],
        loading: false,
    })
    const { getUserToken } = useAuth()

    const getPosts = async () => {
        postsDispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get('/api/posts')
            return response
        } catch (e) {
            return e.response
        } finally {
            postsDispatch({ type: 'REMOVE_LOADING' })
        }
    }

    const likePost = async postId => {
        try {
            const response = await axios.post(`/api/posts/like/${postId}`, {}, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response
        } catch (e) {
            return e.response
        }
    }

    const bookmarkPost = async postId => {
        try {
            const response = await axios.post(`/api/users/bookmark/${postId}`, {}, {
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
        <PostsContext.Provider
            value={{
                postsState,
                postsDispatch,
                getPosts,
                likePost,
                bookmarkPost,
            }}
        >
            {children}
        </PostsContext.Provider>
    )
}

export const usePosts = () => useContext(PostsContext)