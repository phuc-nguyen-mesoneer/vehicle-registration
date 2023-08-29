import express from 'express';
import cors from 'cors';
import './loadEnv.js';
import {

} from './controller/userController.js';
import {

} from './controller/registrationController.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', )