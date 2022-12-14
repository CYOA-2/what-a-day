const pool = require('../utils/pool');

module.exports = class User {
  id;
  // firstName;
  // lastName;
  characterName;
  email;
  #passwordHash; // private class field: hides it from anything outside of this class definition


  constructor(row) {
    this.id = row.id;
    // this.firstName = row.first_name;
    // this.lastName = row.last_name;
    this.characterName = row.character_name;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }

  static async insert({ characterName, email, passwordHash }) {
    const { rows } = await pool.query(
      `
      INSERT INTO users (character_name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [characterName, email, passwordHash]
    );

    return new User(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM users');

    return rows.map((row) => new User(row));
  }

  static async getByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email=$1
      `,
      [email]
    );

    if (!rows[0]) return null;

    return new User(rows[0]);
  }

  get passwordHash() {
    return this.#passwordHash;
  }
};
