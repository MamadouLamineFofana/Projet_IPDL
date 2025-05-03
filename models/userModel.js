const db = require("./db");
const bcrypt = require("bcrypt");

exports.createUser = async ({ email, password, first_name, last_name }) => {
  const hash = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
    [email, hash, first_name, last_name]
  );
  return result.insertId;
};

exports.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};
