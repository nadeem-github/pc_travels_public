const { AssignPackage, AssignPackageTransportDetails, AssignPackageHousing, MutamersList } = require("@models");
const hotel = require("@root/models/hotel");
const { ReE, ReS, to } = require("@services/util.service");
const { check } = require("express-validator");
const { assign } = require("nodemailer/lib/shared");

const fetch = async function (req, res) {
  try {
    let body = req.body;

    const [data, data1, data2, data3] = await Promise.all([
      AssignPackage.findAll({
        order: [['id', 'ASC']],
        where: {
          email: body.email,
          group_name_number: body.group_name_number,
        },
      }),
      AssignPackageTransportDetails.findAll({
        order: [['assign_date', 'ASC']],
        attributes: ['id', 'notes', 'assign_time', 'assign_date', 'assign_to', 'assign_from'],
        where: {
          email: body.email,
          group_name_number: body.group_name_number,
        },
      }),
      AssignPackageHousing.findAll({
        order: [['check_in', 'ASC']],
        attributes: ['id', 'notes', 'check_out', 'check_in', 'nights', 'rooms', 'hotel_name', 'city'],
        where: {
          email: body.email,
          group_name_number: body.group_name_number,
        },
      }),
      MutamersList.findAll({
        attributes: [
          'main_external_agent_code',
          'email',
          'group_name_number'
        ],
        where: {
          email: body.email,
          group_name_number: body.group_name_number,
        },
        group: ['main_external_agent_code', 'email', 'group_name_number'],
        // order: [[Sequelize.literal('MAX(id)'), 'ASC']],
        order: [[Sequelize.col('id'), 'ASC']], // ✅ simpler and correct
      }),
    ]);
    if (!data) {
      return ReE(res, { message: "No Data Found" }, 200);
    }
    return ReS(res, {
      result: {
        packageDetails: data,
        transportDetails: data1,
        hotelDetails: data2
      }, message: "success"
    });
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const create = async (req, res) => {
  try {
    let body = req.body;

    const data = await AssignPackage.create({
      email: body.email,
      group_name_number: body.group_name_number,
      arrival_airport: body.arrival_airport,
      arrival_time: body.arrival_time,
      arrival_date: body.arrival_date,
      flight_no: body.flight_no,
      airline_name: body.airline_name,
      departure_airport: body.departure_airport,
      departure_time: body.departure_time,
      departure_date: body.departure_date,
      flight_no_1: body.flight_no_1,
      airline_name_1: body.airline_name_1,

    });

    body.transportDetails.forEach(async (item) => {
      await AssignPackageTransportDetails.create({
        email: body.email,
        group_name_number: body.group_name_number,
        notes: item.notes,
        assign_time: item.assign_time,
        assign_date: item.assign_date,
        assign_to: item.assign_to,
        assign_from: item.assign_from,
      });
    });
    body.hotelDetails.forEach(async (item) => {
      await AssignPackageHousing.create({
        email: body.email,
        group_name_number: body.group_name_number,
        notes: item.notes,
        check_out: item.check_out,
        check_in: item.check_in,
        nights: item.nights,
        rooms: item.rooms,
        hotel_name: item.hotel_name,
        city: item.city,
      });
    });


    if (data) {
      return ReS(res, { message: "AssignPackage created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    const [data, data1, data2] = await Promise.all([
      AssignPackage.findAll({
        order: [['id', 'ASC']],
        where: {
          email: body.email,
          group_name_number: body.group_name_number,
        },
      }),
      AssignPackageTransportDetails.findAll({
        order: [['assign_date', 'ASC']],
        attributes: ['id', 'notes', 'assign_time', 'assign_date', 'assign_to', 'assign_from'],
        where: {
          email: body.email,
          group_name_number: body.group_name_number,
        },
      }),
      AssignPackageHousing.findAll({
        order: [['check_in', 'ASC']],
        attributes: ['id', 'notes', 'check_out', 'check_in', 'nights', 'rooms', 'hotel_name', 'city'],
        where: {
          email: body.email,
          group_name_number: body.group_name_number,
        },
      }),
    ]);

    if (!data) {
      return ReE(res, { message: "No Data Found" }, 200);
    }
    return ReS(res, {
      result: {
        packageDetails: data,
        transportDetails: data1,
        hotelDetails: data2
      }, message: "success"
    });
    return ReS(res, { data: data, message: "success" });
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};

const update = async function (req, res) {
  try {
    let body = req.body;
    const existData = await AssignPackage.findOne({
      where: {
        email: body.email,
        group_name_number: body.group_name_number,
      }
    });


    await AssignPackage.update({
      arrival_airport: body.arrival_airport ? body.arrival_airport : existData.arrival_airport,
      arrival_time: body.arrival_time ? body.arrival_time : existData.arrival_time,
      arrival_date: body.arrival_date ? body.arrival_date : existData.arrival_date,
      flight_no: body.flight_no ? body.flight_no : existData.flight_no,
      airline_name: body.airline_name ? body.airline_name : existData.airline_name,
      departure_airport: body.departure_airport ? body.departure_airport : existData.departure_airport,
      departure_time: body.departure_time ? body.departure_time : existData.departure_time,
      departure_date: body.departure_date ? body.departure_date : existData.departure_date,
      flight_no_1: body.flight_no_1 ? body.flight_no_1 : existData.flight_no_1,
      airline_name_1: body.airline_name_1 ? body.airline_name_1 : existData.airline_name_1,
    },
      {
        where: {
          email: body.email,
          group_name_number: body.group_name_number,
        }
      });
    if (body.transportDetails && Array.isArray(body.transportDetails)) {
      for (const item of body.transportDetails) {
        // Existing record lo
        if (item.id) {
          const existing = await AssignPackageTransportDetails.findOne({
            where: {
              id: item.id,
              email: body.email,
              group_name_number: body.group_name_number,
            },
          });

          if (existing) {
            // Naye data agar aaye hain to unhe lo, nahi to purane value hi rakho
            const updatedData = {
              notes: item.notes ?? existing.notes,
              assign_time: item.assign_time ?? existing.assign_time,
              assign_date: item.assign_date ?? existing.assign_date,
              assign_to: item.assign_to ?? existing.assign_to,
              assign_from: item.assign_from ?? existing.assign_from,
            };

            await existing.update(updatedData);
          }
        } else {
          // 🆕 Create new
          await AssignPackageTransportDetails.create({
            email: body.email,
            group_name_number: body.group_name_number,
            notes: item.notes ?? "",
            assign_time: item.assign_time ?? null,
            assign_date: item.assign_date ?? null,
            assign_to: item.assign_to ?? "",
            assign_from: item.assign_from ?? "",
          });
        }
      }
    }
    if (body.hotelDetails && Array.isArray(body.hotelDetails)) {
      for (const item of body.hotelDetails) {
        // Existing record lo
        // console.log
        if (item.id) {
          const existing = await AssignPackageHousing.findOne({
            where: {
              id: item.id,
              email: body.email,
              group_name_number: body.group_name_number,
            },
          });

          if (existing) {
            // Naye data agar aaye hain to unhe lo, nahi to purane value hi rakho
            const updatedData = {
              notes: item.notes ?? existing.notes,
              check_out: item.check_out ?? existing.check_out,
              check_in: item.check_in ?? existing.check_in,
              nights: item.nights ?? existing.nights,
              rooms: item.rooms ?? existing.rooms,
              hotel_name: item.hotel_name ?? existing.hotel_name,
              city: item.city ?? existing.city,
            };

            await existing.update(updatedData);
          }
        } else {
          // 🆕 Create new
          await AssignPackageHousing.create({
            email: body.email,
            group_name_number: body.group_name_number,
            notes: item.notes ?? "",
            check_out: item.check_out ?? null,
            check_in: item.check_in ?? null,
            nights: item.nights ?? 0,
            rooms: item.rooms ?? 0,
            hotel_name: item.hotel_name ?? "",
            city: item.city ?? "",
          });
        }
      }
    }

    return ReS(res, { message: "AssignPackage has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    const { email, group_name_number } = req.body;

    // sabhi delete ek saath parallel chalenge
    const [packageDel, transportDel, housingDel] = await Promise.all([
      AssignPackage.destroy({
        where: { email, group_name_number },
      }),
      AssignPackageTransportDetails.destroy({
        where: { email, group_name_number },
      }),
      AssignPackageHousing.destroy({
        where: { email, group_name_number },
      }),
    ]);

    // check agar koi record mila hi nahi delete karne ke liye


    return ReS(
      res,
      { message: "All related data deleted successfully." },
      200
    );
  } catch (err) {
    return ReE(
      res,
      { message: "Something went wrong.", error: err.message },
      500
    );
  }

}


module.exports = {
  fetch,
  create,
  fetchSingle,
  update,
  deleted
};
