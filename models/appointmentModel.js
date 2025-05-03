const db = require("./db");

exports.createAppointment = async ({ donor_id, campaign_id, center_id, date_time }) => {
  const [result] = await db.query(
    "INSERT INTO appointments (donor_id, campaign_id, center_id, date_time) VALUES (?, ?, ?, ?)",
    [donor_id, campaign_id, center_id, date_time]
  );
  return result.insertId;
};

exports.getAppointmentsByDonor = async (donor_id) => {
  const [rows] = await db.query("SELECT * FROM appointments WHERE donor_id = ?", [donor_id]);
  return rows;
};

exports.updateAppointment = async (id, { date_time, center_id }) => {
  await db.query(
    "UPDATE appointments SET date_time = ?, center_id = ? WHERE id = ?",
    [date_time, center_id, id]
  );
};

exports.cancelAppointment = async (id) => {
  await db.query("UPDATE appointments SET status = 'cancelled' WHERE id = ?", [id]);
};

exports.getAllAppointments = async () => {
  const [rows] = await db.query(`
    SELECT a.*, d.user_id, c.title as campaign_title, ce.name as center_name 
    FROM appointments a
    JOIN donors d ON a.donor_id = d.id
    JOIN campaigns c ON a.campaign_id = c.id
    JOIN centers ce ON a.center_id = ce.id
    ORDER BY a.date_time DESC
  `);
  return rows;
};

exports.updateAppointmentStatus = async (id, status) => {
  await db.query("UPDATE appointments SET status = ?, updated_at = NOW() WHERE id = ?", [status, id]);
};
