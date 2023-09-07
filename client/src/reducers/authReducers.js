import {
    USER_LOADING,
    LOGIN_SUCCESS
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
};

export default function (state=initialState, action) {

    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        default:
            return state;
    }
}

