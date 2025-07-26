const { WorkVisa } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await WorkVisa.findAndCountAll({
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
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/workVisa`;
    let workVisa = "";
    if (files) {
      if (files.work_visa_image) {
        const homeTopSliderName = Date.now() + '-' + files.work_visa_image.name;
        workVisa = "workVisa/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.work_visa_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await WorkVisa.create({
      work_visa_image: workVisa,
      name: body.name,
      description: body.description,
    })

    if (data) {
      return ReS(res, { message: "Work Visa created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await WorkVisa.findOne({
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
    const existData = await WorkVisa.findOne({
      where: { id: body.id }
    });
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/workVisa`;
    let workVisa = "";
    let transportation1 = "";
    if (files) {
      if (files.work_visa_image) {
        const homeTopSliderName = Date.now() + '-' + files.work_visa_image.name;
        workVisa = "workVisa/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.work_visa_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    await WorkVisa.update({
        work_visa_image: workVisa ? workVisa : existData.work_visa_image,
        name: body.name ? body.name : existData.name,
        description: body.description ? body.description : existData.description  
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Work Visa has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await WorkVisa.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Work Visa has been deleted successfully." }, 200);
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
