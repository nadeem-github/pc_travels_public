const { TermsAndCondition } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");
const { is } = require("useragent");


const fetch = async function (req, res) {
  try {
    const data = await TermsAndCondition.findAll({
      order: [['id', 'DESC']],
      limit: 1
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
    const files = req.files;
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/termAndCondition`;
    let termAndCondition = "";
    if (files) {
      if (files.tac_image) {
        const homeTopSliderName = Date.now() + '-' + files.tac_image.name;
        termAndCondition = "termAndCondition/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.tac_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await TermsAndCondition.create({
      tac_image: termAndCondition,
      title: body.title,
      description: body.description,
      is_active: body.is_active ? body.is_active : true,
    })

    if (data) {
      return ReS(res, { message: "Terms And Condition created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await TermsAndCondition.findOne({
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
    const files = req.files;
    const existData = await TermsAndCondition.findOne({
      where: { id: body.id }
    });
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/termAndCondition`;
    let termAndCondition = "";
    if (files) {
      if (files.tac_image) {
        const homeTopSliderName = Date.now() + '-' + files.tac_image.name;
        termAndCondition = "termAndCondition/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.tac_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    await TermsAndCondition.update({
      title: body.title ? body.title : existData.title,
      tac_image: termAndCondition ? termAndCondition : existData.tac_image,
      description: body.description ? body.description : existData.description,
      is_active: body.is_active != null ? body.is_active : existData.is_active,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Terms And Condition has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await TermsAndCondition.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Terms And Condition has been deleted successfully." }, 200);
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
