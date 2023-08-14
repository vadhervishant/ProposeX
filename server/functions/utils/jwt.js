
// require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJWT = async (expiresIn, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await jwt.sign({ user }, 'ProjectX@007', {
        expiresIn,
      });
      resolve(token);
    } catch (err) {
      reject(err);
    }
  });
};

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, 'ProjectX@007', (err, data) => {
        if (err) {
          resolve({ verify: false, data: null });
        } else {
          resolve({ verify: true, data });
        }
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

module.exports = {
  generateJWT,
  verifyJWT,
};
