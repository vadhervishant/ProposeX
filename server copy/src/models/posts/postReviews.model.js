const mongoose = require('../../../utils/dbConn');


const postReviewsModel = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('postReviews', postReviewsModel);
