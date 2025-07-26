'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AddYourAgent extends Model {
    static associate(models) {
    }
  }
  AddYourAgent.init({
    agent_area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agent_photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agent_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agent_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     agent_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agent_address: {
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
      modelName: 'AddYourAgent',
      tableName: "add_your_agents",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return AddYourAgent;
};