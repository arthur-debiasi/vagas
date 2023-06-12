const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateJWT = (payload) => jwt.sign({ payload }, secret, jwtConfig);

const decodeJWT = (token) => jwt.decode(token, secret);

module.exports = {
  generateJWT,
  decodeJWT,
};