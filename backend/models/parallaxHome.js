'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParallaxHome extends Model {
    static associate(models) {
    }
  }
  ParallaxHome.init({
    parallax_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     description1: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description2: {
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
      modelName: 'ParallaxHome',
      tableName: "parallax_homes",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return ParallaxHome;
};