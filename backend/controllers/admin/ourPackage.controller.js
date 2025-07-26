const { OurPackage } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await OurPackage.findAndCountAll({
      order: [['id', 'DESC']],
      // limit: 2
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
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/ourPackage`;
    let ourPackage = "";
    if (files) {
      if (files.package_image) {
        const homeTopSliderName = Date.now() + '-' + files.package_image.name;
        ourPackage = "ourPackage/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.package_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await OurPackage.create({
      package_image: ourPackage,
      name: body.name,
      title: body.title,
      description: body.description,
      price: body.price,
      hotel1: body.hotel1,
      hotel1_price: body.hotel1_price,
      hotel2: body.hotel2,
      hotel2_price: body.hotel2_price
    })

    if (data) {
      return ReS(res, { message: "Our package created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await OurPackage.findOne({
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
    const existData = await OurPackage.findOne({
      where: { id: body.id }
    });
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/ourPackage`;
    let ourPackage = "";
    if (files) {
      if (files.package_image) {
        const homeTopSliderName = Date.now() + '-' + files.package_image.name;
        ourPackage = "ourPackage/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.package_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    await OurPackage.update({
      package_image: ourPackage ? ourPackage : existData.package_image,
      name: body.name ? body.name : existData.name,
      title: body.title ? body.title : existData.title,
      description: body.description ? body.description : existData.description,
      price: body.price ? body.price : existData.price,
      hotel1: body.hotel1 ? body.hotel1 : existData.hotel1,
      hotel1_price: body.hotel1_price ? body.hotel1_price : existData.hotel1_price,
      hotel2: body.hotel2 ? body.hotel2 : existData.hotel2,
      hotel2_price: body.hotel2_price ? body.hotel2_price : existData.hotel2_price
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Our package has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await OurPackage.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Our package has been deleted successfully." }, 200);
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
