const { AboutUs } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await AboutUs.findAll({
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
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/aboutUs`;
    let aboutImage1 = "";
    let aboutImage2 = "";
    let aboutImage3 = "";
    if (files) {
      if (files.about_image_1) {
        const homeTopSliderName = Date.now() + '-' + files.about_image_1.name;
        aboutImage1 = "aboutUs/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.about_image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.about_image_2) {
        const homeTopSliderName = Date.now() + '-' + files.about_image_2.name;
        aboutImage2 = "aboutUs/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.about_image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.about_image_3) {
        const homeTopSliderName = Date.now() + '-' + files.about_image_3.name;
        aboutImage3 = "aboutUs/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.about_image_3, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await AboutUs.create({
      about_image_1: aboutImage1,
      about_image_2: aboutImage2,
      about_image_3: aboutImage3,
      description: body.description,
      title: body.title,
    })

    if (data) {
      return ReS(res, { message: "About us created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await AboutUs.findOne({
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
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/aboutUs`;
    let aboutImage1 = "";
    let aboutImage2 = "";
    let aboutImage3 = "";
    const existData = await AboutUs.findOne({
      where: { id: body.id }
    });
    if (files) {
      if (files.about_image_1) {
        const homeTopSliderName = Date.now() + '-' + files.about_image_1.name;
        aboutImage1 = "aboutUs/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.about_image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.about_image_2) {
        const homeTopSliderName = Date.now() + '-' + files.about_image_2.name;
        aboutImage2 = "aboutUs/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.about_image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.about_image_3) {
        const homeTopSliderName = Date.now() + '-' + files.about_image_3.name;
        aboutImage3 = "aboutUs/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.about_image_3, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    await AboutUs.update({
      about_image_1: aboutImage1 ? aboutImage1 : existData.about_image_1,
      about_image_2: aboutImage2 ? aboutImage2 : existData.about_image_2,
      about_image_3: aboutImage3 ? aboutImage3 : existData.about_image_3,
      description: body.description ? body.description : existData.description,
      title: body.title ? body.title : existData.title,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "About us has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await AboutUs.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "About us has been deleted successfully." }, 200);
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
