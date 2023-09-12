import {describe, expect, it} from '@jest/globals';

import '../src/loadEnv.js';

import {
    getUserFromEmail,
    getUsers,
    signUpNewUser,
    deleteUserService, signInUser
} from '../src/service/userService.js';
import {
    getTaskService
} from '../src/service/registrationService.js';

describe('getUsers', () => {
    it('should match user count', async () => {
        try {
            const response = await getUsers(
                {},
                ['Civil Protection', 'Elite', 'Representative', 'Advisor']
            );
            expect(response.userList.length).toEqual(response.userCount);
        } catch (err) {
            console.error(err)
        }
    });
})

describe('getTasks', () => {
    it('should match task count', async () => {
        try {
            const response = await getTaskService({});
            expect(response.taskList.length).toEqual(response.taskCount);
        } catch (err) {
            console.error(err);
        }
    })
})

describe('signUp', () => {
    it('should create a new user', async () => {
        try {
            const response = await signUpNewUser({
                name: 'Phuc Nguyen Test',
                email: 'test@email.com',
                password1: 'aRandomPassword',
            });
            expect(response.acknowledged).toBe(true);
        } catch (err) {
            console.error(err);
        }
    });
})

describe('signInUser', () => {
    it('should sign in the user', async () => {
        try {
            const response = await signInUser({
                email: 'test@email.com',
                password: 'aRandomPassword',
            });
            expect(response.success).toBe(true);
            expect(response.token).not.toBeNull();
        } catch (err) {
            console.error(err);
        }
    });
})

describe('deleteUser', () => {
    it('should delete the user', async () => {
        try {
            const existingUser = await getUserFromEmail('test@email.com');
            await deleteUserService({
                _id: existingUser._id,
                email: existingUser.email,
            });
            const userAfterDeleting = await getUserFromEmail('test@email.com');
            expect(existingUser.email).toBe('test@email.com');
            expect(userAfterDeleting).toBeNull();
        } catch (err) {
            console.error(err);
        }
    });
})