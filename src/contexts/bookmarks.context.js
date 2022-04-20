import axios from "axios";
import { createContext, useReducer, useContext } from "react";
import { bookmarksReducer } from 'reducers'
import { ACTION_REMOVE_LOADING, ACTION_SET_LOADING, API_POST_BOOKMARK, API_REMOVE_BOOKMARK } from "utils";
import { useAuth } from "./";

const BookmarkContext = createContext()

export const BookmarksProvider = ({ children }) => {
    const [bookmarksState, bookmarksDispatch] = useReducer(bookmarksReducer, {
        loading: false,
        bookmarks: []
    })
    const { getUserToken } = useAuth()

    const getBookmarks = async () => {
        bookmarksDispatch({ type: ACTION_SET_LOADING })
        try {
            const response = await axios.get(API_POST_BOOKMARK, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response
        } catch (e) {
            return e.response
        } finally {
            bookmarksDispatch({ type: ACTION_REMOVE_LOADING })
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

    const removeBookmarkFromPost = async postId => {
        try {
            const response = await axios.post(`${API_REMOVE_BOOKMARK}/${postId}`, {}, {
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
        <BookmarkContext.Provider
            value={{
                bookmarksState,
                bookmarksDispatch,
                getBookmarks,
                bookmarkPost,
                removeBookmarkFromPost,
            }}
        >
            {children}
        </BookmarkContext.Provider>
    )
}

export const useBookmarks = () => useContext(BookmarkContext)