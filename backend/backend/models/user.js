'use strict';
const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");
const { TE, to } = require("@services/util.service");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  },
    {
      sequelize,
      modelName: 'User',
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
    User.beforeSave(async (user, options) => {
      let err;
  
      if (user.changed("password")) {
        let salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if (err) TE(err.message, true);
  
        [err, hash] = await to(bcrypt.hash(user.password, salt));
        if (err) TE(err.message, true);
  
        user.password = hash;
      }
    });
  
    User.prototype.comparePassword = async function (pw) {
      let err, pass;
      if (!this.password) TE("password not set");
  
      [err, pass] = await to(bcrypt_p.compare(pw, this.password));
      if (err) TE(err);
  
      if (!pass) TE("invalid password");
  
      return this;
    };
  return User;
};