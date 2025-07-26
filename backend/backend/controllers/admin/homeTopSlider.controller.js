const { HomeTopSlider } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await HomeTopSlider.findAndCountAll({
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
    const files = req.files;
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/homeTopSlider`;
    let homeTopSlider = "";
    if (files) {
      if (files.slider_image) {
        const homeTopSliderName = Date.now() + '-' + files.slider_image.name;
        homeTopSlider = "homeTopSlider/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.slider_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await HomeTopSlider.create({
      slider_image: homeTopSlider,
      name: body.name,
    })

    if (data) {
      return ReS(res, { message: "Top slider created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await HomeTopSlider.findOne({
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
    const existData = await HomeTopSlider.findOne({
      where: { id: body.id }
    });
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/homeTopSlider`;
    let homeTopSlider = "";
    if (files) {
      if (files.slider_image) {
        const homeTopSliderName = Date.now() + '-' + files.slider_image.name;
        homeTopSlider = "homeTopSlider/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.slider_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    await HomeTopSlider.update({
      slider_image: homeTopSlider ? homeTopSlider : existData.slider_image,
      name: body.name ? body.name : existData.name,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Top slider has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await HomeTopSlider.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Top slider has been deleted successfully." }, 200);
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
