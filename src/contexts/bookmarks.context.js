import axios from "axios";
import { createContext, useReducer, useContext } from "react";
import { bookmarksReducer } from 'reducers'
import { useAuth } from "./";

const BookmarkContext = createContext()

export const BookmarksProvider = ({ children }) => {
    const [bookmarksState, bookmarksDispatch] = useReducer(bookmarksReducer, {
        loading: false,
        bookmarks: []
    })
    const { getUserToken } = useAuth()

    const getBookmarks = async () => {
        bookmarksDispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get('/api/users/bookmark', {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response
        } catch (e) {
            return e.response
        } finally {
            bookmarksDispatch({ type: 'REMOVE_LOADING' })
        }
    }


    return (
        <BookmarkContext.Provider
            value={{
                bookmarksState,
                bookmarksDispatch,
                getBookmarks,
            }}
        >
            {children}
        </BookmarkContext.Provider>
    )
}

export const useBookmarks = () => useContext(BookmarkContext)