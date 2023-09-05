import {
    SHOW_NOTIFICATION,
    CLEAR_NOTIFICATION,
} from '../actions/types';

const initialState = {
    isOpen: false,
    color: 'success',
    message: '',
};

export default function (state=initialState, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {
                ...state,
                ...action.payload,
            };

        case CLEAR_NOTIFICATION:
            return {
                ...state,
                isOpen: false,
            }

        default:
            return state;
    }
};