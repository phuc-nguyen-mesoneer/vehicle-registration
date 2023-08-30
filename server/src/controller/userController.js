import isEmpty from 'is-empty';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    validateSignUpInput,
    validateLoginInput,
} from '../validation.js';
import {
    getUserFromEmail,
    signUpNewUser
} from '../service/userService.js';

export const signUpController = async (req, res) => {
    const {email} = req.body;
    const { errors, isValid } = validateSignUpInput(req.body);
    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    if (isValid) {
        const existingUser = await getUserFromEmail(email);
        if (existingUser) {
            return res.status(400).json({email: "User have already existed"});
        }

        await signUpNewUser(req.body);
        return res.status(200).json({success: true});
    }
};

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isEmpty(errors)) {
        res.status(400).json(errors);
    }

    if (isValid) {
        const existingUser = await getUserFromEmail(email);
        if (!existingUser) {
            res.status(400).json({email: "Cannot find user with give email"});
        } else {
            const hashedPassword = existingUser.password;
            console.log(JSON.stringify(existingUser));
            const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
            if (isPasswordMatched) {
                const JWTPayload = {
                    id: existingUser._id,
                    email: existingUser.email
                }
                jwt.sign(
                    JWTPayload,
                    process.env.JWTSecret,
                    {expiresIn: 31556926},
                    (err, token) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({internalError: err});
                        } else {
                            res.status(200).json({
                                success: true,
                                JWT: token,
                            })
                        }
                    });
            }
        }
    }
};
