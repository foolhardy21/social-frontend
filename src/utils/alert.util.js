import { ACTION_UPDATE_ALERT, ALERT_DISPLAY_TIME } from './'

/**
 * this function is used to display the alert on the page
 * @param {Function} action - action creator of the respective reducer
 * @param {String} message - message to be displayed
 * @param {String} type - type of alert (success/error)
 */
export const showAlert = (dispatch, action, message, type) => {
    dispatch(action({ message, type }))
    setTimeout(() => dispatch(action({ message: '', type: '' })), ALERT_DISPLAY_TIME)
}