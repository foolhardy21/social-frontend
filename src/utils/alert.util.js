import { ACTION_UPDATE_ALERT, ALERT_DISPLAY_TIME } from './'

/**
 * this function is used to display the alert on the page
 * @param {Function} dispatch - dispatch method of the respective reducer
 * @param {String} message - message to be displayed
 * @param {String} type - type of alert (success/error)
 */
export const showAlert = (dispatch, message, type) => {
    dispatch({ type: ACTION_UPDATE_ALERT, payload: { message, type } })
    setTimeout(() => dispatch({ type: ACTION_UPDATE_ALERT, payload: { message: '', type: '' } }), ALERT_DISPLAY_TIME)
}