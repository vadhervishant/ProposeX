const mongoose = require('mongoose');
require('dotenv').config();

const conn_string = process.env.MONGODB_URI;

mongoose.connect(conn_string)
  .then((db) => {
    console.info('Cloud MongoDB connected ..');
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;
