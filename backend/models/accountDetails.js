'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountDetails extends Model {
    static associate(models) {
    }
  }
  AccountDetails.init({
    bank_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ifsc_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    upload_qr_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  },
    {
      sequelize,
      modelName: 'AccountDetails',
      tableName: "account_details",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return AccountDetails;
};