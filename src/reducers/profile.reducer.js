import { ACTION_REMOVE_LOADING, ACTION_SET_BIO, ACTION_SET_LOADING, ACTION_UPDATE_BIO } from "utils"

export const profileReducer = (state, { type, payload }) => {

    switch (type) {
        case ACTION_SET_LOADING: return { ...state, loading: true }

        case ACTION_REMOVE_LOADING: return { ...state, loading: false }

        case ACTION_SET_BIO: return { ...state, bio: payload }

        default: return state
    }
}
