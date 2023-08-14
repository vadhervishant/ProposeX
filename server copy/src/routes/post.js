const express = require('express');
const router = express.Router();

const {
    getAllPosts,
    getPostById
} = require('../controllers/posts/post');

const {
    addPost,
    updatePost,
    deletePost
} = require('../controllers/posts/configurePost');

const { verifyToken } = require("../controllers/user");
const multer = require('multer');
const upload = multer();

/**
 * @swagger
 * /api/addPost:
 *   post:
 *     summary: Add a new post
 *     tags: [Post]
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: body
 *         name: post
 *         description: Post object with title, description, dateofPost, and other fields.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             dateofPost:
 *               type: string
 *             userId:
 *               type: string
 *             location:
 *               type: string
 *             status:
 *               type: string
 *             summary:
 *               type: string
 *             image:          # Add this section if the API accepts image uploads
 *               type: string
 *               format: byte
 *     responses:
 *       200:
 *         description: Post added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *       400:
 *         description: Bad Request - Mandatory fields not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.route('/addPost').post(upload.single('image'), verifyToken, addPost);

/**
 * @swagger
 * /api/updatePost/{postID}:
 *   put:
 *     summary: Update a post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postID
 *         description: ID of the post to be updated
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dateofPost:
 *                 type: string
 *               summary:
 *                 type: string
 *               location:
 *                 type: string
 *               status:
 *                 type: string
 *               userId:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: byte
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 book:
 *                   type: object   # Update this type based on your Post schema
 *                   description: Updated post details
 *                 message:
 *                   type: string
 *                   default: Post Updated Successfully
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.route('/updatePost/:postID').post(upload.single('image'), verifyToken, updatePost);

/**
 * @swagger
 * /api/deletePost/{postID}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postID
 *         description: ID of the post to be deleted
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 message:
 *                   type: string
 *                   default: Post deleted successfully
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.route("/deletePost/:postID").delete(verifyToken, deletePost);


/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Returns an array of all posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object   # Update this type based on your Post schema
 *                 description: Post details
 *       400:
 *         description: Bad Request - Error fetching posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/posts', verifyToken, getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the post to be retrieved
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the post with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object   # Update this type based on your Post schema
 *               description: Post details
 *       400:
 *         description: Bad Request - Error fetching the post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/posts/:id', verifyToken, getPostById);



router.get('/', (req, res, next) => {
  res.send('Health OK');
});

// router.get('/*', (req, res, next) => {
//   res.send('<h1>Page Not Found</h1>');
// });


module.exports = router;
