import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducers from './errorReducers';
import notificationReducers from './notificationReducers';
import registrationReducers from './registrationReducers';
import adminReducers from './adminReducers';

export default combineReducers({
    auth: authReducer,
    error: errorReducers,
    notification: notificationReducers,
    registration: registrationReducers,
    admin: adminReducers,
})