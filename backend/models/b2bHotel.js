'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class B2bHotel extends Model {
    static associate(models) {
    }
  }
  B2bHotel.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    group_name_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    check_in: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    check_out: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nights: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rooms: {
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
      modelName: 'B2bHotel',
      tableName: "b2b_hotels",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return B2bHotel;
};