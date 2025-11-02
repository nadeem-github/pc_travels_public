'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ledger extends Model {
    static associate(models) {
    }
  }
  Ledger.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },    
     service: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    ledger_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    pax: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    rate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    debit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    credit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    balance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    particulars: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    particular_remark: {
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
      modelName: 'Ledger',
      tableName: "ledgers",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return Ledger;
};