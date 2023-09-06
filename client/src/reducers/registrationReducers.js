import {
    SET_REGISTRATION_FORM_ERRORS,
    SET_REGISTRATION_FORM_GENERATED,
    SET_REGISTRATION_FORM_LOADING
} from '../actions/types';

const initialState = {
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
                generatedLicensePlate: action.payload.generatedPlate,
            }

        case SET_REGISTRATION_FORM_ERRORS:
            return {
                ...state,
                isPlateLoading: false,
            }

        default:
            return state;
    }
}