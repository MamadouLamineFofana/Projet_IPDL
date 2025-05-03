const db = require("./db");

exports.getAllCenters = async () => {
  const [rows] = await db.query("SELECT * FROM centers");
  return rows;
};

exports.createCenter = async (data) => {
  const { name, street, city, zip_code, country, phone, email, capacity } = data;
  const [result] = await db.query(
    "INSERT INTO centers (name, street, city, zip_code, country, phone, email, capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [name, street, city, zip_code, country, phone, email, capacity]
  );
  return result.insertId;
};

exports.getCenterById = async (id) => {
  const [rows] = await db.query("SELECT * FROM centers WHERE id = ?", [id]);
  return rows[0];
};

exports.updateCenter = async (id, data) => {
  const { name, street, city, zip_code, country, phone, email, capacity } = data;
  await db.query(
    "UPDATE centers SET name = ?, street = ?, city = ?, zip_code = ?, country = ?, phone = ?, email = ?, capacity = ?, updated_at = NOW() WHERE id = ?",
    [name, street, city, zip_code, country, phone, email, capacity, id]
  );
};

exports.deleteCenter = async (id) => {
  await db.query("DELETE FROM centers WHERE id = ?", [id]);
};
