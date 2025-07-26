const { Hotel } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const data = await Hotel.findAll({
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
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/hotel`;
    let hotelImage1 = "";
    let hotelImage2 = "";
    let hotelImage3 = "";
    let hotelImage4 = "";
    let hotelImage5 = "";
    if (files) {
      if (files.hotel_image_1) {
        const homeTopSliderName = Date.now() + '-' + files.hotel_image_1.name;
        hotelImage1 = "hotel/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.hotel_image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.hotel_image_2) {
        const homeTopSliderName = Date.now() + '-' + files.hotel_image_2.name;
        hotelImage2 = "hotel/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.hotel_image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.hotel_image_3) {
        const homeTopSliderName = Date.now() + '-' + files.hotel_image_3.name;
        hotelImage3 = "hotel/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.hotel_image_3, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.hotel_image_4) {
        const homeTopSliderName = Date.now() + '-' + files.hotel_image_4.name;
        hotelImage4 = "hotel/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.hotel_image_4, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.hotel_image_5) {
        const homeTopSliderName = Date.now() + '-' + files.hotel_image_5.name;
        hotelImage5 = "hotel/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.hotel_image_5, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await Hotel.create({
      name: body.name,
      hotel_image_1: hotelImage1,
      hotel_image_2: hotelImage2,
      hotel_image_3: hotelImage3,
      hotel_image_4: hotelImage4,
      hotel_image_5: hotelImage5,
      description: body.description,
      price: body.price,
    })

    if (data) {
      return ReS(res, { message: "Hotel created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Hotel.findOne({
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
    const existData = await Hotel.findOne({
      where: { id: body.id }
    });
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/hotel`;
    if (!existData) {
      return ReE(res, { message: "No Data Found" }, 200);
    }
    let hotelImage1 = ""
    let hotelImage2 = ""
    let hotelImage3 = ""
    let hotelImage4 = ""
    let hotelImage5 = ""
    if (files) {
      if (files.hotel_image_1) {
        const homeTopSliderName = Date.now() + '-' + files.hotel_image_1.name;
        hotelImage1 = "hotel/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.hotel_image_1, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.hotel_image_2) {
        const homeTopSliderName = Date.now() + '-' + files.hotel_image_2.name;
        hotelImage2 = "hotel/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.hotel_image_2, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.hotel_image_3) {
        const homeTopSliderName = Date.now() + '-' + files.hotel_image_3.name;
        hotelImage3 = "hotel/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.hotel_image_3, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.hotel_image_4) {
        const homeTopSliderName = Date.now() + '-' + files.hotel_image_4.name;
        hotelImage4 = "hotel/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.hotel_image_4, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.hotel_image_5) {
        const homeTopSliderName = Date.now() + '-' + files.hotel_image_5.name;
        hotelImage5 = "hotel/" + homeTopSliderName;
        const homeTopSlidername = await helper.fileUpload(homeTopSliderName, files.hotel_image_5, baseFileUploadPath);
        if (!homeTopSlidername) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }

    }
    await Hotel.update({
      name: body.name ? body.name : existData.name,
      hotel_image_1: hotelImage1 ? hotelImage1 : existData.hotel_image_1,
      hotel_image_2: hotelImage2 ? hotelImage2 : existData.hotel_image_2,
      hotel_image_3: hotelImage3 ? hotelImage3 : existData.hotel_image_3,
      hotel_image_4: hotelImage4 ? hotelImage4 : existData.hotel_image_4,
      hotel_image_5: hotelImage5 ? hotelImage5 : existData.hotel_image_5,
      description: body.description ? body.description : existData.description,
      price: body.price ? body.price : existData.price
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "Hotel has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Hotel.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Hotel has been deleted successfully." }, 200);
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
