const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoute = require('./routes/user');

const jsonParser = bodyParser.json({ limit: '5mb' });
app.use(cors());
app.use(jsonParser);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for the API endpoints',
    },
  },
  apis: ['./src/routes/user.js'], // Specify the path to your route files
};

const swaggerSpec = swaggerJsdoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api-docs', swaggerUi.serveFiles(swaggerSpec), swaggerUi.setup(swaggerSpec));

app.use('/api', userRoute);

module.exports = app;
module.exports.handler = serverless(app);
