import {
    SET_REGISTRATION_FORM_ERRORS,
    SET_REGISTRATION_FORM_GENERATED,
    SET_REGISTRATION_FORM_LOADING, SET_REGISTRATION_FORM_SUBMITTED
} from '../actions/types';

const initialState = {
    plateId: null,
    isPlateGenerated: false,
    isPlateLoading: false,
    generatedLicensePlate: "",
}

export default function (state=initialState, action) {
    switch (action.type) {
        case SET_REGISTRATION_FORM_LOADING:
            return {
                ...state,
                isPlateLoading: true,
            }

        case SET_REGISTRATION_FORM_GENERATED:
            return {
                ...state,
                isPlateLoading: false,
                isPlateGenerated: true,
                ...action.payload
            }

        case SET_REGISTRATION_FORM_ERRORS:
            return {
                ...state,
                isPlateLoading: false,
            }

        case SET_REGISTRATION_FORM_SUBMITTED:
            return {
                ...initialState
            }

        default:
            return state;
    }
}