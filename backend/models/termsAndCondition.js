'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TermsAndCondition extends Model {
    static associate(models) {
    }
  }
  TermsAndCondition.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tac_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,  
      defaultValue: true 
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  },
    {
      sequelize,
      modelName: 'TermsAndCondition',
      tableName: "terms_and_conditions",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return TermsAndCondition;
};