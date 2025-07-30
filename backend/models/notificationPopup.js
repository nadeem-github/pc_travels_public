'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotificationPopup extends Model {
    static associate(models) {
    }
  }
  NotificationPopup.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_2: {
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
      modelName: 'NotificationPopup',
      tableName: "notification_popups",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return NotificationPopup;
};