const { AssignPackageTransportDetails, Driver, B2bUser } = require("@models");
const hotel = require("@root/models/hotel");
const { ReE, ReS, to } = require("@services/util.service");
const { check } = require("express-validator");
const { assign } = require("nodemailer/lib/shared");



// const fetchUpcomingAndExpiry = async (req, res) => {
//   try {
//     const data = await AssignPackageTransportDetails.findAll({
//       order: [["id", "DESC"]],
//     });

//     if (!data || data.length === 0) {
//       return ReE(res, { message: "No Data Found" }, 200);
//     }

//     const today = new Date();
//     const todayDateOnly = new Date(today.toDateString()); // remove time part

//     const processedData = data
//       .map((item) => {
//         const assignDate = new Date(item.assign_date);
//         const assignDateOnly = new Date(assignDate.toDateString());

//         const diffDays =
//           (todayDateOnly - assignDateOnly) / (1000 * 60 * 60 * 24);

//         // difference meaning:
//         // diffDays = -1 => upcoming (1 day before)
//         // diffDays = 1  => expiry (1 day after)
//         // diffDays >= 2 => remove (skip)
//         // diffDays = 0  => normal (no flag)

//         let statusFlag = null;

//         if (diffDays === -1) {
//           statusFlag = "upcoming";
//         } else if (diffDays === 1) {
//           statusFlag = "expiry";
//         } else if (diffDays >= 2) {
//           return null; // remove
//         }

//         return {
//           ...item.dataValues,
//           statusFlag,
//         };
//       })
//       .filter((item) => item !== null);

//     return ReS(res, {
//       result: { data: processedData },
//       message: "success",
//     });
//   } catch (error) {
//     console.error("Error fetching upcoming/expiry:", error);
//     return ReE(res, { message: "Something Went Wrong", err: error }, 500);
//   }
// };

// const fetchUpcomingAndExpiry = async (req, res) => {
//   try {
//     const data = await AssignPackageTransportDetails.findAll({
//       order: [["id", "DESC"]],
//     });

//     if (!data || data.length === 0) {
//       return ReE(res, { message: "No Data Found" }, 200);
//     }

//     const today = new Date();
//     const todayDateOnly = new Date(today.toDateString()); // time hata diya

//     const filteredData = data
//       .map((item) => {
//         const assignDate = new Date(item.assign_date);
//         const assignDateOnly = new Date(assignDate.toDateString());
//         const diffDays =
//           (todayDateOnly - assignDateOnly) / (1000 * 60 * 60 * 24);

//         let statusFlag = null;

//         // upcoming: assign_date = tomorrow (diffDays = -1)
//         if (diffDays === -1) {
//           statusFlag = "upcoming";
//         }
//         // expiry: assign_date = yesterday (diffDays = 1)
//         else if (diffDays === 1) {
//           statusFlag = "expiry";
//         }
//         // remove: assign_date 2 ya usse zyada din purani hai
//         else if (diffDays >= 2) {
//           statusFlag = "remove";
//         }

//         // agar flag mila to return karo, warna null
//         if (statusFlag) {
//           return {
//             ...item.dataValues,
//             statusFlag,
//           };
//         }
//         return null;
//       })
//       .filter((item) => item !== null); // null records hatao

//     return ReS(res, {
//       result: { data: filteredData },
//       message: "success",
//     });
//   } catch (error) {
//     console.error("Error fetching upcoming/expiry:", error);
//     return ReE(res, { message: "Something Went Wrong", err: error }, 500);
//   }
// };

const fetchUpcomingAndExpiry = async (req, res) => {
  try {
    const data = await AssignPackageTransportDetails.findAll({
      order: [["id", "DESC"]],
    });
    const driverData = await Driver.findAll({
      order: [["id", "DESC"]],
    });
    const B2bUser = await B2bUser.findAll({
      order: [["id", "DESC"]],
    });
    if (!data || data.length === 0) {
      return ReE(res, { message: "No Data Found" }, 200);
    }

    const today = new Date();
    const todayDateOnly = new Date(today.toDateString()); // time part removed

    // Arrays to keep data and records to soft-delete
    const processedData = [];
    const toSoftDelete = [];

    for (const item of data) {
      const assignDate = new Date(item.assign_date);
      const assignDateOnly = new Date(assignDate.toDateString());
      const diffDays =
        (todayDateOnly - assignDateOnly) / (1000 * 60 * 60 * 24);

      let statusFlag = null;

      if (diffDays === -1) {
        statusFlag = "upcoming";
      } else if (diffDays === 1) {
        statusFlag = "expiry";
      } else if (diffDays >= 2) {
        // mark for soft delete
        toSoftDelete.push(item.id);
        continue; // skip showing
      }
      // Merge driver details by transport_id
      const driver = driverData.find(
        (d) => d.transport_id === item.id
      );
      // 🔹 Merge company details by b2b_user_id or company_id
      const company = B2bUser.find(
        (b) => b.id === item.b2b_user_id || b.id === item.company_id
      );

      if (statusFlag) {
        processedData.push({
          ...item.dataValues,
          statusFlag,
          driverDetails: driver ? driver.dataValues : null,
          companyName: company ? company.company_name : null,
        });
      }
    }

    // ✅ Soft delete (update deleted_at for remove condition)
    if (toSoftDelete.length > 0) {
      await AssignPackageTransportDetails.update(
        { deleted_at: new Date() },
        { where: { id: toSoftDelete } }
      );
    }

    return ReS(res, {
      result: { data: processedData },
      message: "success",
    });
  } catch (error) {
    console.error("Error fetching upcoming/expiry:", error);
    return ReE(res, { message: "Something Went Wrong", err: error }, 500);
  }
};






module.exports = {
  fetchUpcomingAndExpiry,

};
