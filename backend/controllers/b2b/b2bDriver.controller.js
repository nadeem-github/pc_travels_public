const { Driver, MutamersList, AssignPackageTransportDetails } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");


const fetch = async function (req, res) {
  try {
    const transportDetails = await AssignPackageTransportDetails.findAll();
    const driverDetails = await Driver.findAll();
    const mergedData = transportDetails.map(transport => {
      const relatedDrivers = driverDetails.filter(
        driver => driver.transport_id === transport.id
      );
      return {
        ...transport.dataValues,
        driverDetails: relatedDrivers
      };
    });
    return ReS(res, { data: mergedData, message: "success" });

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};

const fetchB2b = async function (req, res) {
  try {
    let body = req.body;
    const data = await Driver.findAll({
      order: [['id', 'DESC']],
      where: {
        email: body.email,
        group_name_number: body.group_name_number
      }
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
    body.driverDetails.forEach(async (item) => {
      await Driver.create({
        email: item.email,
        group_name_number: item.group_name_number,
        transport_id: item.transport_id,
        driver_name: item.driver_name,
        driver_mobile: item.driver_mobile,
        bus_no: item.bus_no,
        status: item.status,
        d_date: item.d_date,
        location: item.location,
        to_location: item.to_location,
        time: item.time,
        remarks: item.remarks,
      });
    });




    return ReS(res, { message: "Driver created successfully." }, 200);

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const transportDetails = await AssignPackageTransportDetails.findAll({
      where: { id: body.transport_id }
    });
    const driverDetails = await Driver.findAll({
      where: { transport_id: body.transport_id }
    });
    const mergedData = transportDetails.map(transport => {
      const relatedDrivers = driverDetails.filter(
        driver => driver.transport_id === transport.id
      );
      return {
        ...transport.dataValues,
        driverDetails: relatedDrivers
      };
    });
    return ReS(res, { data: mergedData, message: "success" });
   
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};

const update = async function (req, res) {
  try {
    const { driverDetails } = req.body;

    if (!driverDetails || !Array.isArray(driverDetails)) {
      return ReE(res, { message: "driverDetails array is required" }, 400);
    }

    for (const item of driverDetails) {
      // 1️⃣ Existing record lo
      const existing = await Driver.findOne({
        where: {
          id: item.id,
        },
      });
     

      if (existing) {
        // 2️⃣ Conditional update (agar naya value aaya hai to lo, warna purana rakho)
        const updatedData = {
          driver_name: item.driver_name ?? existing.driver_name,
          driver_mobile: item.driver_mobile ?? existing.driver_mobile,
          bus_no: item.bus_no ?? existing.bus_no,
          status: item.status ?? existing.status,
         
          d_date: item.d_date ?? existing.d_date,
          location: item.location ?? existing.location,
          to_location: item.to_location ?? existing.to_location,
          time: item.time ?? existing.time,
          remarks: item.remarks ?? existing.remarks,
        };

        // 3️⃣ Record update karo
        await existing.update(updatedData);
      }
    }

    return ReS(res, { message: "Driver details updated successfully." }, 200);

  } catch (error) {
    console.error("Error updating driver details:", error);
    return ReE(res, { message: "Something went wrong", err: error.message }, 500);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Driver.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Driver has been deleted successfully." }, 200);
    }).catch(function (err) {
      return ReE(res, { message: "Somthing Went Wrong", err: err.errors }, 200);
    });

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
}


module.exports = {
  fetch,
  fetchB2b,
  create,
  fetchSingle,
  update,
  deleted
};
