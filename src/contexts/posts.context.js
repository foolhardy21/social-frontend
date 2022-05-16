import axios from "axios";
import { createContext, useContext } from "react";
import { API_POSTS, API_POST_DISLIKE, API_POST_LIKE } from "utils";
import { useAuth } from "./";

const PostsContext = createContext({})

export const PostsProvider = ({ children }) => {
    const { getUserToken } = useAuth()

    const getPosts = async () => {
        // postsDispatch({ type: ACTION_SET_LOADING })
        try {
            const response = await axios.get(API_POSTS)
            return response
        } catch (e) {
            return e.response
        } finally {
            // postsDispatch({ type: ACTION_REMOVE_LOADING })
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

    const createPost = async postText => {
        try {
            const response = await axios.post('/api/posts', {
                postData: {
                    content: postText
                }
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

    const removeBookmarkFromPost = async postId => {
        try {
            const response = await axios.post(`/api/users/remove-bookmark/${postId}`, {}, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response
        } catch (e) {
            return e.response
        }
    }

    const getUserPosts = async (username) => {
        // postsDispatch({ type: ACTION_SET_LOADING })
        try {
            const response = await axios.get(`/api/posts/user/${username}`)
            return response
        } catch (e) {
            return e.response
        } finally {
            // postsDispatch({ type: ACTION_REMOVE_LOADING })
        }
    }

    const removePost = async postId => {
        try {
            const response = await axios.delete(`/api/posts/${postId}`, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response
        } catch (e) {
            return e.response
        }
    }

    const editPost = async (postId, post) => {
        try {
            const response = await axios.post(`/api/posts/edit/${postId}`,
                {
                    postData: post
                },
                {
                    headers:
                    {
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
                // postsState,
                // postsDispatch,
                getPosts,
                likePost,
                dislikePost,
                removeBookmarkFromPost,
                createPost,
                getUserPosts,
                removePost,
                editPost,
            }}
        >
            {children}
        </PostsContext.Provider>
    )
}

export const usePosts = () => useContext(PostsContext)
