'use strict';
const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");
const { TE, to } = require("@services/util.service");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class B2bUser extends Model {
    static associate(models) {
    }
  }
  B2bUser.init({
    company_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    person_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whatsapp_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whatsapp_number_verify: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_verify: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("complete", "pending", "hold"),
      allowNull: true,
      defaultValue: "pending",
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  },
    {
      sequelize,
      modelName: 'B2bUser',
      tableName: "b2b_users",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  B2bUser.beforeSave(async (user, options) => {
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

  B2bUser.prototype.comparePassword = async function (pw) {
    let err, pass;
    if (!this.password) TE("password not set");

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);

    if (!pass) TE("invalid password");

    return this;
  };
  return B2bUser;
};