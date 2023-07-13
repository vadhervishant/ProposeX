const express = require('express');
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyToken,
  changePassword,
  getUserProfile,
  updateUserProfile,
  getUserProfileByID,
} = require('../controllers/user');

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Invalid request or passwords do not match
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.route('/register').post(register);
router.route('/login').post(login)
router.route('/forgotpassword').post(forgotPassword);
router.route('/verifycode').post(resetPassword);
router.route('/changepassword').put(verifyToken, changePassword);
router.route('/profile').get(verifyToken, getUserProfile).put(verifyToken, updateUserProfile);
router.route('/profile/:id').get(verifyToken, getUserProfileByID);

router.get('/', (req, res, next) => {
  res.send('Health OK');
});
router.get('/*', (req, res, next) => {
  res.send('<h1>Page Not Found</h1>');
});


module.exports = router;
