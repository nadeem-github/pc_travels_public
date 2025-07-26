'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VisaDocument extends Model {
    static associate(models) {
    }
  }
  VisaDocument.init({
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visa_document: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },  
    doc_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_6: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_7: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_8: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_9: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_10: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_11: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_12: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_13: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_14: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_15: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_16: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_17: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_18: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_19: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_20: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_21: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_22: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_23: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_24: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_25: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_26: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_27: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_28: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_29: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_30: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_31: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_32: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_33: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_34: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_35: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_36: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_37: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_38: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    doc_39: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_40: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    notes: {
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
      modelName: 'VisaDocument',
      tableName: "visa_documents",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return VisaDocument;
};