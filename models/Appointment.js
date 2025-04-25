const pool = require('../config/database');

class Appointment {
  static async create(appointmentData) {
    const [result] = await pool.query(
      'INSERT INTO appointments SET ?',
      [appointmentData]
    );
    return result.insertId;
  }

  static async findByDonor(donorId) {
    const [appointments] = await pool.query(`
      SELECT a.*, c.title as campaign_title, ct.name as center_name
      FROM appointments a
      JOIN campaigns c ON a.campaign_id = c.id
      JOIN centers ct ON a.center_id = ct.id
      WHERE a.donor_id = ?
    `, [donorId]);
    return appointments;
  }

  static async cancel(appointmentId) {
    await pool.query(
      'UPDATE appointments SET status = "cancelled" WHERE id = ?',
      [appointmentId]
    );
  }
}

module.exports = Appointment;