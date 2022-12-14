const pool = require('../utils/pool');

module.exports = class User {
  id;
  characterName;
  email;
  #passwordHash; // private class field: hides it from anything outside of this class definition
  currentStoryId;

  constructor(row) {
    this.id = row.id;
    this.characterName = row.character_name;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
    this.currentStoryId = row.current_story_id;
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

  static async update(userEmail, currentStoryId) {
    const data = await User.getByEmail(userEmail);
    if (!data) {
      return null;
    }
    const { rows } = await pool.query(
      `
      UPDATE users
      SET current_story_id = $2
      WHERE id = $1
      RETURNING *`,
      [data.id, currentStoryId]
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
