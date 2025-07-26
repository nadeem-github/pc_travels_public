const { Transportation } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await Transportation.findAndCountAll({
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
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/transportation`;
    let transportation = "";
    let transportation1 = "";
    let transportation2 = "";
    if (files) {
      if (files.transport_image_1) {
        const homeTopSliderName = Date.now() + '-' + files.transport_image_1.name;
        transportation = "transportation/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.transport_image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.transport_image_2) {
        const homeTopSliderName = Date.now() + '-' + files.transport_image_2.name;
        transportation1 = "transportation/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.transport_image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.transport_pdf_image) {
        const homeTopSliderName = Date.now() + '-' + files.transport_pdf_image.name;
        transportation2 = "transportation/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.transport_pdf_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await Transportation.create({
      transport_image_1: transportation,
      transport_image_2: transportation1,
      transport_pdf_image: transportation2,
      name: body.name,
      description: body.description,
    })

    if (data) {
      return ReS(res, { message: "Transportation created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Transportation.findOne({
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
    const existData = await Transportation.findOne({
      where: { id: body.id }
    });
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/transportation`;
    let transportation = "";
    let transportation1 = "";
    let transportation2 = "";
    if (files) {
      if (files.transport_image_1) {
        const homeTopSliderName = Date.now() + '-' + files.transport_image_1.name;
        transportation = "transportation/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.transport_image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.transport_image_2) {
        const homeTopSliderName = Date.now() + '-' + files.transport_image_2.name;
        transportation1 = "transportation/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.transport_image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
       if (files.transport_pdf_image) {
        const homeTopSliderName = Date.now() + '-' + files.transport_pdf_image.name;
        transportation2 = "transportation/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.transport_pdf_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    await Transportation.update({
        transport_image_1: transportation ? transportation : existData.transport_image_1,
        transport_image_2: transportation1 ? transportation1 : existData.transport_image_2,
        transport_pdf_image: transportation2 ? transportation2 : existData.transport_pdf_image,
        name: body.name ? body.name : existData.name,
        description: body.description ? body.description : existData.description  
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Transportation has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Transportation.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Transportation has been deleted successfully." }, 200);
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
