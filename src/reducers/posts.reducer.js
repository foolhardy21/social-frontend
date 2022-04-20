import { ACTION_INIT_POSTS, ACTION_INIT_USER_FEED, ACTION_LIKE_POST, ACTION_REMOVE_LOADING, ACTION_SET_LOADING } from "utils"

export const postsReducer = (state, { type, payload }) => {

    switch (type) {

        case ACTION_INIT_POSTS: return { ...state, posts: payload }

        case ACTION_SET_LOADING: return { ...state, loading: true }

        case ACTION_REMOVE_LOADING: return { ...state, loading: false }

        case ACTION_LIKE_POST: return {
            ...state, posts: state.posts.map(post => post._id === payload._id ? ({ ...payload }) : post)
        }

        case ACTION_INIT_USER_FEED: return { ...state, posts: state.posts.filter(post => payload.some(username => username === post.username)) }

        case ACTION_LIKE_POST: return {
            ...state, posts: state.posts.map(post => post._id === payload._id ? ({ ...payload }) : post)
        }

        case ACTION_INIT_USER_FEED: return { ...state, posts: state.posts.filter(post => payload.some(username => username === post.username)) }

    }
}
