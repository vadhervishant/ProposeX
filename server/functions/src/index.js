const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const reviewRoute = require('./routes/review');

const { serveSwaggerUI, setupSwaggerUI } = require('./../utils/swagger');

const jsonParser = bodyParser.json({ limit: '5mb' });
app.use(cors());
app.use(jsonParser);

https://proposex.onrender.com/api/


app.use('/api', userRoute);
app.use('/api', postRoute);
app.use('/api', reviewRoute);
app.use('/api-docs', serveSwaggerUI, setupSwaggerUI);

module.exports = app;
module.exports.handler = serverless(app);
