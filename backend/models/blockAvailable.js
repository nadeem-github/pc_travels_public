'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlockAvailable extends Model {
    static associate(models) {
    }
  }
  BlockAvailable.init({

    airline_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    airline_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     airline_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     airline_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    
     airline_image_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    airline_image_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     airline_image_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    airline_image_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     from_date_1: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    from_date_2: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    from_date_3: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    from_date_4: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    flight_number_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flight_number_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flight_number_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flight_number_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departure_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departure_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departure_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departure_4: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    departure_time_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departure_time_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departure_time_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departure_time_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destination_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destination_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     destination_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destination_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     destination_time_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destination_time_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destination_time_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destination_time_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    to_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },

    r_airline_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_airline_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     r_airline_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     r_airline_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    
     r_airline_image_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_airline_image_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     r_airline_image_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_airline_image_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     r_from_date_1: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    r_from_date_2: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    r_from_date_3: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    r_from_date_4: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    r_flight_number_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_flight_number_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_flight_number_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_flight_number_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_departure_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_departure_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_departure_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_departure_4: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    r_departure_time_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_departure_time_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_departure_time_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_departure_time_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_destination_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_destination_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     r_destination_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_destination_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     r_destination_time_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_destination_time_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_destination_time_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_destination_time_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_to_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  },
    {
      sequelize,
      modelName: 'BlockAvailable',
      tableName: "block_availables",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return BlockAvailable;
};