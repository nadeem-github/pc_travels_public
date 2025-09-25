const { B2bHotel, MutamersList } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await B2bHotel.findAll({
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
    const data = await B2bHotel.create({
      email: body.email,
      group_name_number: body.group_name_number,
      check_in: body.check_in,
      check_out: body.check_out,
      city: body.city,  
      hotel_name: body.hotel_name,
      nights: body.nights,
      rooms: body.rooms,
      description : body.description,
    })

    if (data) {
      const data1 = await MutamersList.update({
        hotel_details: data?.id,
      },
        {
          where: {
            email: body.email,
            group_name_number: body.group_name_number
          }
        });
      return ReS(res, { message: "B2bHotel created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await B2bHotel.findOne({
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
    const existData = await B2bHotel.findOne({
      where: { id: body.id }
    });
    
    await B2bHotel.update({
      check_in: body.check_in ? body.check_in : existData.check_in,
      check_out: body.check_out ? body.check_out : existData.check_out,
      city: body.city ? body.city : existData.city,
      hotel_name: body.hotel_name ? body.hotel_name : existData.hotel_name,
      nights: body.nights ? body.nights : existData.nights,
      rooms: body.rooms ? body.rooms : existData.rooms,
      description : body.description ? body.description : existData.description,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "B2bHotel has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await B2bHotel.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "B2bHotel has been deleted successfully." }, 200);
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
