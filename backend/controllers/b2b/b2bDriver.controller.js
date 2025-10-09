const { Driver, MutamersList } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await Driver.findAll({
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
    const data = await Driver.create({
      email: body.email,
      group_name_number: body.group_name_number,
      driver_name: body.driver_name,
      driver_mobile: body.driver_mobile,
      bus_no: body.bus_no,
      status: body.status,
      driver_name_1: body.driver_name_1,
      driver_mobile_1: body.driver_mobile_1,
      bus_no_1: body.bus_no_1,
      status_1: body.status_1,
      d_date: body.d_date,
      location: body.location,
      to_location: body.to_location,
      time: body.time,
      remarks: body.remarks,
    })

    if (data) {
      const data1 = await MutamersList.update({
        view_dirver_details: data?.id,
      },
        {
          where: {
            email: body.email,
            group_name_number: body.group_name_number
          }
        });
      return ReS(res, { message: "Driver created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Driver.findOne({
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
    const existData = await Driver.findOne({
      where: { id: body.id }
    });

    await Driver.update({
      driver_name: body.driver_name ? body.driver_name : existData.driver_name,
      driver_mobile: body.driver_mobile ? body.driver_mobile : existData.driver_mobile,
      bus_no: body.bus_no ? body.bus_no : existData.bus_no,
      status: body.status ? body.status : existData.status,
      driver_name_1: body.driver_name_1 ? body.driver_name_1 : existData.driver_name_1,
      driver_mobile_1: body.driver_mobile_1 ? body.driver_mobile_1 : existData.driver_mobile_1,
      bus_no_1: body.bus_no_1 ? body.bus_no_1 : existData.bus_no_1,
      status_1: body.status_1 ? body.status_1 : existData.status_1,
      d_date: body.d_date ? body.d_date : existData.d_date,
      location: body.location ? body.location : existData.location,
      to_location: body.to_location ? body.to_location : existData.to_location,
      time: body.time ? body.time : existData.time,
      remarks: body.remarks ? body.remarks : existData.remarks,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Driver has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Driver.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Driver has been deleted successfully." }, 200);
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
