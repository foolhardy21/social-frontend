import { ACTION_TOGGLE_PASSWORD_TYPE, ACTION_UPDATE_PASSWORD, ACTION_UPDATE_USERNAME, ACTION_UPDATE_FIRST_NAME, ACTION_UPDATE_LAST_NAME, ACTION_UPDATE_ALERT } from "../utils"

export const signupReducer = (state, { type, payload }) => {

    switch (type) {

        case ACTION_TOGGLE_PASSWORD_TYPE: return state.passwordInputType === 'password' ? { ...state, passwordInputType: 'text' } : { ...state, passwordInputType: 'password' }

        case ACTION_UPDATE_USERNAME: return { ...state, username: payload }

        case ACTION_UPDATE_PASSWORD: return { ...state, password: payload }

        case ACTION_UPDATE_FIRST_NAME: return { ...state, firstName: payload }

        case ACTION_UPDATE_LAST_NAME: return { ...state, lastName: payload }

        case ACTION_UPDATE_ALERT: return { ...state, alert: { type: payload.type, message: payload.message } }

    }
}