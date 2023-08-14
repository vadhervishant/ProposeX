const postsModel = require('../../models/posts/posts.model');

exports.getAllPosts = async (req, res) => {
  try {
    // const { title, authors, genre } = req.query;
    const posts = await postsModel.find();

    console.log('POSTS HIT >>>>>>>>>>>>>>>>>.', posts)

    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const currentUserId = req.data.user._id;
    const book = await postsModel.findById(id);
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
