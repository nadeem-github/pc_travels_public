'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlockHome extends Model {
    static associate(models) {
    }
  }
  BlockHome.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    block_home_image: {
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
      modelName: 'BlockHome',
      tableName: "block_homes",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return BlockHome;
};