'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MutamersList extends Model {
    static associate(models) {
    }
  }
  MutamersList.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    group_name_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    group_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flight_details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    arrival_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
   
    group_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transport_route: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    view_dirver_details: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    mutamer_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mutamer_age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    passport_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    main_external_agent_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    main_external_agent_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sub_ea_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sub_ea_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visa_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    biometric_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visa_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mofa_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    leader_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    upload_visa_pdf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     return_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  },
    {
      sequelize,
      modelName: 'MutamersList',
      tableName: "mutamers_list",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
      //mutamers_list_
    });

  return MutamersList;
};