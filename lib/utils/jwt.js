const jwt = require('jsonwebtoken');

function createJWT(user) {
  return jwt.sign({ ...user }, process.env.JWT_SECRET, {
    expiresIn: '1 day',
  });
}

module.exports = { createJWT };
