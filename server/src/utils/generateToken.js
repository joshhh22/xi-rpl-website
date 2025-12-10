const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'dev_secret_xi_rpl';
  return jwt.sign({ id }, secret, { expiresIn: '7d' });
};

module.exports = generateToken;
