'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FlightDetail extends Model {
    static associate(models) {
    }
  }
  FlightDetail.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    group_name_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_of_arrival : {
      allowNull: true,
      type: DataTypes.DATE,
    },
    flight_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    airport_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    airlines_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_of_departure: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    flight_number_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    airport_name_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    airlines_number_1: {
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
      modelName: 'FlightDetail',
      tableName: "flight_details",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return FlightDetail;
};