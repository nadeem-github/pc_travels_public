'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignPackageTransportDetails extends Model {
    static associate(models) {
    }
  }
  AssignPackageTransportDetails.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    group_name_number: {
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
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,      
    },
    assign_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assign_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_to: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    assign_from: {
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
      modelName: 'AssignPackageTransportDetails',
      tableName: "assign_package_transport_details",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return AssignPackageTransportDetails;
};