const db = require("./db");

exports.getActiveCampaigns = async () => {
  const [rows] = await db.query("SELECT * FROM campaigns WHERE status = 'active'");
  return rows;
};

exports.getCampaignById = async (id) => {
  const [rows] = await db.query("SELECT * FROM campaigns WHERE id = ?", [id]);
  return rows[0];
};

exports.createCampaign = async (data) => {
  const [result] = await db.query(
    "INSERT INTO campaigns (title, description, start_date, end_date, status, created_by) VALUES (?, ?, ?, ?, ?, ?)",
    [data.title, data.description, data.start_date, data.end_date, data.status, data.created_by]
  );
  return result.insertId;
};

exports.closeCampaign = async (id) => {
  await db.query("UPDATE campaigns SET status = 'closed' WHERE id = ?", [id]);
};

exports.getAllCampaigns = async () => {
  const [rows] = await db.query("SELECT * FROM campaigns ORDER BY start_date DESC");
  return rows;
};

exports.updateCampaign = async (id, data) => {
  const { title, description, start_date, end_date } = data;
  await db.query(
    "UPDATE campaigns SET title = ?, description = ?, start_date = ?, end_date = ?, updated_at = NOW() WHERE id = ?",
    [title, description, start_date, end_date, id]
  );
};


//const db = require('./db'); // adapte selon ta connexion

exports.registerUserToCampaign = async (userId, campaignId) => {
  await db.query(
    "INSERT IGNORE INTO campaign_registrations (user_id, campaign_id) VALUES (?, ?)",
    [userId, campaignId]
  );
};
