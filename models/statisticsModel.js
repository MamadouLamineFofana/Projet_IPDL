const db = require("./db");

exports.getGlobalStats = async () => {
  const [rows] = await db.query(`
    SELECT 
      (SELECT COUNT(*) FROM donors) as total_donors,
      (SELECT COUNT(*) FROM appointments) as total_appointments,
      (SELECT COUNT(*) FROM appointments WHERE status='completed') as completed_appointments,
      (SELECT COUNT(*) FROM appointments WHERE status='cancelled') as cancelled_appointments
  `);
  return rows[0];
};
