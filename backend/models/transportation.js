'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transportation extends Model {
    static associate(models) {
    }
  }
  Transportation.init({
    transport_image_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transport_image_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transport_pdf_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
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
      modelName: 'Transportation',
      tableName: "transportations",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return Transportation;
};