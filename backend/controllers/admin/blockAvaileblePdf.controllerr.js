const { BlockAvailebelPdf } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await BlockAvailebelPdf.findAll({
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
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/blockAvaileblePdf`;
    let blockAvaileblePdf1 = "";
    let blockAvaileblePdf2 = "";
    let blockAvaileblePdf3 = "";
    let blockAvaileblePdf4 = "";  
    let blockAvaileblePdf5 = "";

    if (files) {
      if (files.block_availeble_pdf_image_1) {
        const homeTopSliderName = Date.now() + '-' + files.block_availeble_pdf_image_1.name;
        blockAvaileblePdf1 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_availeble_pdf_image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.block_availeble_pdf_image_2) {
        const homeTopSliderName = Date.now() + '-' + files.block_availeble_pdf_image_2.name;
        blockAvaileblePdf2 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_availeble_pdf_image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.block_availeble_pdf_image_3) {
        const homeTopSliderName = Date.now() + '-' + files.block_availeble_pdf_image_3.name;
        blockAvaileblePdf3 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_availeble_pdf_image_3, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      } 
      if (files.block_availeble_pdf_image_4) {
        const homeTopSliderName = Date.now() + '-' + files.block_availeble_pdf_image_4.name;
        blockAvaileblePdf4 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_availeble_pdf_image_4, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      } 
      if (files.block_availeble_pdf_image_5) {
        const homeTopSliderName = Date.now() + '-' + files.block_availeble_pdf_image_5.name;
        blockAvaileblePdf5 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_availeble_pdf_image_5, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      } 
      
    }
    const data = await BlockAvailebelPdf.create({
      block_availeble_pdf_image_1: blockAvaileblePdf1,
      block_availeble_pdf_image_2: blockAvaileblePdf2,
      block_availeble_pdf_image_3: blockAvaileblePdf3, 
      block_availeble_pdf_image_4: blockAvaileblePdf4,
      block_availeble_pdf_image_5: blockAvaileblePdf5,
    })

    if (data) {
      return ReS(res, { message: "Block availeble pdf created successfully." }, 200);
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
    const data = await BlockAvailebelPdf.findOne({
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
    const existData = await BlockAvailebelPdf.findOne({
      where: { id: body.id }
    });
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/blockAvaileblePdf`;
    let blockAvaileblePdf1 = "";
    let blockAvaileblePdf2 = "";
    let blockAvaileblePdf3 = "";  
    let blockAvaileblePdf4 = "";
    let blockAvaileblePdf5 = "";
    if (files) {
      if (files.block_availeble_pdf_image_1) {
        const homeTopSliderName = Date.now() + '-' + files.block_availeble_pdf_image_1.name;
        blockAvaileblePdf1 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_availeble_pdf_image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.block_availeble_pdf_image_2) {
        const homeTopSliderName = Date.now() + '-' + files.block_availeble_pdf_image_2.name;
        blockAvaileblePdf2 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_availeble_pdf_image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      } 
      if (files.block_availeble_pdf_image_3) {
        const homeTopSliderName = Date.now() + '-' + files.block_availeble_pdf_image_3.name;
        blockAvaileblePdf3 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_availeble_pdf_image_3, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      } 
      if (files.block_availeble_pdf_image_4) {
        const homeTopSliderName = Date.now() + '-' + files.block_availeble_pdf_image_4.name;
        blockAvaileblePdf4 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_availeble_pdf_image_4, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      } 
      if (files.block_availeble_pdf_image_5) {
        const homeTopSliderName = Date.now() + '-' + files.block_availeble_pdf_image_5.name;
        blockAvaileblePdf5 = "blockAvaileblePdf/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.block_availeble_pdf_image_5, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      } 
    }
    await BlockAvailebelPdf.update({
      block_availeble_pdf_image_1: blockAvaileblePdf1 ? blockAvaileblePdf1 : existData.block_availeble_pdf_image_1,
      block_availeble_pdf_image_2: blockAvaileblePdf2 ? blockAvaileblePdf2 : existData.block_availeble_pdf_image_2,
      block_availeble_pdf_image_3: blockAvaileblePdf3 ? blockAvaileblePdf3 : existData.block_availeble_pdf_image_3,
      block_availeble_pdf_image_4: blockAvaileblePdf4 ? blockAvaileblePdf4 : existData.block_availeble_pdf_image_4,
      block_availeble_pdf_image_5: blockAvaileblePdf5 ? blockAvaileblePdf5 : existData.block_availeble_pdf_image_5
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Block availeble pdf has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await BlockAvailebelPdf.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Block availeble pdf has been deleted successfully." }, 200);
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
