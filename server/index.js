import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import './src/loadEnv.js';
import passportConfig from './src/passport.js';
import {
    signUpController,
    loginController,
    verifyController
} from './src/controller/userController.js';
import {
    generatePlateController,
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

app.get('/verify', passport.authenticate('jwt', {session: false}), verifyController);

app.post('/generate-plate', generatePlateController);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));