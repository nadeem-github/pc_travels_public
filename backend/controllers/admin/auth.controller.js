const { User } = require("@models");
const bcrypt_p = require("bcrypt-promise");
const jwt = require("jsonwebtoken");
const CONFIG = require("@config/config.json");
const appService = require("@services/app.service");
const config = require("@config/app.json")[appService.env];
const { ReE, ReS, to } = require("@services/util.service");
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');


// ===================== LOGIN =====================
const login = async (req, res) => {
  const { password, username } = req.body;
  const [err, user] = await to(User.findOne({
    attributes: ['id', 'username', 'password'],
    where: { username }
  }));
  if (err || !user) return ReE(res, {
    message: "Please enter the registered email address. The user is not registered with us."
  }, 400);

  const isMatch = await bcrypt_p.compare(password, user.password);
  if (!isMatch) return ReE(res, {
    message: "The password you entered is incorrect. Please try again."
  }, 400);

  const token = jwt.sign(
    { user_id: user.id, username: user.username },
    CONFIG.jwt_encryption,
    { expiresIn: '365d' }
  );

  return ReS(res, { user, token });
};


// ===================== REGISTER =====================
const Register = async (req, res) => {
  const { password, username } = req.body;

  const [err, existingUser] = await to(User.findOne({ where: { username } }));
  if (err) return ReE(res, { message: "DB Error", err }, 500);

  if (existingUser) {
    return ReE(res, { message: "User already exists. Please login!" }, 400);
  }

  const [createErr, newUser] = await to(User.create({ username, password }));
  if (createErr) return ReE(res, { message: "Failed to create user", err: createErr }, 500);

  return ReS(res, { user: newUser, message: "User registered successfully." }, 200);
};


// ===================== Download sql =====================
const downloadSql = async (req, res) => {
  const DB_USER = CONFIG.production.username;
  const DB_PASS = CONFIG.production.password;
  const DB_NAME = CONFIG.production.database;

  const dumpFile = `backup-${Date.now()}.sql`;
  const dumpPath = path.join(__dirname, dumpFile);

  const dumpCommand = `mysqldump -u ${DB_USER} -p${DB_PASS} ${DB_NAME} > ${dumpPath}`;

  exec(dumpCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Dump error: ${error.message}`);
      return res.status(500).send('Failed to dump database');
    }

    // 📤 Send file as download
    res.download(dumpPath, (err) => {
      if (err) {
        console.error('File send error:', err);
      }

      // 🧹 Clean up the dump file after sending
      fs.unlink(dumpPath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting dump file:', unlinkErr);
      });
    });
  });
};
module.exports = {
  login,
  Register,
  downloadSql
};
