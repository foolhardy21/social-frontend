import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useAuth } from "./auth.context";

const CommentsContext = createContext([])

export const CommentsProvider = ({ children }) => {
    const [commentsState, commentsDispatch] = useReducer(commentsReducer, {
        comments: [],
        loading: false,
    })
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

    function commentsReducer(state, { type, payload }) {
        switch (type) {
            case 'INIT_COMMENTS': return { ...state, comments: payload }
        }
    }

    return (
        <CommentsContext.Provider
            value={{
                commentsState,
                commentsDispatch,
                getPostComments,
                addCommentToPost,
            }}
        >
            {children}
        </CommentsContext.Provider>
    )
}

export const useComments = () => useContext(CommentsContext) 