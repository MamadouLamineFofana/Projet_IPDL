const db = require("./db");

exports.createDonor = async ({ user_id, blood_type, medical_history }) => {
  const [result] = await db.query(
    "INSERT INTO donors (user_id, blood_type, medical_history) VALUES (?, ?, ?)",
    [user_id, blood_type, JSON.stringify(medical_history)]
  );
  return result.insertId;
};

exports.findByUserId = async (user_id) => {
  const [rows] = await db.query("SELECT * FROM donors WHERE user_id = ?", [user_id]);
  return rows[0];
};
