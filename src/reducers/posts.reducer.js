export const postsReducer = (state, { type, payload }) => {

    switch (type) {

        case 'INIT_POSTS': return { ...state, posts: payload }

        case 'SET_LOADING': return { ...state, loading: true }

        case 'REMOVE_LOADING': return { ...state, loading: false }

        case 'LIKE_POST': return {
            ...state, posts: state.posts.map(post => post._id === payload._id ? ({ ...payload }) : post)
        }

        case 'GET_USER_FEED': return { ...state, posts: state.posts.filter(post => payload.some(username => username === post.username)) }

    }
}
