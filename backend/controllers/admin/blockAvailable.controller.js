const { BlockAvailable } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await BlockAvailable.findAll({
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
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/blockAvailable`;

    let airlineImage1 = "";
    let airlineImage2 = "";
    let airlineImage3 = "";
    let airlineImage4 = "";
    if (files) {
      if (files.airline_image_1) {
        const homeTopSliderName = Date.now() + '-' + files.airline_image_1.name;
        airlineImage1 = "blockAvailable/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.airline_image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.airline_image_2) {
        const homeTopSliderName = Date.now() + '-' + files.airline_image_2.name;
        airlineImage2 = "blockAvailable/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.airline_image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.airline_image_3) {
        const homeTopSliderName = Date.now() + '-' + files.airline_image_3.name;
        airlineImage3 = "blockAvailable/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.airline_image_3, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.airline_image_4) {
        const homeTopSliderName = Date.now() + '-' + files.airline_image_4.name;
        airlineImage4 = "blockAvailable/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.airline_image_4, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }

    const newEntry = await BlockAvailable.create({
     airline_1: body.airline_1 ? body.airline_1 : "",
     airline_2: body.airline_2 ? body.airline_2 : "", 
      airline_3: body.airline_3 ? body.airline_3 : "",
      airline_4: body.airline_4 ? body.airline_4 : "",
      airline_image_1: airlineImage1 ? airlineImage1 : "",
      airline_image_2: airlineImage2 ? airlineImage2 : "", 
      airline_image_3: airlineImage3 ? airlineImage3 : "",
      airline_image_4: airlineImage4 ? airlineImage4 : "",
      from_date_1: body.from_date_1 ? body.from_date_1 : null,
      from_date_2: body.from_date_2 ? body.from_date_2 : null,
      from_date_3: body.from_date_3 ? body.from_date_3 : null,
      from_date_4: body.from_date_4 ? body.from_date_4 : null,
      flight_number_1: body.flight_number_1 ? body.flight_number_1 : "",
      flight_number_2: body.flight_number_2 ? body.flight_number_2 : "",
      flight_number_3: body.flight_number_3 ? body.flight_number_3 : "",
      flight_number_4: body.flight_number_4 ? body.flight_number_4 : "",
      departure_1: body.departure_1 ? body.departure_1 : "",
      departure_2: body.departure_2 ? body.departure_2 : "",
      departure_3: body.departure_3 ? body.departure_3 : "",
      departure_4: body.departure_4 ? body.departure_4 : "",
      destination_1: body.destination_1 ? body.destination_1 : "",
      destination_2: body.destination_2 ? body.destination_2 : "",
      destination_3: body.destination_3 ? body.destination_3 : "",
      destination_4: body.destination_4 ? body.destination_4 : "",
      destination_time_1: body.destination_time_1 ? body.destination_time_1 : "", 
      destination_time_2: body.destination_time_2 ? body.destination_time_2 : "",
      destination_time_3: body.destination_time_3 ? body.destination_time_3 : "",
      destination_time_4: body.destination_time_4 ? body.destination_time_4 : "",
      departure_time_1: body.departure_time_1 ? body.departure_time_1 : "",
      departure_time_2: body.departure_time_2 ? body.departure_time_2 : "",
      departure_time_3: body.departure_time_3 ? body.departure_time_3 : "",
      departure_time_4: body.departure_time_4 ? body.departure_time_4 : "",

    });

    return ReS(res, {
      message: `Block available record created successfully.`,
    }, 200);


  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await BlockAvailable.findOne({
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
    const existData = await BlockAvailable.findOne({
      where: { id: body.id }
    });
    if (!existData) {
      return ReE(res, { message: "No Data Found" }, 200);
    }
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/blockAvailable`;
    let airlineImage1 = "";
    let airlineImage2 = "";
    let airlineImage3 = "";
    let airlineImage4 = "";
    if (files) {
      if (files.airline_image_1) {
        const homeTopSliderName = Date.now() + '-' + files.airline_image_1.name;
        airlineImage1 = "blockAvailable/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.airline_image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.airline_image_2) {
        const homeTopSliderName = Date.now() + '-' + files.airline_image_2.name;
        airlineImage2 = "blockAvailable/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.airline_image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.airline_image_3) {
        const homeTopSliderName = Date.now() + '-' + files.airline_image_3.name;
        airlineImage3 = "blockAvailable/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.airline_image_3, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.airline_image_4) {
        const homeTopSliderName = Date.now() + '-' + files.airline_image_4.name;
        airlineImage4 = "blockAvailable/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.airline_image_4, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await BlockAvailable.update({
      airline_1: body.airline_1 ? body.airline_1 : existData.airline_1,
      airline_2: body.airline_2 ? body.airline_2 : existData.airline_2,
      airline_3: body.airline_3 ? body.airline_3 : existData.airline_3,
      airline_4: body.airline_4 ? body.airline_4 : existData.airline_4,
      airline_image_1: airlineImage1 ? airlineImage1 : existData.airline_image_1,
      airline_image_2: airlineImage2 ? airlineImage2 : existData.airline_image_2,
      airline_image_3: airlineImage3 ? airlineImage3 : existData.airline_image_3,
      airline_image_4: airlineImage4 ? airlineImage4 : existData.airline_image_4,
      from_date_1: body.from_date_1 ? body.from_date_1 : existData.from_date_1,
      from_date_2: body.from_date_2 ? body.from_date_2 : existData.from_date_2,
      from_date_3: body.from_date_3 ? body.from_date_3 : existData.from_date_3,
      from_date_4: body.from_date_4 ? body.from_date_4 : existData.from_date_4,
      flight_number_1: body.flight_number_1 ? body.flight_number_1 : existData.flight_number_1,
      flight_number_2: body.flight_number_2 ? body.flight_number_2 : existData.flight_number_2,
      flight_number_3: body.flight_number_3 ? body.flight_number_3 : existData.flight_number_3,
      flight_number_4: body.flight_number_4 ? body.flight_number_4 : existData.flight_number_4,
      departure_1: body.departure_1 ? body.departure_1 : existData.departure_1,
      departure_2: body.departure_2 ? body.departure_2 : existData.departure_2,
      departure_3: body.departure_3 ? body.departure_3 : existData.departure_3,
      departure_4: body.departure_4 ? body.departure_4 : existData.departure_4,
      destination_time_1: body.destination_time_1 ? body.destination_time_1 : existData.destination_time_1,
      destination_time_2: body.destination_time_2 ? body.destination_time_2 : existData.destination_time_2,
      destination_time_3: body.destination_time_3 ? body.destination_time_3 : existData.destination_time_3,
      destination_time_4: body.destination_time_4 ? body.destination_time_4 : existData.destination_time_4,
      departure_time_1: body.departure_time_1 ? body.departure_time_1 : existData.departure_time_1,
      departure_time_2: body.departure_time_2 ? body.departure_time_2 : existData.departure_time_2,
      departure_time_3: body.departure_time_3 ? body.departure_time_3 : existData.departure_time_3,
      departure_time_4: body.departure_time_4 ? body.departure_time_4 : existData.departure_time_4,
      destination_1: body.destination_1 ? body.destination_1 : existData.destination_1,
      destination_2: body.destination_2 ? body.destination_2 : existData.destination_2,
      destination_3: body.destination_3 ? body.destination_3 : existData.destination_3,
      destination_4: body.destination_4 ? body.destination_4 : existData.destination_4,
    }, {
      where: { id: body.id }
    });

    return ReS(res, { message: "Block available has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await BlockAvailable.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Block available has been deleted successfully." }, 200);
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


