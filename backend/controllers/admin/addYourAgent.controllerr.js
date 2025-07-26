const { AddYourAgent } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    let body = req.body;
    let agentArea = {};
    if (body.agent_area != '' && body.agent_area != undefined) {
      agentArea = {
        agent_area: body.agent_area
      };
    }
    const data = await AddYourAgent.findAll({
       where: {
                ...agentArea,
            },
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
    const existData = await AddYourAgent.findOne({
      where: { agent_email: body.agent_email }
    });
    if (existData) {
      return ReE(res, { message: "Your agent email already exists." }, 200);
    }
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/addYourAgent`;
    let addYourAgent = "";
    if (files) {
      if (files.agent_photo) {
        const homeTopSliderName = Date.now() + '-' + files.agent_photo.name;
        addYourAgent = "addYourAgent/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.agent_photo, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await AddYourAgent.create({
      agent_area: body.agent_area ? body.agent_area : "",
      agent_photo: addYourAgent ? addYourAgent : "",
      agent_name: body.agent_name ? body.agent_name : "",
      agent_number: body.agent_number ? body.agent_number : "",
      agent_email: body.agent_email ? body.agent_email : "",
      agent_address: body.agent_address ? body.agent_address : ""
    })

    if (data) {
      return ReS(res, { message: "Your agent created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await AddYourAgent.findOne({
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
    const existData = await AddYourAgent.findOne({
      where: { id: body.id }
    });
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/addYourAgent`;
    let addYourAgent = "";
    if (files) {
      if (files.agent_photo) {
        const homeTopSliderName = Date.now() + '-' + files.agent_photo.name;
        addYourAgent = "addYourAgent/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.agent_photo, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    await AddYourAgent.update({
      agent_area: body.agent_area ? body.agent_area : existData.agent_area,
      agent_photo: addYourAgent ? addYourAgent : existData.agent_photo,
      agent_name: body.agent_name ? body.agent_name : existData.agent_name,
      agent_number: body.agent_number ? body.agent_number : existData.agent_number,
      agent_email: body.agent_email ? body.agent_email : existData.agent_email,
      agent_address: body.agent_address ? body.agent_address : existData.agent_address
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Your agent has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await AddYourAgent.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Your agent has been deleted successfully." }, 200);
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
