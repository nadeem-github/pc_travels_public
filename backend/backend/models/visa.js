'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visa extends Model {
    static associate(models) {
    }
  }
  Visa.init({
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    processing_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    starting_from_price: {
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
      modelName: 'Visa',
      tableName: "visas",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return Visa;
};