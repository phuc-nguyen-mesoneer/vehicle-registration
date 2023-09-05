import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    LOGIN_SUCCESS,
    SET_LOGIN_ERRORS,
    SET_SIGNUP_ERRORS,
    USER_LOADING
} from "./types";
import {clearNotification, showNotifications} from './notificationActions';
import Cookies from 'js-cookie';
// Register User
export const registerUser = (userData, navigate) => dispatch => {
    axios
        .post("/signup", userData)
        .then(res => {
            dispatch(showNotifications({color: 'success', message: 'Sign up successfully!'}));
            setTimeout(() => {
                dispatch(clearNotification());
                return navigate("/login");
            }, 2000)
        }) // re-direct to login on successful register
        .catch(err => {
            return dispatch({
                    type: SET_SIGNUP_ERRORS,
                    payload: err.response.data
                })
            }
        );
};
// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/login", userData)
        .then(res => {
            const { token } = res.data;
            if (userData.remember) {
                Cookies.set('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: SET_LOGIN_ERRORS,
                payload: err.response.data
            })
        );
};

export const loadUserFromJWT = token => dispatch => {
    const decoded = jwt_decode(token);
    axios
        .get("/verify", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            const {email, name} = res.data;
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            Cookies.remove('token');
            sessionStorage.removeItem('token');
            dispatch({
                type: SET_LOGIN_ERRORS,
                payload: err.response.data
            })
        })
}

export const setCurrentUser = decoded => {
    return {
        type: LOGIN_SUCCESS,
        payload: decoded
    };
};
// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
// Log user out
export const logoutUser = (navigate) => dispatch => {
    // Remove token from local storage
    Cookies.remove('token');
    sessionStorage.removeItem('token');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser(null));
    navigate('/login');
};