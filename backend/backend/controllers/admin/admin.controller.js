const { User } = require("@models");
const bcrypt_p = require("bcrypt-promise");
const jwt = require("jsonwebtoken");
const CONFIG = require("@config/config.json");
const appService = require("@services/app.service");
const config = require("@config/app.json")[appService.env];
const { ReE, ReS, to } = require("@services/util.service");


// ===================== LOGIN =====================
const fetch = async (req, res) => {


  return ReS(res, { message: req.user.id });
};


// ===================== REGISTER =====================



module.exports = {
  fetch,
};
