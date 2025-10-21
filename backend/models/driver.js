'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    static associate(models) {
    }
  }
  Driver.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     transport_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    group_name_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driver_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driver_mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bus_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    d_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    to_location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    remarks: {
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
      modelName: 'Driver',
      tableName: "drivers",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return Driver;
};