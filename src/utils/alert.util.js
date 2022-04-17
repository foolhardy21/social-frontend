import { ACTION_UPDATE_ALERT, ALERT_DISPLAY_TIME } from './'

export const showAlert = (dispatch, message, type) => {
    dispatch({ type: ACTION_UPDATE_ALERT, payload: { message, type } })
    setTimeout(() => dispatch({ type: ACTION_UPDATE_ALERT, payload: { message: '', type: '' } }), ALERT_DISPLAY_TIME)
}