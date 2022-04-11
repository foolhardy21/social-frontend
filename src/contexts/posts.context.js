import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { postsReducer } from "reducers";
import { ACTION_REMOVE_LOADING, ACTION_SET_LOADING, API_POSTS, API_POST_BOOKMARK, API_POST_DISLIKE, API_POST_LIKE } from "utils";
import { useAuth } from "./";

const PostsContext = createContext({})

export const PostsProvider = ({ children }) => {
    const [postsState, postsDispatch] = useReducer(postsReducer, {
        posts: [],
        loading: false,
    })
    const { getUserToken } = useAuth()

    const getPosts = async () => {
        postsDispatch({ type: ACTION_SET_LOADING })
        try {
            const response = await axios.get(API_POSTS)
            return response
        } catch (e) {
            return e.response
        } finally {
            postsDispatch({ type: ACTION_REMOVE_LOADING })
        }
    }

    const likePost = async postId => {
        try {
            const response = await axios.post(`${API_POST_LIKE}/${postId}`, {}, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response
        } catch (e) {
            return e.response
        }
    }

    const dislikePost = async postId => {
        try {
            const response = await axios.post(`${API_POST_DISLIKE}/${postId}`, {}, {
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
            const response = await axios.post(`${API_POST_BOOKMARK}/${postId}`, {}, {
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
                dislikePost,
            }}
        >
            {children}
        </PostsContext.Provider>
    )
}

export const usePosts = () => useContext(PostsContext)
