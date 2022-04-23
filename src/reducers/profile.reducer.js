export const profileReducer = (state, { type, payload }) => {

    switch (type) {
        case 'SET_PROFILE_BIO_LOADING': return { ...state, bio: { ...state.bio, loading: true } }

        case 'REMOVE_PROFILE_BIO_LOADING': return { ...state, bio: { ...state.bio, loading: false } }

        case 'SET_PROFILE_POSTS_LOADING': return { ...state, posts: { ...state.posts, loading: true } }

        case 'REMOVE_PROFILE_POSTS_LOADING': return { ...state, posts: { ...state.posts, loading: false } }

        case 'SET_PROFILE_BIO': return { ...state, bio: { ...state.bio, value: payload } }

        case 'SET_PROFILE_POSTS': return { ...state, posts: { ...state.posts, value: payload } }

    }
}