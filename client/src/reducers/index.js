import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducers from './errorReducers';
import notificationReducers from './notificationReducers';

export default combineReducers({
    auth: authReducer,
    error: errorReducers,
    notification: notificationReducers,
})