export const postsReducer = (state, { type, payload }) => {

    switch (type) {

        case 'INIT_POSTS': return { ...state, posts: payload }

        case 'SET_LOADING': return { ...state, loading: true }

        case 'REMOVE_LOADING': return { ...state, loading: false }

    }
}