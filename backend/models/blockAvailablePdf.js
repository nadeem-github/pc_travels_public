'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlockAvailebelPdf extends Model {
    static associate(models) {
    }
  }
  BlockAvailebelPdf.init({
    block_availeble_pdf_image_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    block_availeble_pdf_image_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    block_availeble_pdf_image_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    block_availeble_pdf_image_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    block_availeble_pdf_image_5: {
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
      modelName: 'BlockAvailebelPdf',
      tableName: "block_available_pdfs",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  
  return BlockAvailebelPdf;
};