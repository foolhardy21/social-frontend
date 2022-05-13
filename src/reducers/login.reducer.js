import { ACTION_TOGGLE_PASSWORD_TYPE, ACTION_UPDATE_ALERT, ACTION_UPDATE_PASSWORD, ACTION_UPDATE_USERNAME } from "../utils"

export const loginReducer = (state, { type, payload }) => {

    switch (type) {

        case ACTION_TOGGLE_PASSWORD_TYPE: return state.passwordInputType === 'password' ? { ...state, passwordInputType: 'text' } : { ...state, passwordInputType: 'password' }

        case ACTION_UPDATE_USERNAME: return { ...state, username: payload }

        case ACTION_UPDATE_PASSWORD: return { ...state, password: payload }

        case ACTION_UPDATE_ALERT: return { ...state, alert: { type: payload.type, message: payload.message } }

        default: return state
    }
}
