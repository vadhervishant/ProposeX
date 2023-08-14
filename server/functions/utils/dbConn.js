const mongoose = require('mongoose');
const conn_string = 'mongodb+srv://vadhervishant:admin@maincluster.8n5tqju.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(conn_string)
  .then((db) => {
    console.info('Cloud MongoDB connected ..');
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;
