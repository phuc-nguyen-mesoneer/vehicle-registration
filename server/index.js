import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import './src/loadEnv.js';
import passportConfig from './src/passport.js';
import {
    signUpController,
    loginController,
    verifyToken,
    getUserList,
    updateUserRole,
    deleteUser
} from './src/controller/userController.js';
import {
    generatePlate,
    getSummaryData,
    getTaskList,
    submitPlate, updateTask
} from './src/controller/registrationController.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use(passport.initialize());
passportConfig(passport);

app.post('/signup', signUpController);

app.post('/login', loginController);

app.get('/verify', passport.authenticate('jwt', {session: false}, ), verifyToken);

app.post('/generate-plate', generatePlate);
app.post('/submit-plate', submitPlate);

app.get('/summary', passport.authenticate('jwt', {session: false}), getSummaryData);

app.post('/users', passport.authenticate('jwt', {session: false}), getUserList);
app.delete('/users', passport.authenticate('jwt', {session: false}), deleteUser);

app.post('/tasks', passport.authenticate('jwt', {session: false}), getTaskList);

app.put('/user-role',  passport.authenticate('jwt', {session: false}), updateUserRole);
app.put('/tasks',  passport.authenticate('jwt', {session: false}), updateTask);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));