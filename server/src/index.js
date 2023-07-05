const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
require('../utils/dbConn');



const userRoute = require('./routes/user');
const jsonParser = bodyParser.json({ limit: '5mb' });

// const options = {
//     failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
//     definition: {
//       openapi: '3.0.0',
//       info: {
//         title: 'Hello World',
//         version: '1.0.0',
//       },
//     },
//     apis: ['./src/routes*.js'],
//   };

// const openapiSpecification = swaggerJsdoc(options);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(cors());
app.use(jsonParser);
app.use('/api', userRoute);


module.exports = app;
module.exports.handler = serverless(app);