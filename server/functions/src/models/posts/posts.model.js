const mongoose = require('../../../utils/dbConn');

const postModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    text: true,
    trim: true
  },
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  dateofPost: {
    type: Date,
  },
  image: {
    type: Buffer
  }, 
  location: {
    type: String,
    trim: true
  },
  completionDate: {
    type: Date,
  },
  status: {
    type: String,
    text: true,
  },
  totalVotes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('posts', postModel);
