const User = require('../models/user');
const sendEmail = require('../../utils/mailer');
const bcrypt = require('bcrypt');
const jwtUtil = require('../../utils/jwt');
const throwError = require('../../utils/throwError');
const bodyValidator = require('../../utils/bodyValidator')

const HASH_ROUNDS = 15;

const register = async (req, res, next) => {
    try {
        if (
            Object.keys(req.body).length > 0 &&
            req.body.firstName && req.body.lastName &&
            req.body.email && req.body.password && req.body.confirmPassword
        ) {
            const { firstName, lastName, email, password, confirmPassword } =
                req.body;
            if (password !== confirmPassword) {
                throw throwError(400, 'Passwords do not match');
            }
            bodyValidator(req.body);
            const targetRecord = await User.findOne({ email });
            if (targetRecord) {
                throw throwError(409, 'Email already exists');
            }
            const passwordHash = await bcrypt.hash(password, HASH_ROUNDS);
            if (!passwordHash) {
                throw throwError(500, 'Error in password hashing');
            }
            const user = new User({
                firstName,
                lastName,
                email,
                password: passwordHash,
            });

            user
                .save()
                .then((doc) => {
                    res.status(201);
                    res.json({ message: 'User added', success: true });
                })
                .catch((err) => {
                    next(err);
                });
        } else {
            throw throwError(400, 'Invalid or missing body paramaters');
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};


const login = async (req, res, next) => {
    try {
        if (
            Object.keys(req.body).length > 0 &&
            req.body.email &&
            req.body.password
        ) {
            const { email, password } = req.body;
            const targetRecord = await User.findOne({
                email,
            });

            if (targetRecord) {
                const token = await jwtUtil.generateJWT('1h', targetRecord);
                if (await bcrypt.compare(password, targetRecord.password)) {
                    res.json({
                        message: 'Login successful',
                        success: true,
                        token,
                        user: targetRecord,
                    });
                } else {
                    throw throwError(401, 'Invalid credentials');
                }
            } else {
                throw throwError(404, 'User not found');
            }
        } else {
            throw throwError(400, 'Invalid or missing body paramaters');
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const verifyToken = async (req, res, next) => {
    try {
      let token = req.header('authorization');
      if (!token) {
        throw throwError(401, 'User unauthorized');
      }
      token = token.split(' ')[1];
      const decodedJwt = await jwtUtil.verifyJWT(token);
      if (!decodedJwt.verify) {
        throw throwError(401, 'Token expired or invalid');
      }
      req.data = decodedJwt.data;
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  



module.exports = {
    register,
    login,
    verifyToken,
}