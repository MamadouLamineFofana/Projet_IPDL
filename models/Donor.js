const pool = require('../config/database');

class Donor {
  static async create(donorData) {
    const [result] = await pool.query(
      'INSERT INTO donors SET ?',
      [donorData]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [donors] = await pool.query(
      'SELECT * FROM donors WHERE user_id = ? LIMIT 1',
      [userId]
    );
    return donors[0];
  }

  static async updateMedicalInfo(userId, medicalData) {
    await pool.query(
      'UPDATE donors SET ? WHERE user_id = ?',
      [medicalData, userId]
    );
  }
}

module.exports = Donor;