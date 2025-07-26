const { BlockHome } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await BlockHome.findAll({
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
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/blockHome`;
    let blockHome = "";
    if (files) {
      if (files.block_home_image) {
        const homeTopSliderName = Date.now() + '-' + files.block_home_image.name;
        blockHome = "blockHome/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_home_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await BlockHome.create({
      block_home_image: blockHome,
      title: body.title,
      description: body.description,
    })

    if (data) {
      return ReS(res, { message: "Block home created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await BlockHome.findOne({
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
    const existData = await BlockHome.findOne({
      where: { id: body.id }
    });
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/blockHome`;
    let blockHome = "";
    if (files) {
      if (files.block_home_image) {
        const homeTopSliderName = Date.now() + '-' + files.block_home_image.name;
        blockHome = "blockHome/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_home_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    await BlockHome.update({
      title: body.title ? body.title : existData.title,
      block_home_image: blockHome ? blockHome : existData.block_home_image,
      description: body.description ? body.description : existData.description,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Block home has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await BlockHome.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Block home has been deleted successfully." }, 200);
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
