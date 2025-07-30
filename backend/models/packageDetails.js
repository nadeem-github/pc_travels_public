'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PackageDetail extends Model {
    static associate(models) {
    }
  }
  PackageDetail.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    days: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departure_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    departure_location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    arrival_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    arrival_location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    airline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_distance_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_distance_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_distance_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    package_logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    package_filter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sequence: {
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
      modelName: 'PackageDetail',
      tableName: "package_details",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return PackageDetail;
};