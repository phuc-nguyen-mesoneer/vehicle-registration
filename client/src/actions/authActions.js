import axios from "axios";
import {setAuthToken, setInterceptor} from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
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
        .catch(err =>
            dispatch({
                type: SET_SIGNUP_ERRORS,
                payload: err.response.data
            })
        );
};
// Login - get user token
export const loginUser = (userData, navigate) => dispatch => {
    axios
        .post("/login", userData)
        .then(res => {
            const {token} = res.data;
            if (userData.remember) {
                Cookies.set('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }
            setAuthToken(token);
            setInterceptor(dispatch, navigate);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            navigate('/dashboard');
        })
        .catch(err =>
            dispatch({
                type: SET_LOGIN_ERRORS,
                payload: err.response.data
            })
        );
};

export const loadUserFromJWT = (token, navigate) => dispatch => {
    axios
        .get("/verify", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setAuthToken(token);
            setInterceptor(dispatch, navigate);
            dispatch(setCurrentUser({
                ...res.data.user
            }));
        })
        .catch(err => {
            Cookies.remove('token');
            sessionStorage.removeItem('token');
            dispatch({
                type: SET_LOGIN_ERRORS,
                payload: err.response.data
            });
            navigate('/login');
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
    Cookies.remove('token');
    sessionStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser(null));
    navigate('/login');
};