const { PackageDetail } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await PackageDetail.findAll({
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
    const data = await PackageDetail.create({
      title: body.title,
      price: body.price,
      days: body.days,
      departure_date: body.departure_date,
      departure_location: body.departure_location,
      arrival_date: body.arrival_date,
      arrival_location: body.arrival_location,
      airline: body.airline,
      hotel_distance_1: body.hotel_distance_1,
      hotel_distance_2: body.hotel_distance_2,
      hotel_distance_3: body.hotel_distance_3,
      description: body.description,
    })

    if (data) {
      return ReS(res, { message: "Package details created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await PackageDetail.findOne({
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
    const existData = await PackageDetail.findOne({
      where: { id: body.id }
    });

    await PackageDetail.update({
      title: body.title ? body.title : existData.title,
      price: body.price ? body.price : existData.price,
      days: body.days ? body.days : existData.days,
      departure_date: body.departure_date ? body.departure_date : existData.departure_date,
      departure_location: body.departure_location ? body.departure_location : existData.departure_location,
      arrival_date: body.arrival_date ? body.arrival_date : existData.arrival_date,
      arrival_location: body.arrival_location ? body.arrival_location : existData.arrival_location,
      airline: body.airline ? body.airline : existData.airline,
      hotel_distance_1: body.hotel_distance_1 ? body.hotel_distance_1 : existData.hotel_distance_1,
      hotel_distance_2: body.hotel_distance_2 ? body.hotel_distance_2 : existData.hotel_distance_2,
      hotel_distance_3: body.hotel_distance_3 ? body.hotel_distance_3 : existData.hotel_distance_3,
      description: body.description ? body.description : existData.description,

    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Package details has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await PackageDetail.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Package details has been deleted successfully." }, 200);
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
