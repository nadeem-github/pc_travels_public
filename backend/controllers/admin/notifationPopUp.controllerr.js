const { NotificationPopup } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await NotificationPopup.findAll({
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
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/notificationPopup`;
    let image1 = "";
    let image2 = "";


    if (files) {
      if (files.image_1) {
        const homeTopSliderName = Date.now() + '-' + files.image_1.name;
        image1 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.image_2) {
        const homeTopSliderName = Date.now() + '-' + files.image_2.name;
        image2 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await NotificationPopup.create({
      title: body.title,
      image_1: image1,
      image_2: image2,
      description: body.description
    })

    if (data) {
      return ReS(res, { message: "Notification Pop Up created successfully." }, 200);
    }

  } catch (error) {
    console.error("Error in creating BlockAvaileblePdf:", error);
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await NotificationPopup.findOne({
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
    const existData = await NotificationPopup.findOne({
      where: { id: body.id }
    });
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/notificationPopup`;
    let image1 = "";
    let image2 = "";
    
    if (files) {
      if (files.image_1) {
        const homeTopSliderName = Date.now() + '-' + files.image_1.name;
        image1 = "notificationPopup/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.image_2) {
        const homeTopSliderName = Date.now() + '-' + files.image_2.name;
        image2 = "notificationPopup/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      } 
    }
    await NotificationPopup.update({
      title: body.title ? body.title : existData.title,
      image_1: image1 ? image1 : existData.image_1,
      image_2: image2 ? image2 : existData.image_2,
      description: body.description ? body.description : existData.description
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Notification Pop Up has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await NotificationPopup.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Notification Pop Up has been deleted successfully." }, 200);
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
