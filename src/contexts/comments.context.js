import axios from "axios";
import { createContext, useContext } from "react";
import { useAuth } from "./auth.context";

const CommentsContext = createContext([])

export const CommentsProvider = ({ children }) => {
    const { getUserToken } = useAuth()

    const getPostComments = async (postId) => {
        try {
            const response = await axios.get(`/api/comments/${postId}`)
            return response
        } catch (e) {
            return e.response
        }
    }

    const addCommentToPost = async (postId, commentData) => {
        try {
            const response = await axios.post(`/api/comments/add/${postId}`, {
                commentData
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

    const editComment = async (postId, commentId, commentData) => {
        try {
            const response = await axios.post(`/api/comments/edit/${postId}/${commentId}`, {
                commentData
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

    const deleteComment = async (postId, commentId) => {
        try {
            const response = await axios.post(`/api/comments/delete/${postId}/${commentId}`, {}, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response
        } catch (e) {
            return e.response
        }
    }

    const upvoteComment = async (postId, commentId) => {
        try {
            const response = await axios.post(`/api/comments/upvote/${postId}/${commentId}`, {}, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response
        } catch (e) {
            return e.response
        }
    }

    const downvoteComment = async (postId, commentId) => {
        try {
            const response = await axios.post(`/api/comments/downvote/${postId}/${commentId}`, {}, {
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
        <CommentsContext.Provider
            value={{
                // commentsState,
                // commentsDispatch,
                getPostComments,
                addCommentToPost,
                editComment,
                deleteComment,
                upvoteComment,
                downvoteComment,
            }}
        >
            {children}
        </CommentsContext.Provider>
    )
}

export const useComments = () => useContext(CommentsContext) 