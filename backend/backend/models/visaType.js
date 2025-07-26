'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VisaType extends Model {
    static associate(models) {
    }
  }
  VisaType.init({
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visa_type: {
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
    stay_period: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    validity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    entry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fees: {
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
      modelName: 'VisaType',
      tableName: "visa_types",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return VisaType;
};