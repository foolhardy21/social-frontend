export const bookmarksReducer = (state, { type, payload }) => {

    switch (type) {

        case 'INIT_BOOKMARKS': return { ...state, bookmarks: payload }

        case 'SET_LOADING': return { ...state, loading: true }

        case 'REMOVE_LOADING': return { ...state, loading: false }

        case 'REMOVE_BOOKMARK': return { ...state, bookmarks: state.bookmarks.filter(bookmark => bookmark._id !== payload) }

        default: return state

    }
}