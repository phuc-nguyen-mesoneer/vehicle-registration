import {LOGIN_SUCCESS, SET_LOGIN_ERRORS, SET_SIGNUP_ERRORS, SIGNUP_SUCCESS} from '../actions/types';

const initialState = {
    signUpError: {
        name: null,
        email: null,
        password1: null,
        password2: null,
    },
    forgotPasswordError: {
        email: null,
    },
    loginError: {
        email: null,
        password: null,
    },
    registrationFormError: {
        email: null
    }
}

export default function (state=initialState, action) {
    switch (action.type) {
        case SET_LOGIN_ERRORS:
            return {
                ...state,
                loginError: {
                    ...action.payload,
                }
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loginError: {
                    email: null,
                    password: null,
                }
            }

        case SET_SIGNUP_ERRORS:
            return {
                ...state,
                signUpError: {
                    ...action.payload,
                }
            }

        case SIGNUP_SUCCESS:
            return {
                ...state,
                signUpError: {
                    email: null,
                    password1: null,
                    password2: null
                }
            }

        default:
            return state;
    }

}