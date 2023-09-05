import {CLEAR_NOTIFICATION, SHOW_NOTIFICATION} from './types';

export const showNotifications = ({color, message}) => dispatch => {
    return dispatch({
        type: SHOW_NOTIFICATION,
        payload: {
            isOpen: true,
            color,
            message
        }
    })
}

export const clearNotification = () => dispatch => {
    return dispatch({
        type: CLEAR_NOTIFICATION
    })
}