import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDocs from 'swagger-jsdoc';

import './src/loadEnv.js';
import passportConfig from './src/passport.js';
import routes from './src/routes.js';

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

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Vehicle Registration APIs',
            version: '0.9.13',
            description: 'Simple API system to handle vehicle registration'
        },
    },
    apis: ['./src/routes.js'], // files containing annotations as above
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs(options)));

app.use(routes);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));