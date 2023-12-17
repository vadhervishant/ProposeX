const mongoose = require('mongoose');
const conn_string = '';

mongoose.connect(conn_string)
  .then((db) => {
    console.info('Cloud MongoDB connected ..');
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;
