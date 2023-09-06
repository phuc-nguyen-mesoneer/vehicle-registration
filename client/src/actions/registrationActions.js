import axios from 'axios';
import {
    SET_REGISTRATION_FORM_LOADING,
    SET_REGISTRATION_FORM_GENERATED,
    SET_REGISTRATION_FORM_ERRORS,
} from './types';

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
            console.log(err.response.data);
            dispatch({
                type: SET_REGISTRATION_FORM_ERRORS,
                payload: err.response.data,
            })
        })
}