export const loginReducer = (state, { type, payload }) => {

    switch (type) {

        case 'TOGGLE_PASSWORD_TYPE': return state.passwordInputType === 'password' ? { ...state, passwordInputType: 'text' } : { ...state, passwordInputType: 'password' }

        case 'UPDATE_USERNAME': return { ...state, username: payload }

        case 'UPDATE_PASSWORD': return { ...state, password: payload }

        case 'UPDATE_ALERT': return { ...state, alert: { type: payload.type, message: payload.message } }

    }
}