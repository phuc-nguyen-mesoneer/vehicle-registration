/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     User:
 *       type: object
 *       description: Police officers tasked with reviewing submitted license plates. A police user can be one of 'Civil Protection', 'Elite', 'Representative', or 'Advisor'.
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         role:
 *           type: string
 *           description: The user's role. User need to be at least an 'Elite' to work on tasks.
 *       example:
 *         id: 64f831131ef8e1be98da2693
 *         name: Gordon Freeman
 *         email: frodon.geeman@black.mesa
 *         role: Civil Protection
 *
 *     Task:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - dateOfBirth
 *         - email
 *         - idNumber
 *         - brand
 *         - model
 *         - province
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the requested license plates
 *         firstName:
 *           type: string
 *           description: The submitting person's first name
 *         lastName:
 *           type: string
 *           description: The submitting person's last name
 *         email:
 *           type: string
 *           description: The submitting person's email
 *         dateOfBirth:
 *           type: string
 *           description: The submitting person's date of birth
 *         idNumber:
 *           type: number
 *           description: The submitting person's government issued identification number
 *         brand:
 *           type: string
 *           description: The submitting Armored Core's brand
 *         model:
 *           type: string
 *           description: The submitting Armored Core's model
 *         province:
 *           type: string
 *           description: The submitting person's registered province/city. This field is crucial for license plate generating
 *         address:
 *           type: string
 *           description: The submitting person's details address
 *         phoneNumber:
 *           type: number
 *           description: The submitting person's phone number
 *         gender:
 *           type: string
 *           description: The submitting person's gender
 *         plate:
 *           type: string
 *           description: The license plate generated from submitted input
 *         status:
 *           type: string
 *           description: Status of the task
 *       example:
 *         id: 64f9596aef7d704e0fae235d
 *         firstName : Cinder
 *         lastName : Carla
 *         dateOfBirth : 1998-09-21
 *         email : carla@rad.rc
 *         idNumber : 030098002528
 *         brand : RaD
 *         model : Full Course
 *         province : TP Hồ Chí Minh
 *         address : Rubicon
 *         phoneNumber : 0332914111
 *         gender : female
 *         plate : 56K3-18449
 *         status : Submitted
 *
 */
import {Router} from 'express';
import passport from 'passport';

import {
    signUpController,
    loginController,
    verifyToken,
    getUserList,
    updateUserRole,
    deleteUser
} from './controller/userController.js';
import {
    deleteTask,
    generatePlate,
    getSummaryData,
    getTaskList,
    submitPlate,
    updateTask
} from './controller/registrationController.js';


const routes = Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     tags: [Authentication]
 *     description: Sign up new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The police officer's name
 *               email:
 *                 type: string
 *                 description: The police officer's email
 *               password1:
 *                 type: string
 *                 description: New account password
 *               password2:
 *                 type: string
 *                 description: Re-enter password, must match password1
 *             example:
 *                name: Phuc Nguyen
 *                email: phuc.nguyen@mesoneer.io
 *                password1: 123456Phuc
 *                password2: 123456Phuc
 *     responses:
 *       200:
 *         description: Sign up successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Should be true
 *
 *       400:
 *         description: Sign up unsuccessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 <fieldName>:
 *                   type: string
 *                   description: Validation error (if present) for each field
 *             example:
 *               name: Name is required
 *               email: Invalid email address
 *               password2: Password does not match
 *
 *
 */
routes.post('/signup', signUpController);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Authentication]
 *     description: Log in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The police officer's email
 *               password:
 *                 type: string
 *                 description: New account password
 *             example:
 *                email: phuc.nguyen@mesoneer.io
 *                password: 123456Phuc
 *     responses:
 *       200:
 *         description: Log in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Should be true
 *                 token:
 *                   type: string
 *                   description: JWT token for user
 *               example:
 *                 success: true
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjgzMGQ2MWVmOGUxYmU5OGRhMjY5MSIsIm5hbWUiOiJQaHVjIE5ndXllbiIsImVtYWlsIjoicGh1Yy5uZ3V5ZW5AbWVzb25lZXIuaW8iLCJyb2xlIjoiRWxpdGUiLCJpYXQiOjE2OTQ0MDUzMTYsImV4cCI6MTcyNTk2MjI0Mn0.UOunveL8mg3zFjNLJeipYXLA2W8qs2yR8lrK1TfkW1E
 *
 *       400:
 *         description: Sign up unsuccessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 <fieldName>:
 *                   type: string
 *                   description: Validation error (if present) for each field
 *             example:
 *               email: Cannot find email address
 *               password: Password does not match
 *
 *
 */
routes.post('/login', loginController);

/**
 * @swagger
 * /verify:
 *   get:
 *     tags: [Authentication]
 *     description: Verify user's token
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid and ready to be used
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Should be true
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Auto generated id
 *                     email:
 *                       type: string
 *                       description: User's email
 *                     name:
 *                       type: string
 *                       description: User's full name
 *                     role:
 *                       type: string
 *                       description: User's role
 *               example:
 *                     success: true
 *                     user:
 *                       _id: 64f829486315d64ce8696ac2
 *                       email: thanhphuctkhd@gmail.com
 *                       name: Phuc Nguyen
 *                       role: Advisor
 *       401:
 *         description: Token is invalid
 *
 */
routes.get('/verify', passport.authenticate('jwt', {session: false}, ), verifyToken);

/**
 * @swagger
 * /generate-plate:
 *   post:
 *     tags: [Non-logged-in User]
 *     description: Generate a new license plate from civilian's info
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The submitting person's first name
 *               lastName:
 *                 type: string
 *                 description: The submitting person's last name
 *               email:
 *                 type: string
 *                 description: The submitting person's email
 *               dateOfBirth:
 *                 type: string
 *                 description: The submitting person's date of birth
 *               idNumber:
 *                 type: number
 *                 description: The submitting person's government issued identification number
 *               brand:
 *                 type: string
 *                 description: The submitting Armored Core's brand
 *               model:
 *                 type: string
 *                 description: The submitting Armored Core's model
 *               province:
 *                 type: string
 *                 description: The submitting person's registered province/city. This field is crucial for license plate generating
 *               address:
 *                 type: string
 *                 description: The submitting person's details address
 *               phoneNumber:
 *                 type: number
 *                 description: The submitting person's phone number
 *               gender:
 *                 type: string
 *                 description: The submitting person's gender
 *             example:
 *               firstName: Chatty
 *               lastName: Stick
 *               dateOfBirth: 1998-09-21
 *               email: chatty.stick@rad.rbc
 *               idNumber: 030098002528
 *               model: Circus
 *               brand: RaD
 *               province: TP Hồ Chí Minh
 *               address: Rubicon
 *               phoneNumber: 0332914111
 *               gender: non-binary
 *     responses:
 *       200:
 *         description: License plate generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 generatedLicensePlate:
 *                   type: string
 *                   description: The license plate generated for given civilian's info
 *                 plateId:
 *                   type: string
 *                   description: Auto-generated if for that plate
 *               example:
 *                 generatedLicensePlate: 56C2-89852
 *                 plateId: 64feb52c60e88727796701fc
 *
 *       400:
 *         description: Failed to generate License plate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 <fieldName>:
 *                   type: string
 *                   description: Validation error (if present) for each field
 *               example:
 *                 firstName: firstName is required
 *                 email: Invalid email address
 *                 idNumber: Invalid Identification Number
 *
 */
routes.post('/generate-plate', generatePlate);

/**
 * @swagger
 * /submit-plate:
 *   post:
 *     tags: [Non-logged-in User]
 *     description: Submit generated plate for police to review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plateId:
 *                 type: string
 *                 description: The id acquired from /generate-plate API
 *               generatedPlate:
 *                 type: string
 *                 description: The license plate acquired from /generate-plate API
 *     responses:
 *       200:
 *         description: License plate submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Should be true
 *
 */
routes.post('/submit-plate', submitPlate);

/**
 * @swagger
 * /summary:
 *   get:
 *     tags: [Logged-in User]
 *     security:
 *       - BearerAuth: []
 *     description: Get total user count and total task count
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUserCount:
 *                   type: number
 *                   description: Total number of users those have a lesser role than the current user
 *                 totalTaskCount:
 *                   type: number
 *                   description: Total number of unreviewed license plates
 */
routes.get('/summary', passport.authenticate('jwt', {session: false}), getSummaryData);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Logged-in User]
 *     security:
 *       - BearerAuth: []
 *     description: Get list of users according to filter and sort options
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keyword:
 *                 type: string
 *                 description: Search keyword for user list
 *               page:
 *                 type: number
 *                 description: Page number for user list
 *               pageSize:
 *                 type: number
 *                 description: Page size for user list
 *               sortBy:
 *                 type: string
 *                 description: The field name to sort user list by
 *               sortDirection:
 *                 type: string
 *                 description: The direction which is used to sort user list
 *             example:
 *               page: 1
 *               pageSize: 5
 *               sortBy: 
 *               sortDirection: asc
 *               keyword: 
 *     responses:
 *       200:
 *         description: User list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userCount:
 *                   type: number
 *                   description: Amount of user matching filtering option
 *                 userList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The auto-generated id of the user
 *                       name:
 *                         type: string
 *                         description: The user's name
 *                       email:
 *                         type: string
 *                         description: The user's email
 *                       role:
 *                         type: string
 *                         description: The user's role. User need to be at least an 'Elite' to work on tasks.
 *               example:
 *                 userList:
 *                   - _id: 64f830d61ef8e1be98da2691
 *                     email: phuc.nguyen@mesoneer.io
 *                     name: Phuc Nguyen
 *                     role: Elite
 *                   - _id: 64f831131ef8e1be98da2693
 *                     email: frodon.geeman@black.mesa
 *                     name: Gordon Freeman
 *                     role: Civil Protection
 *                   - _id: 64f831441ef8e1be98da2694
 *                     email: w.breen@combine.gl
 *                     name: Wallace Breen
 *                     role: Civil Protection
 *                   - _id: 64f834c8bc2b2683ff0f4ec4
 *                     email: walter@overseers.rc
 *                     name: Handler Walter
 *                     role: Civil Protection
 *                   - _id: 64f834ebbc2b2683ff0f4ec5
 *                     email: carla@overseers.rc
 *                     name: Cinder Carla
 *                     role: Civil Protection
 *                 userCount: 10
 *   delete:
 *     tags: [Logged-in User]
 *     security:
 *       - BearerAuth: []
 *     description: Delete user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object,
 *             properties:
 *               _id:
 *                 type: string
 *                 description: User's auto generated id
 *               email:
 *                 type: string
 *                 description: User's email
 *             example:
 *               _id: 64fe89eb098d8b178007465d
 *               email: email@address.com
 *     responses:
 *       200:
 *         description: Delete user successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Should be true
 *       400:
 *         description: Delete user unsuccessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error when deleting user
 *               example:
 *                 error: You are not authorized to delete your colleague or someone with higher rank than yours
 *
 *   put:
 *     tags: [Logged-in User]
 *     security:
 *       - BearerAuth: []
 *     description: Update user role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The user's auto-generated id
 *               role:
 *                 type: string
 *                 description: The role you want to update that user into
 *             example:
 *               _id: 64f8351dbc2b2683ff0f4ec6
 *               role: Elite
 *     responses:
 *       200:
 *         description: Update user role successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Should be true
 *       400:
 *         description: Failed to update user role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error when trying to update user role
 *               example:
 *                 error: You are not authorized to promote someone's rank to higher than yours
 */
routes.post('/users', passport.authenticate('jwt', {session: false}), getUserList);
routes.delete('/users', passport.authenticate('jwt', {session: false}), deleteUser);
routes.put('/users',  passport.authenticate('jwt', {session: false}), updateUserRole);

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags: [Logged-in User]
 *     security:
 *       - BearerAuth: []
 *     description: Get list of task according to filter and sort options
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keyword:
 *                 type: string
 *                 description: Search keyword for user list
 *               page:
 *                 type: number
 *                 description: Page number for user list
 *               pageSize:
 *                 type: number
 *                 description: Page size for user list
 *               sortBy:
 *                 type: string
 *                 description: The field name to sort user list by
 *               sortDirection:
 *                 type: string
 *                 description: The direction which is used to sort user list
 *             example:
 *               page: 1
 *               pageSize: 5
 *               sortBy:
 *               sortDirection: asc
 *               keyword:
 *     responses:
 *       200:
 *         description: Task list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskCount:
 *                   type: number
 *                   description: Amount of task matching filtering option
 *                 taskList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Auto generated id for license plate
 *                       firstName:
 *                         type: string
 *                         description: The submitting person's first name
 *                       lastName:
 *                         type: string
 *                         description: The submitting person's last name
 *                       email:
 *                         type: string
 *                         description: The submitting person's email
 *                       dateOfBirth:
 *                         type: string
 *                         description: The submitting person's date of birth
 *                       idNumber:
 *                         type: number
 *                         description: The submitting person's government issued identification number
 *                       brand:
 *                         type: string
 *                         description: The submitting Armored Core's brand
 *                       model:
 *                         type: string
 *                         description: The submitting Armored Core's model
 *                       province:
 *                         type: string
 *                         description: The submitting person's registered province/city. This field is crucial for license plate generating
 *                       address:
 *                         type: string
 *                         description: The submitting person's details address
 *                       phoneNumber:
 *                         type: number
 *                         description: The submitting person's phone number
 *                       gender:
 *                         type: string
 *                         description: The submitting person's gender
 *                       plate:
 *                         type: string
 *                         description: The license plate generated from submitted input
 *                       status:
 *                         type: string
 *                         description: Status of the task
 *               example:
 *                 taskCount: 6
 *                 taskList:
 *                   - _id: 64f6fee0d8abc0fd64d90f53
 *                     firstName: Phuc
 *                     lastName: Nguyen
 *                     dateOfBirth: '1998-09-21'
 *                     email: thanhphuctkhd@gmail.com
 *                     idNumber: 030098002528
 *                     brand: RaD
 *                     model: Raven
 *                     province: Hải Dương
 *                     address: 'Hung Dao, Tu Ky'
 *                     phoneNumber: 0332914111
 *                     gender: male
 *                     plate: 34B2-34544
 *                     status: Submitted
 *                   - _id: 64f7ea79e251cf2673da8d05
 *                     firstName: Phuc
 *                     lastName: Nguyen
 *                     dateOfBirth: '1998-09-21'
 *                     email: thanhphuctkhd@gmail.com
 *                     idNumber: 030098002528
 *                     brand: Arquebus
 *                     model: Raven
 *                     province: Hà Nội
 *                     address: '181 Lương Thế Vinh, Thanh Xuân'
 *                     phoneNumber: 0332914111
 *                     gender: male
 *                     plate: 29J3-83513
 *                     status: Submitted
 *                   - _id: 64f7eadde251cf2673da8d06
 *                     firstName: Phuc
 *                     lastName: Nguyen
 *                     dateOfBirth: '1998-09-21'
 *                     email: thanhphuctkhd@gmail.com
 *                     idNumber: 030098002528
 *                     brand: Elcano
 *                     model: LightBuild
 *                     province: Hà Nội
 *                     address: '181 Lương Thế Vinh, Thanh Xuân'
 *                     phoneNumber: 0332914111
 *                     gender: male
 *                     plate: 31Y8-22609
 *                     status: Submitted
 *                   - _id: 64f950110be16ac347d215e5
 *                     firstName: V IV
 *                     lastName: Rusty
 *                     dateOfBirth: '1998-09-21'
 *                     email: rusty@arquebus.rc
 *                     idNumber: '444444444'
 *                     brand: Arquebus
 *                     model: Steel haze
 *                     province: TP Hồ Chí Minh
 *                     address: Rubicon
 *                     phoneNumber: 0332914111
 *                     gender: male
 *                     plate: 50S9-40643
 *                     status: Submitted
 *                   - _id: 64f9596aef7d704e0fae235d
 *                     firstName: Cinder
 *                     lastName: Carla
 *                     dateOfBirth: '1998-09-21'
 *                     email: carla@rad.rc
 *                     idNumber: 030098002528
 *                     brand: RaD
 *                     model: Full Course
 *                     province: TP Hồ Chí Minh
 *                     address: Rubicon
 *                     phoneNumber: 0332914111
 *                     gender: female
 *                     plate: 56K3-18449
 *                     status: Submitted
 *   put:
 *     tags: [Logged-in User]
 *     security:
 *       - BearerAuth: []
 *     description: Update task status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Auto generated id for license plate
 *               plate:
 *                 type: string
 *                 description: The license plate generated from submitted input
 *               status:
 *                 type: string
 *                 description: The status that you want to update the task to
 *             example:
 *               _id: 64f6fee0d8abc0fd64d90f53
 *               plate: 34B2-34544
 *               status: "Approved"
 *     responses:
 *       200:
 *         description: Update task status successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Should be true
 *       400:
 *         description: Failed to update task status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error when trying to update task status
 *               example:
 *                 error: You are not allowed to perform this action
 *   delete:
 *     tags: [Logged-in User]
 *     security:
 *       - BearerAuth: []
 *     description: Delete task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object,
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Task's auto generated id
 *             example:
 *               _id: 64fe89eb098d8b178007465d
 *     responses:
 *       200:
 *         description: Delete task successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Should be true
 *       400:
 *         description: Delete task unsuccessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error when deleting user
 *               example:
 *                 error: You are not allowed to perform this action
 */
routes.post('/tasks', passport.authenticate('jwt', {session: false}), getTaskList);
routes.put('/tasks', passport.authenticate('jwt', {session: false}), updateTask);
routes.delete('/tasks', passport.authenticate('jwt', {session: false}), deleteTask)

export default routes;