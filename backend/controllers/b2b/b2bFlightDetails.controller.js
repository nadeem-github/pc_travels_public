const { FlightDetail,MutamersList } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await FlightDetail.findAll({
      order: [['id', 'DESC']],
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
    const data = await FlightDetail.create({
      email: body.email,
      group_name_number: body.group_name_number,
      date_of_arrival: body.date_of_arrival,
      flight_number: body.flight_number,
      airport_name: body.airport_name,
      airlines_number: body.airlines_number,
      date_of_departure: body.date_of_departure,
      flight_number_1: body.flight_number_1,
      airport_name_1: body.airport_name_1,
      airlines_number_1: body.airlines_number_1,
    })

    if (data) {
      return ReS(res, { message: "FlightDetail created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await FlightDetail.findOne({
      where: { id: userId }
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
    const existData = await FlightDetail.findOne({
      where: { id: body.id }
    });
    
    await FlightDetail.update({
      date_of_arrival: body.date_of_arrival ? body.date_of_arrival : existData.date_of_arrival,
      flight_number: body.flight_number ? body.flight_number : existData.flight_number,
      airport_name: body.airport_name ? body.airport_name : existData.airport_name,
      airlines_number: body.airlines_number ? body.airlines_number : existData.airlines_number,
      date_of_departure: body.date_of_departure ? body.date_of_departure : existData.date_of_departure,
      flight_number_1: body.flight_number_1 ? body.flight_number_1 : existData.flight_number_1,
      airport_name_1: body.airport_name_1 ? body.airport_name_1 : existData.airport_name_1,
      airlines_number_1: body.airlines_number_1 ? body.airlines_number_1 : existData.airlines_number_1,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "FlightDetail has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await FlightDetail.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "FlightDetail has been deleted successfully." }, 200);
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
