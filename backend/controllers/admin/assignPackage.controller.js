const { AssignPackage } = require("@models");
const hotel = require("@root/models/hotel");
const { ReE, ReS, to } = require("@services/util.service");
const { check } = require("express-validator");
const { assign } = require("nodemailer/lib/shared");


const fetch = async function (req, res) {
  try {
    let body = req.body;
    const data = await AssignPackage.findAll({
      order: [['id', 'DESC']],
      where: {
        email: body.email,
        group_name_number: body.group_name_number,
      }
    });
    if (!data) {
      return ReE(res, { message: "No Data Found" }, 200);
    }
    return ReS(res, { data: data, message: "success" });
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const create = async (req, res) => {
  try {
    let body = req.body;

    const data = await AssignPackage.create({
      email: body.email,
      group_name_number: body.group_name_number,
      arrival_airport: body.arrival_airport,
      arrival_time: body.arrival_time,
      arrival_date: body.arrival_date,
      flight_no: body.flight_no,
      airline_name: body.airline_name,
      departure_airport: body.departure_airport,
      departure_time: body.departure_time,
      departure_date: body.departure_date,
      flight_no_1: body.flight_no_1,
      airline_name_1: body.airline_name_1,
      notes: body.notes,
      assign_time: body.assign_time,
      assign_date: body.assign_date,
      assign_to: body.assign_to,
      assign_from: body.assign_from,
      notes_2: body.notes_2,
      assign_time_2: body.assign_time_2,
      assign_date_2: body.assign_date_2,
      assign_to_2: body.assign_to_2,
      assign_from_2: body.assign_from_2,
      notes_3: body.notes_3,
      assign_time_3: body.assign_time_3,
      assign_date_3: body.assign_date_3,
      assign_to_3: body.assign_to_3,
      assign_from_3: body.assign_from_3,
      notes_4: body.notes_4,
      assign_time_4: body.assign_time_4,
      assign_date_4: body.assign_date_4,
      assign_to_4: body.assign_to_4,
      assign_from_4: body.assign_from_4,
      notes_5: body.notes_5,
      assign_time_5: body.assign_time_5,
      assign_date_5: body.assign_date_5,
      assign_to_5: body.assign_to_5,
      assign_from_5: body.assign_from_5,
      notes_6: body.notes_6,
      assign_time_6: body.assign_time_6,
      assign_date_6: body.assign_date_6,
      assign_to_6: body.assign_to_6,
      assign_from_6: body.assign_from_6,
      notes_7: body.notes_7,
      assign_time_7: body.assign_time_7,
      assign_date_7: body.assign_date_7,
      assign_to_7: body.assign_to_7,
      assign_from_7: body.assign_from_7,
      notes_8: body.notes_8,
      assign_time_8: body.assign_time_8,
      assign_date_8: body.assign_date_8,
      assign_to_8: body.assign_to_8,
      assign_from_8: body.assign_from_8,
      notes_9: body.notes_9,
      assign_time_9: body.assign_time_9,
      assign_date_9: body.assign_date_9,
      assign_to_9: body.assign_to_9,
      assign_from_9: body.assign_from_9,
      notes_10: body.notes_10,
      assign_time_10: body.assign_time_10,
      assign_date_10: body.assign_date_10,
      assign_to_10: body.assign_to_10,
      assign_from_10: body.assign_from_10,
      check_out: body.check_out,
      check_in: body.check_in,
      nights: body.nights,
      rooms: body.rooms,
      hotel_name: body.hotel_name,
      city: body.city,
      check_out_2: body.check_out_2,
      check_in_2: body.check_in_2,
      nights_2: body.nights_2,
      rooms_2: body.rooms_2,
      hotel_name_2: body.hotel_name_2,
      city_2: body.city_2,
      check_out_3: body.check_out_3,
      check_in_3: body.check_in_3,
      nights_3: body.nights_3,
      rooms_3: body.rooms_3,
      hotel_name_3: body.hotel_name_3,
      city_3: body.city_3,
      check_out_4: body.check_out_4,
      check_in_4: body.check_in_4,
      nights_4: body.nights_4,
      rooms_4: body.rooms_4,
      hotel_name_4: body.hotel_name_4,
      city_4: body.city_4,
      check_out_5: body.check_out_5,
      check_in_5: body.check_in_5,
      nights_5: body.nights_5,
      rooms_5: body.rooms_5,
      hotel_name_5: body.hotel_name_5,
      city_5: body.city_5,



    });

    if (data) {
      return ReS(res, { message: "AssignPackage created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    const data = await AssignPackage.findOne({
      where: {
        email: body.email,
        group_name_number: body.group_name_number,
      }
    });
    if (!data) {
      return ReE(res, { message: "No Data Found" }, 200);
    }
    return ReS(res, { data: data, message: "success" });
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};

const update = async function (req, res) {
  try {
    let body = req.body;
    const files = req.files;
    const existData = await AssignPackage.findOne({
      where: {
        email: body.email,
        group_name_number: body.group_name_number,
      }
    });

    await AssignPackage.update({
      arrival_airport: body.arrival_airport ? body.arrival_airport : existData.arrival_airport,
      arrival_time: body.arrival_time ? body.arrival_time : existData.arrival_time,
      arrival_date: body.arrival_date ? body.arrival_date : existData.arrival_date,
      flight_no: body.flight_no ? body.flight_no : existData.flight_no,
      airline_name: body.airline_name ? body.airline_name : existData.airline_name,
      departure_airport: body.departure_airport ? body.departure_airport : existData.departure_airport,
      departure_time: body.departure_time ? body.departure_time : existData.departure_time,
      departure_date: body.departure_date ? body.departure_date : existData.departure_date,
      flight_no_1: body.flight_no_1 ? body.flight_no_1 : existData.flight_no_1,
      airline_name_1: body.airline_name_1 ? body.airline_name_1 : existData.airline_name_1,
      notes: body.notes ? body.notes : existData.notes,
      assign_time: body.assign_time ? body.assign_time : existData.assign_time,
      assign_date: body.assign_date ? body.assign_date : existData.assign_date,
      assign_to: body.assign_to ? body.assign_to : existData.assign_to,
      assign_from: body.assign_from ? body.assign_from : existData.assign_from,
      notes_2: body.notes_2 ? body.notes_2 : existData.notes_2,
      assign_time_2: body.assign_time_2 ? body.assign_time_2 : existData.assign_time_2,
      assign_date_2: body.assign_date_2 ? body.assign_date_2 : existData.assign_date_2,
      assign_to_2: body.assign_to_2 ? body.assign_to_2 : existData.assign_to_2,
      assign_from_2: body.assign_from_2 ? body.assign_from_2 : existData.assign_from_2,
      notes_3: body.notes_3 ? body.notes_3 : existData.notes_3,
      assign_time_3: body.assign_time_3 ? body.assign_time_3 : existData.assign_time_3,
      assign_date_3: body.assign_date_3 ? body.assign_date_3 : existData.assign_date_3,
      assign_to_3: body.assign_to_3 ? body.assign_to_3 : existData.assign_to_3,
      assign_from_3: body.assign_from_3 ? body.assign_from_3 : existData.assign_from_3,
      notes_4: body.notes_4 ? body.notes_4 : existData.notes_4,
      assign_time_4: body.assign_time_4 ? body.assign_time_4 : existData.assign_time_4,
      assign_date_4: body.assign_date_4 ? body.assign_date_4 : existData.assign_date_4,
      assign_to_4: body.assign_to_4 ? body.assign_to_4 : existData.assign_to_4,
      assign_from_4: body.assign_from_4 ? body.assign_from_4 : existData.assign_from_4,
      notes_5: body.notes_5 ? body.notes_5 : existData.notes_5,
      assign_time_5: body.assign_time_5 ? body.assign_time_5 : existData.assign_time_5,
      assign_date_5: body.assign_date_5 ? body.assign_date_5 : existData.assign_date_5,
      assign_to_5: body.assign_to_5 ? body.assign_to_5 : existData.assign_to_5,
      assign_from_5: body.assign_from_5 ? body.assign_from_5 : existData.assign_from_5,
      notes_6: body.notes_6 ? body.notes_6 : existData.notes_6,
      assign_time_6: body.assign_time_6 ? body.assign_time_6 : existData.assign_time_6,
      assign_date_6: body.assign_date_6 ? body.assign_date_6 : existData.assign_date_6,
      assign_to_6: body.assign_to_6 ? body.assign_to_6 : existData.assign_to_6,
      assign_from_6: body.assign_from_6 ? body.assign_from_6 : existData.assign_from_6,
      notes_7: body.notes_7 ? body.notes_7 : existData.notes_7,
      assign_time_7: body.assign_time_7 ? body.assign_time_7 : existData.assign_time_7,
      assign_date_7: body.assign_date_7 ? body.assign_date_7 : existData.assign_date_7,
      assign_to_7: body.assign_to_7 ? body.assign_to_7 : existData.assign_to_7,
      assign_from_7: body.assign_from_7 ? body.assign_from_7 : existData.assign_from_7,
      notes_8: body.notes_8 ? body.notes_8 : existData.notes_8,
      assign_time_8: body.assign_time_8 ? body.assign_time_8 : existData.assign_time_8,
      assign_date_8: body.assign_date_8 ? body.assign_date_8 : existData.assign_date_8,
      assign_to_8: body.assign_to_8 ? body.assign_to_8 : existData.assign_to_8,
      assign_from_8: body.assign_from_8 ? body.assign_from_8 : existData.assign_from_8,
      notes_9: body.notes_9 ? body.notes_9 : existData.notes_9,
      assign_time_9: body.assign_time_9 ? body.assign_time_9 : existData.assign_time_9,
      assign_date_9: body.assign_date_9 ? body.assign_date_9 : existData.assign_date_9,
      assign_to_9: body.assign_to_9 ? body.assign_to_9 : existData.assign_to_9,
      assign_from_9: body.assign_from_9 ? body.assign_from_9 : existData.assign_from_9,
      notes_10: body.notes_10 ? body.notes_10 : existData.notes_10,
      assign_time_10: body.assign_time_10 ? body.assign_time_10 : existData.assign_time_10,
      assign_date_10: body.assign_date_10 ? body.assign_date_10 : existData.assign_date_10,
      assign_to_10: body.assign_to_10 ? body.assign_to_10 : existData.assign_to_10,
      assign_from_10: body.assign_from_10 ? body.assign_from_10 : existData.assign_from_10,
      check_out: body.check_out ? body.check_out : existData.check_out,
      check_in: body.check_in ? body.check_in : existData.check_in,
      nights: body.nights ? body.nights : existData.nights,
      rooms: body.rooms ? body.rooms : existData.rooms,
      hotel_name: body.hotel_name ? body.hotel_name : existData.hotel_name,
      city: body.city ? body.city : existData.city,
      check_out_2: body.check_out_2 ? body.check_out_2 : existData.check_out_2,
      check_in_2: body.check_in_2 ? body.check_in_2 : existData.check_in_2,
      nights_2: body.nights_2 ? body.nights_2 : existData.nights_2,
      rooms_2: body.rooms_2 ? body.rooms_2 : existData.rooms_2,
      hotel_name_2: body.hotel_name_2 ? body.hotel_name_2 : existData.hotel_name_2,
      city_2: body.city_2 ? body.city_2 : existData.city_2,
      check_out_3: body.check_out_3 ? body.check_out_3 : existData.check_out_3,
      check_in_3: body.check_in_3 ? body.check_in_3 : existData.check_in_3,
      nights_3: body.nights_3 ? body.nights_3 : existData.nights_3,
      rooms_3: body.rooms_3 ? body.rooms_3 : existData.rooms_3,
      hotel_name_3: body.hotel_name_3 ? body.hotel_name_3 : existData.hotel_name_3,
      city_3: body.city_3 ? body.city_3 : existData.city_3,
      check_out_4: body.check_out_4 ? body.check_out_4 : existData.check_out_4,
      check_in_4: body.check_in_4 ? body.check_in_4 : existData.check_in_4,
      nights_4: body.nights_4 ? body.nights_4 : existData.nights_4,
      rooms_4: body.rooms_4 ? body.rooms_4 : existData.rooms_4,
      hotel_name_4: body.hotel_name_4 ? body.hotel_name_4 : existData.hotel_name_4,
      city_4: body.city_4 ? body.city_4 : existData.city_4,
      check_out_5: body.check_out_5 ? body.check_out_5 : existData.check_out_5,
      check_in_5: body.check_in_5 ? body.check_in_5 : existData.check_in_5,
      nights_5: body.nights_5 ? body.nights_5 : existData.nights_5,
      rooms_5: body.rooms_5 ? body.rooms_5 : existData.rooms_5,
      hotel_name_5: body.hotel_name_5 ? body.hotel_name_5 : existData.hotel_name_5,
      city_5: body.city_5 ? body.city_5 : existData.city_5,


    },
      {
        where: {
          email: body.email,
          group_name_number: body.group_name_number,
        }
      });

    return ReS(res, { message: "AssignPackage has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    const data = await AssignPackage.destroy({
      where: {
        email: body.email,
        group_name_number: body.group_name_number,
      }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "AssignPackage has been deleted successfully." }, 200);
    }).catch(function (err) {
      return ReE(res, { message: "Somthing Went Wrong", err: err.errors }, 200);
    });

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
}


module.exports = {
  fetch,
  create,
  fetchSingle,
  update,
  deleted
};
