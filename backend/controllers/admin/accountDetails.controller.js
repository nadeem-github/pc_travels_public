const { AccountDetails } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");
const { is } = require("useragent");


const fetch = async function (req, res) {
  try {
    const data = await AccountDetails.findAll({
      order: [['id', 'DESC']],
      // limit: 1|
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
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/accountDetails`;
    let accountDetails = "";
    if (files) {
      if (files.upload_qr_image) {
        const homeTopSliderName = Date.now() + '-' + files.upload_qr_image.name;
        accountDetails = "accountDetails/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.upload_qr_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await AccountDetails.create({
      bank_name: body.bank_name,
      account_name: body.account_name,
      account_number: body.account_number,
      ifsc_code: body.ifsc_code,
      branch: body.branch,
      remark: body.remark,
      upload_qr_image: accountDetails,
      
    })

    if (data) {
      return ReS(res, { message: "Account Details created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await AccountDetails.findOne({
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
    const existData = await AccountDetails.findOne({
      where: { id: body.id }
    });
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/accountDetails`;
    let accountDetails = "";
    if (files) {
      if (files.upload_qr_image) {
        const homeTopSliderName = Date.now() + '-' + files.upload_qr_image.name;
        accountDetails = "accountDetails/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.upload_qr_image, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    await AccountDetails.update({
      upload_qr_image: accountDetails ? accountDetails : existData.upload_qr_image,
      bank_name: body.bank_name ? body.bank_name : existData.bank_name,
      account_name: body.account_name ? body.account_name : existData.account_name,
      account_number: body.account_number ? body.account_number : existData.account_number,
      ifsc_code: body.ifsc_code ? body.ifsc_code : existData.ifsc_code,
      remark: body.remark ? body.remark : existData.remark,
      branch: body.branch ? body.branch : existData.branch,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Account Details has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await AccountDetails.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Account Details has been deleted successfully." }, 200);
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
