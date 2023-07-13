const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ProposeX API Documentation',
      version: '1.0.0',
      description: 'This serves the API documentation for ProposeX Backend Service',
    },
  },
  apis: ['./src/routes/user.js'], // Specify the path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

const serveSwaggerUI = swaggerUi.serve;
const setupSwaggerUI = swaggerUi.setup(swaggerSpec);

module.exports = { serveSwaggerUI, setupSwaggerUI };
