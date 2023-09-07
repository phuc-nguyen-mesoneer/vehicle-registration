import axios from 'axios';
import {
    GET_TASKS_ERROR,
    GET_USERS_ERROR,
    SET_SUMMARY_DATA, SET_TASKS, SET_TASKS_LOADING,
    SET_USERS,
    SET_USERS_LOADING
} from './types';
import {showNotifications} from './notificationActions';

export const getSummaryData = () => dispatch => {
    axios
        .get('/summary')
        .then(res => {
            dispatch({
                type: SET_SUMMARY_DATA,
                payload: res.data,
            })
        })
        .catch(err => {
            dispatch(showNotifications({
                color: 'error',
                message: 'Failed to get summary data',
            }))
        })
}

export const getUserList = (filterAndSortOptions) => dispatch => {
    dispatch({
        type: SET_USERS_LOADING
    });
    axios
        .post('/users', filterAndSortOptions)
        .then(res => {
            dispatch({
                type: SET_USERS,
                payload: {
                    ...res.data,
                    userFilterAndSortOption: filterAndSortOptions
                }
            })
        })
        .catch(err => {
            dispatch({
                type: GET_USERS_ERROR,
                payload: err
            })
        })
}

export const getTaskList = (filterAndSortOption) => dispatch => {
    dispatch({
        type: SET_TASKS_LOADING
    });
    axios
        .post('/tasks', filterAndSortOption)
        .then(res => {
            dispatch({
                type: SET_TASKS,
                payload: {
                    ...res.data,
                    taskFilterAndSortOption: filterAndSortOption
                }
            })
        })
        .catch(err => {
            dispatch({
                type: GET_TASKS_ERROR,
                payload: err
            })
        })
}

export const setUserRole = (userData, callback) => dispatch => {
    axios
        .post('/user-role', userData)
        .then(res => {
            callback();
        })
        .catch(err => {
            console.error(err);
        })

}