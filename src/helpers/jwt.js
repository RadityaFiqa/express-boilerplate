const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refreshSecret';

const createToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

const createRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, JWT_REFRESH_SECRET, options);
};

const verifyToken = (token) => {
  const verify = jwt.verify(token, JWT_SECRET);
  if (!verify) {
    return false;
  }
  return true;
};

const generateRefreshToken = (token) => {
  const verify = jwt.verify(token, JWT_REFRESH_SECRET);
  if (!verify) {
    return false;
  }

  return createToken({ id: verify.id, email: verify.email, name: verify.name });
};

module.exports = {
  createRefreshToken,
  createToken,
  verifyToken,
  generateRefreshToken,
};
