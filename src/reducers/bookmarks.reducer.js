import { ACTION_INIT_BOOKMARKS, ACTION_REMOVE_BOOKMARK, ACTION_REMOVE_LOADING, ACTION_SET_LOADING } from "utils"

export const bookmarksReducer = (state, { type, payload }) => {

    switch (type) {

        case ACTION_INIT_BOOKMARKS: return { ...state, bookmarks: payload }

        case ACTION_SET_LOADING: return { ...state, loading: true }

        case ACTION_REMOVE_LOADING: return { ...state, loading: false }

        case ACTION_REMOVE_BOOKMARK: return { ...state, bookmarks: state.bookmarks.filter(bookmark => bookmark._id !== payload) }

        default: return state

    }
}