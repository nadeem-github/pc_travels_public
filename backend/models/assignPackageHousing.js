'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignPackageHousing extends Model {
    static associate(models) {
    }
  }
  AssignPackageHousing.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    group_name_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },  
     notes: {
      type: DataTypes.TEXT,
      allowNull: true,      
    },
    check_out:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_in:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    nights:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    rooms:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_name:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    city:{
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
      modelName: 'AssignPackageHousing',
      tableName: "assign_package_housing",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return AssignPackageHousing;
};