const { Visa, VisaType, VisaDocument } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");
const { where } = require("sequelize");


const fetch = async function (req, res) {
  try {
    const data = await Visa.findAll({
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
const fetchByCountry = async function (req, res) {
  try {
    let body = req.body;

    let visa = [];
    let visaType = [];
    let visaDocument = [];

    if (body.country) {
      visa = await Visa.findAll({
        where: { country: body.country },
        limit: 1,
      });
      visaType = await VisaType.findAll({
        where: { country: body.country },
      });
      visaDocument = await VisaDocument.findAll({
        where: { country: body.country },
        limit: 1,
      });
    } else {
      visa = await Visa.findAll();
      visaType = await VisaType.findAll();
      visaDocument = await VisaDocument.findAll();
    }

    return ReS(res, {
      data: { visa, visaType, visaDocument },
      message: "success"
    });
  } catch (error) {
    return ReE(res, { message: "Something Went Wrong", err: error }, 500);
  }
};

const create = async (req, res) => {
  try {
    let body = req.body;
    const data = await Visa.create({
      country: body.country,
      processing_time: body.processing_time,
      starting_from_price: body.starting_from_price,
    })

    if (data) {
      return ReS(res, { message: "Visa created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Visa.findOne({
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
    const existData = await Visa.findOne({
      where: { id: body.id }
    });

    await Visa.update({
      country: body.country ? body.country : existData.country,
      processing_time: body.processing_time ? body.processing_time : existData.processing_time,
      starting_from_price: body.starting_from_price ? body.starting_from_price : existData.starting_from_price,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Visa has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Visa.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Visa has been deleted successfully." }, 200);
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
  deleted,
  fetchByCountry
};
