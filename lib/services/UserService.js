const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createJWT } = require('../utils/jwt.js');

module.exports = class UserService {
  static async create({ characterName, email, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      characterName,
      email,
      passwordHash,
    });

    return user;
  }

  static async signIn({ email, password = '' }) {
    try {
      const user = await User.getByEmail(email);

      if (!user) throw new Error('Invalid email');
      // use built in compareSync method
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password');

      // creates our JWT using built in function
      const token = createJWT(user);

      return [user, token];
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
