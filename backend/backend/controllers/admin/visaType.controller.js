const { VisaType } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await VisaType.findAll({
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
    const data = await VisaType.create({
      country: body.country,
      processing_time: body.processing_time,
      starting_from_price: body.starting_from_price,
      stay_period: body.stay_period,
      validity: body.validity,
      entry: body.entry,
      fees: body.fees,
      visa_type: body.visa_type
    })

    if (data) {
      return ReS(res, { message: "VisaType created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await VisaType.findOne({
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
    const existData = await VisaType.findOne({
      where: { id: body.id }
    });

    await VisaType.update({
      country: body.country ? body.country : existData.country,
      processing_time: body.processing_time ? body.processing_time : existData.processing_time,
      starting_from_price: body.starting_from_price ? body.starting_from_price : existData.starting_from_price,
      stay_period: body.stay_period ? body.stay_period : existData.stay_period,
      validity: body.validity ? body.validity : existData.validity,
      entry: body.entry ? body.entry : existData.entry, 
      fees: body.fees ? body.fees : existData.fees,
      visa_type: body.visa_type ? body.visa_type : existData.visa_type
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "VisaType has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await VisaType.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "VisaType has been deleted successfully." }, 200);
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
