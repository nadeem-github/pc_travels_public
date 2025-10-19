'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignPackage extends Model {
    static associate(models) {
    }
  }
  AssignPackage.init({
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    group_name_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },  
    arrival_airport: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    arrival_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    arrival_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    flight_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    airline_name : {
      type: DataTypes.STRING,
      allowNull: true,
    },
     departure_airport : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departure_time : {
      type: DataTypes.DATE,
      allowNull: true,  
    },
    departure_date : {
      type: DataTypes.DATE,
      allowNull: true,
    },
     flight_no_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    airline_name_1 : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,      
    },
    assign_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_to: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    assign_from: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    notes_2: {
      type: DataTypes.TEXT,
      allowNull: true,      
    },
    assign_time_2: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_date_2: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_to_2: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    assign_from_2: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    notes_3: {
      type: DataTypes.TEXT,
      allowNull: true,  
    },
    assign_time_3: {
      type: DataTypes.DATE, 
      allowNull: true,
    },
    assign_date_3: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_to_3: {  
      type: DataTypes.STRING,
      allowNull: true,  
    },
    assign_from_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes_4: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assign_time_4: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_date_4: {  
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_to_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assign_from_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes_5: {
      type: DataTypes.TEXT,
      allowNull: true,  
    },
    assign_time_5: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_date_5: {  
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_to_5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assign_from_5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes_6: {
      type: DataTypes.TEXT,
      allowNull: true,  
    },
    assign_time_6: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_date_6: {
      type: DataTypes.DATE,
      allowNull: true,
    },  
    assign_to_6: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    assign_from_6: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes_7: {
      type: DataTypes.TEXT,
      allowNull: true,  
    },
    assign_time_7: {
      type: DataTypes.DATE, 
      allowNull: true,
    },
    assign_date_7: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_to_7: {  
      type: DataTypes.STRING,
      allowNull: true,
    },
    assign_from_7: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes_8: {
      type: DataTypes.TEXT,
      allowNull: true,  
    },
    assign_time_8: {
      type: DataTypes.DATE, 
      allowNull: true,
    },
    assign_date_8: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_to_8: {  
      type: DataTypes.STRING,
      allowNull: true,
    },
    assign_from_8: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes_9: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assign_time_9: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_date_9: {  
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_to_9: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    assign_from_9: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes_10: {
      type: DataTypes.TEXT,
      allowNull: true,  
    },
    assign_time_10: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_date_10: {  
      type: DataTypes.DATE,
      allowNull: true,
    },
    assign_to_10: { 
      type: DataTypes.STRING,
      allowNull: true,  
    },
    assign_from_10: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    check_out:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_in:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    nights:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    rooms:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_name:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    city:{
      type: DataTypes.STRING,
      allowNull: true,
    },
   check_out_2:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_in_2:{
      type: DataTypes.DATE, 
      allowNull: true,
    },
    nights_2:{  
      type: DataTypes.STRING,
      allowNull: true,
    },
    rooms_2:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_name_2:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    city_2:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    check_out_3:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_in_3:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    nights_3:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    rooms_3:{ 
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_name_3:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    city_3:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    check_out_4:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_in_4:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    nights_4:{  
      type: DataTypes.STRING,
      allowNull: true,
    },
    rooms_4:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_name_4:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    city_4:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    check_out_5:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_in_5:{
      type: DataTypes.DATE,   
      allowNull: true,
    },
    nights_5:{  
      type: DataTypes.STRING,
      allowNull: true,
    },  
    rooms_5:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotel_name_5:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    city_5:{  
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
      modelName: 'AssignPackage',
      tableName: "assign_packages",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });

  return AssignPackage;
};