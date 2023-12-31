import isEmpty from 'is-empty';
import {
    validateSignUpInput,
    validateLoginInput
} from '../validation.js';
import {
    deleteUserService,
    getUserFromEmail,
    getUsers, signInUser,
    signUpNewUser,
    updateUser
} from '../service/userService.js';
import {getSubordinateRanks, rankChecking, ranks} from '../ranks.js';

export const signUpController = async (req, res) => {
    const {email} = req.body;
    const {errors, isValid} = validateSignUpInput(req.body);
    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    if (isValid) {
        const existingUser = await getUserFromEmail(email);
        if (existingUser) {
            return res.status(400).json({email: "User has already existed"});
        }

        await signUpNewUser(req.body);
        return res.status(200).json({success: true});
    }
};

export const loginController = async (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    if (isValid) {
        const logInResult = await signInUser(req.body);
        if (logInResult.success) {
            return res.status(200).json(logInResult);
        } else {
            return res.status(400).json(logInResult);
        }
    }
};

export const verifyToken = (req, res) => {
    const {_id, email, name, role} = req.user;
    if (_id && email && name && role) {
        return res.status(200).json({
            success: true,
            user: {
                _id,
                email,
                name,
                role
            }
        });
    } else {
        res.status(401).json({
            error: 'Invalid token'
        });
    }
}

export const getUserList = async (req, res) => {
    const isAuthorized = rankChecking(req, res);
    if (isAuthorized) {
        const subordinateRanks = getSubordinateRanks(req.user.role);
        const {userList, userCount} = await getUsers(req.body, subordinateRanks);
        return res.status(200).json({
            userList,
            userCount
        })
    }
}

export const updateUserRole = async (req, res) => {
    try {
        const isAuthorized = rankChecking(req, res);
        if (isAuthorized) {
            const {role: adminRole} = req.user;
            const {role: updatedRole} = req.body;
            if (ranks[adminRole] < ranks[updatedRole]) {
                res.status(400).json({
                    error: "You are not authorized to promote someone's rank to higher than yours"
                })
            } else {
                await updateUser(req.body);
                res.status(200).json({
                    success: true
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            internalError: err
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const isAuthorized = rankChecking(req, res);
        if (isAuthorized) {
            const {role: adminRole} = req.user;
            const {role: updatedRole} = req.body;
            if (ranks[adminRole] <= ranks[updatedRole]) {
                res.status(400).json({
                    error: "You are not authorized to delete your colleague or someone with higher rank than yours"
                })
            } else {
                await deleteUserService(req.body);
                res.status(200).json({
                    success: true,
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            internalError: err
        })
    }

}