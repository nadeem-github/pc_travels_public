'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LedgerOpeningBalance extends Model {
    static associate(models) {
    }
  }
  LedgerOpeningBalance.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    opening_balance: {
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
      modelName: 'LedgerOpeningBalance',
      tableName: "ledger_opening_balances",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return LedgerOpeningBalance;
};