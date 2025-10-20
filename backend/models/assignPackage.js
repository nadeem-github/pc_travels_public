'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignPackage extends Model {
    static associate(models) {
    }
  }
  AssignPackage.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    group_name_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },  
    arrival_airport: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    arrival_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    arrival_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    flight_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    airline_name : {
      type: DataTypes.STRING,
      allowNull: true,
    },
     departure_airport : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departure_time : {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    departure_date : {
      type: DataTypes.DATE,
      allowNull: true,
    },
     flight_no_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    airline_name_1 : {
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
      modelName: 'AssignPackage',
      tableName: "assign_packages",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return AssignPackage;
};