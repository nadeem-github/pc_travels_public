'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AboutUs extends Model {
    static associate(models) {
    }
  }
  AboutUs.init({
    about_image_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about_image_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about_image_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
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
      modelName: 'AboutUs',
      tableName: "about_us",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return AboutUs;
};