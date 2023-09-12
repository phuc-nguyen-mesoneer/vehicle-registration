import axios from 'axios';
import {
    SET_REGISTRATION_FORM_LOADING,
    SET_REGISTRATION_FORM_GENERATED,
    SET_REGISTRATION_FORM_ERRORS,
    SET_REGISTRATION_FORM_SUBMITTED
} from './types';
import {showNotifications} from './notificationActions';

export const generateLicensePlate = (userData) => dispatch => {
    dispatch({
        type: SET_REGISTRATION_FORM_LOADING,
    });
    axios
        .post('/generate-plate', userData)
        .then(res => {
            dispatch({
                type: SET_REGISTRATION_FORM_GENERATED,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch({
                type: SET_REGISTRATION_FORM_ERRORS,
                payload: err.response.data,
            })
        })
}

export const submitLicensePlate = (plateData) => dispatch => {
    dispatch({
        type: SET_REGISTRATION_FORM_LOADING,
    });
    axios
        .post('/submit-plate', plateData)
        .then(() => {
            dispatch(showNotifications({
                color: "success",
                message: "License Plate submitted successfully!",
            }));
            setTimeout(() => {
                    dispatch({
                        type: SET_REGISTRATION_FORM_SUBMITTED
                    });
                    dispatch(showNotifications({
                        color: "success",
                        message: "You may need to wait 10 - 15 years for our enforcers to process your request!"
                    }));
                    setTimeout(() => window.location.reload(), 5000);
                },
                3000);
        })
        .catch(err => {
            dispatch(showNotifications({
                color: "error",
                message: JSON.stringify(err),
            }))
        })
}