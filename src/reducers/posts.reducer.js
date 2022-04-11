import { ACTION_INIT_POSTS, ACTION_REMOVE_LOADING, ACTION_SET_LOADING } from "utils"

export const postsReducer = (state, { type, payload }) => {

    switch (type) {

        case ACTION_INIT_POSTS: return { ...state, posts: payload }

        case ACTION_SET_LOADING: return { ...state, loading: true }

        case ACTION_REMOVE_LOADING: return { ...state, loading: false }

    }
}
