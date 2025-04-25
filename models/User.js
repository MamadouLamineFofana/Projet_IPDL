const pool = require('../config/database');

class User {
  static async findByEmail(email) {
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return users[0];
  }

  static async findById(id) {
    const [users] = await pool.query(
      'SELECT id, email, first_name, last_name, role FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    return users[0];
  }

  static async create(userData) {
    const [result] = await pool.query(
      'INSERT INTO users SET ?',
      [userData]
    );
    return result.insertId;
  }
}

module.exports = User;