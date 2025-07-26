'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
    }
  }
  Hotel.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_image_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_image_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     hotel_image_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     hotel_image_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     hotel_image_5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
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
      modelName: 'Hotel',
      tableName: "hotels",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return Hotel;
};