const { VisaDocument } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await VisaDocument.findAll({
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
    const data = await VisaDocument.create({
      country: body.country,
      visa_document: body.visa_document,
      notes: body.notes,
      description: body.description,
      doc_1: body.doc_1,
      doc_2: body.doc_2,
      doc_3: body.doc_3,
      doc_4: body.doc_4,
      doc_5: body.doc_5,
      doc_6: body.doc_6,
      doc_7: body.doc_7,
      doc_8: body.doc_8,
      doc_9: body.doc_9,
      doc_10: body.doc_10,
      doc_11: body.doc_11,
      doc_12: body.doc_12,
      doc_13: body.doc_13,
      doc_14: body.doc_14,
      doc_15: body.doc_15,
      doc_16: body.doc_16,
      doc_17: body.doc_17,
      doc_18: body.doc_18,
      doc_19: body.doc_19,
      doc_20: body.doc_20,
      doc_21: body.doc_21,
      doc_22: body.doc_22,  
      doc_23: body.doc_23,
      doc_24: body.doc_24,  
      doc_25: body.doc_25,
      doc_26: body.doc_26,
      doc_27: body.doc_27,
      doc_28: body.doc_28,
      doc_29: body.doc_29,
      doc_30: body.doc_30,
      doc_31: body.doc_31,
      doc_32: body.doc_32,
      doc_33: body.doc_33,
      doc_34: body.doc_34,  
      doc_35: body.doc_35,
      doc_36: body.doc_36,
      doc_37: body.doc_37,
      doc_38: body.doc_38,
      doc_39: body.doc_39,
      doc_40: body.doc_40
    })

    if (data) {
      return ReS(res, { message: "VisaDocument created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await VisaDocument.findOne({
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
    const existData = await VisaDocument.findOne({
      where: { id: body.id }
    });

    await VisaDocument.update({
      country: body.country ? body.country : existData.country,
      visa_document: body.visa_document ? body.visa_document : existData.visa_document,
      notes: body.notes ? body.notes : existData.notes,
      description: body.description ? body.description : existData.description,
      doc_1: body.doc_1 ? body.doc_1 : existData.doc_1,
      doc_2: body.doc_2 ? body.doc_2 : existData.doc_2,
      doc_3: body.doc_3 ? body.doc_3 : existData.doc_3,
      doc_4: body.doc_4 ? body.doc_4 : existData.doc_4,
      doc_5: body.doc_5 ? body.doc_5 : existData.doc_5,
      doc_6: body.doc_6 ? body.doc_6 : existData.doc_6,
      doc_7: body.doc_7 ? body.doc_7 : existData.doc_7,
      doc_8: body.doc_8 ? body.doc_8 : existData.doc_8,
      doc_9: body.doc_9 ? body.doc_9 : existData.doc_9,
      doc_10: body.doc_10 ? body.doc_10 : existData.doc_10,
      doc_11: body.doc_11 ? body.doc_11 : existData.doc_11,
      doc_12: body.doc_12 ? body.doc_12 : existData.doc_12,
      doc_13: body.doc_13 ? body.doc_13 : existData.doc_13,
      doc_14: body.doc_14 ? body.doc_14 : existData.doc_14,
      doc_15: body.doc_15 ? body.doc_15 : existData.doc_15,
      doc_16: body.doc_16 ? body.doc_16 : existData.doc_16,
      doc_17: body.doc_17 ? body.doc_17 : existData.doc_17,
      doc_18: body.doc_18 ? body.doc_18 : existData.doc_18,
      doc_19: body.doc_19 ? body.doc_19 : existData.doc_19,
      doc_20: body.doc_20 ? body.doc_20 : existData.doc_20,
      doc_21: body.doc_21 ? body.doc_21 : existData.doc_21,
      doc_22: body.doc_22 ? body.doc_22 : existData.doc_22,
      doc_23: body.doc_23 ? body.doc_23 : existData.doc_23,
      doc_24: body.doc_24 ? body.doc_24 : existData.doc_24,
      doc_25: body.doc_25 ? body.doc_25 : existData.doc_25,
      doc_26: body.doc_26 ? body.doc_26 : existData.doc_26,
      doc_27: body.doc_27 ? body.doc_27 : existData.doc_27,
      doc_28: body.doc_28 ? body.doc_28 : existData.doc_28,
      doc_29: body.doc_29 ? body.doc_29 : existData.doc_29,
      doc_30: body.doc_30 ? body.doc_30 : existData.doc_30,
      doc_31: body.doc_31 ? body.doc_31 : existData.doc_31,
      doc_32: body.doc_32 ? body.doc_32 : existData.doc_32,
      doc_33: body.doc_33 ? body.doc_33 : existData.doc_33,
      doc_34: body.doc_34 ? body.doc_34 : existData.doc_34,
      doc_35: body.doc_35 ? body.doc_35 : existData.doc_35,
      doc_36: body.doc_36 ? body.doc_36 : existData.doc_36,
      doc_37: body.doc_37 ? body.doc_37 : existData.doc_37,
      doc_38: body.doc_38 ? body.doc_38 : existData.doc_38,
      doc_39: body.doc_39 ? body.doc_39 : existData.doc_39,
      doc_40: body.doc_40 ? body.doc_40 : existData.doc_40
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "VisaDocument has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await VisaDocument.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "VisaDocument has been deleted successfully." }, 200);
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
