const getError = require("../../../utils/throwError");
const Post = require("../../models/posts/posts.model")

const addPost = async (req, res, next) => {
    try {
        console.log("Request received to addPost: " + JSON.stringify(req.body));

        if (req.body && req.body.title && req.body.description && req.body.dateofPost ) {

            const { title, description, userId , dateofPost, location,
                status, summary } = req.body;

            const createPost = new Post({
                title,
                description,
                summary,
                userId,
                dateofPost,
                status,
                location
            });

            if (req.file) {
                const imageBuffer = req.file.buffer;
                createPost.image = imageBuffer;
            }

            await createPost.save();

            res.status(200).json({
                success: true,
            });
        } else {
            res.status(400).json({
                success: false,
                error: "Mandatory Fields Not Found"
            })
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const { postID } = req.params;

        console.log("Request received to updatepostId " + postID);

        const title = req.body.title;
        const description = req.body.description;
        const dateofPost = req.body.dateofPost;
        const summary = req.body.summary;
        const location = req.body.location;
        const status = req.body.status;
        const userId = req.body.userId;

        const updatedPost = {
            title,
            description,
            summary,
            dateofPost,
            status,
            location,
            userId
        };

        if (req.file) {
            const imageBuffer = req.file.buffer;        
            console.log("Request received to updatepostId " + postID);

            updatedPost.image = imageBuffer;
        } else if (req.body.image) {
            updatedPost.image = req.body.image
        } else {
            updatedPost.image = null;
        }

        const post = await Post.findOneAndUpdate(
            { _id: postID },
            { $set: updatedPost },
            { new: true, upsert: false }
        );

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({
            success: true,
            book: post,
            message: 'Post Updated Successfully'
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(422).json({ success: false, message: err.message });
        }
        console.log(err);
        next(err);
    }
};



const deletePost = async (req, res, next) => {
    try {
        const { postID } = req.params;
        console.log("Request received to deleteBook " + postID);

        const post = await Post.findOneAndDelete({ _id: postID });
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports = {
    addPost,
    updatePost,
    deletePost
};
