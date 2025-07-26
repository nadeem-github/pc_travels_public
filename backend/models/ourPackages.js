'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OurPackage extends Model {
    static associate(models) {
    }
  }
  OurPackage.init({
    package_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel1_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel2_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  },
    {
      sequelize,
      modelName: 'OurPackage',
      tableName: "our_packages",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return OurPackage;
};