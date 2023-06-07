const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('../utils/dbConn');



const userRoute = require('./routes/user');
const jsonParser = bodyParser.json({ limit: '5mb' });


app.use(cors());
app.use(jsonParser);
app.use('/api', userRoute);


module.exports = app;
module.exports.handler = serverless(app);