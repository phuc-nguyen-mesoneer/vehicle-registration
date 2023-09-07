import axios from "axios";
import {logoutUser} from '../actions/authActions';
export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export const setInterceptor = (dispatch, navigate) => {
    axios.interceptors.response.use(response => {
        return response
    }, error => {
        if (error.response.status === 401) {
            dispatch(logoutUser(navigate))
        }
        throw error;
    })
}