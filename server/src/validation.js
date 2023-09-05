import validator from 'validator';
import isEmpty from 'is-empty';
import moment from 'moment';

export function validateSignUpInput (data) {
    const errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password1 = !isEmpty(data.password1) ? data.password1 : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if (validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator.isEmpty(data.password1)) {
        errors.password1 = "Password field is required";
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!validator.isLength(data.password1, { min: 6, max: 30 })) {
        errors.password1 = "Password must be at least 6 characters";
    }
    if (!validator.equals(data.password1, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export function validateLoginInput (data) {
    const errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export function validatePlateGenerationInput (data) {
    const errors = {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.idNumber = !isEmpty(data.idNumber) ? data.idNumber : "";
    data.acModel = !isEmpty(data.acModel) ? data.acModel : "";
    data.callSign = !isEmpty(data.callSign) ? data.callSign : "";

    if (validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name is required";
    }
    if (validator.isEmpty(data.lastName)) {
        errors.lastName = "Last Name is required";
    }
    if (!validator.isDate(data.dateOfBirth)) {
        errors.dateOfBirth = "Invalid Date Of Birth";
    } else if (moment(data.dateOfBirth).isAfter(moment().subtract(18, 'years'))) {
        errors.dateOfBirth = "You are not old enough";
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator.isEmpty(data.idNumber)) {
        errors.firstName = "First Name is required";
    } else if (
        !validator.isNumber(data.idNumber) ||
        data.idNumber < 100000000 ||
        (999999999 < data.idNumber < 100000000000) ||
        data.idNumber > 999999999999
    ) {
        errors.idNumber = "Invalid Identification Number";
    }
    if (validator.isEmpty(data.acModel)) {
        errors.acModel = "AC Model is required!";
    }
    if (validator.isEmpty(data.callSign)) {
        errors.callSign = "Call Sign is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}