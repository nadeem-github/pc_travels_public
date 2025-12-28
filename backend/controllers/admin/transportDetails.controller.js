const { AssignPackageTransportDetails, Driver, B2bUser, Ledger } = require("@models");
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

// const fetchUpcomingAndExpiry = async (req, res) => {
//   try {
//     const data = await AssignPackageTransportDetails.findAll({
//       order: [["id", "DESC"]],
//     });
//     const driverData = await Driver.findAll({
//       order: [["id", "DESC"]],
//     });
//     const B2bUserData = await B2bUser.findAll({
//       order: [["id", "DESC"]],
//     });
//     if (!data || data.length === 0) {
//       return ReE(res, { message: "No Data Found" }, 200);
//     }

//     const today = new Date();
//     const todayDateOnly = new Date(today.toDateString()); // time part removed

//     // Arrays to keep data and records to soft-delete
//     const processedData = [];
//     const toSoftDelete = [];

//     for (const item of data) {
//       const assignDate = new Date(item.assign_date);
//       const assignDateOnly = new Date(assignDate.toDateString());
//       const diffDays =
//         (todayDateOnly - assignDateOnly) / (1000 * 60 * 60 * 24);

//       let statusFlag = null;

//       if (diffDays <= 0 && diffDays >= -1) {
//         statusFlag = "upcoming";
//       } else if (diffDays === 1) {
//         statusFlag = "expiry";
//       } else if (diffDays >= 2) {
//         // mark for soft delete
//         toSoftDelete.push(item.id);
//         continue; // skip showing
//       }
//       // Merge driver details by transport_id
//       const driver = driverData.find(
//         (d) => d.transport_id === item.id
//       );
//       // 🔹 Merge company details by b2b_user_id or company_id
//       const company = B2bUserData.find(
//         (b) => b.email === item.email 
//       );

//       if (statusFlag) {
//         processedData.push({
//           ...item.dataValues,
//           statusFlag,
//           driverDetails: driver ? driver.dataValues : null,
//           companyName: company ? company.company_name : null,
//         });
//       }
//     }

//     // ✅ Soft delete (update deleted_at for remove condition)
//     if (toSoftDelete.length > 0) {
//       await AssignPackageTransportDetails.update(
//         { deleted_at: new Date() },
//         { where: { id: toSoftDelete } }
//       );
//     }

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
//     const driverData = await Driver.findAll({
//       order: [["id", "DESC"]],
//     });
//     const B2bUserData = await B2bUser.findAll({
//       order: [["id", "DESC"]],
//     });
//     const ledgerData = await Ledger.findAll({
//       order: [["id", "DESC"]],
//     });

//     if (!data || data.length === 0) {
//       return ReE(res, { message: "No Data Found" }, 200);
//     }

//     const now = new Date();
//     const todayDateOnly = new Date(now.toDateString()); // remove time part

//     const processedData = [];
//     const toSoftDelete = [];

//     for (const item of data) {
//       const assignDate = new Date(item.assign_date);
//       const assignDateOnly = new Date(assignDate.toDateString());
//       const diffDays =
//         (todayDateOnly - assignDateOnly) / (1000 * 60 * 60 * 24);

//       let statusFlag = null;

//       // ✅ Updated expiry logic: even 1 second before current time => expiry
//       if (assignDate < now) {
//         const diffHours = (now - assignDate) / (1000 * 60 * 60);
//         if (diffHours >= 48) {
//           // 2 days or more -> soft delete
//           toSoftDelete.push(item.id);
//           continue;
//         } else {
//           statusFlag = "expiry";
//         }
//       } else if (diffDays <= 0 && diffDays >= -1) {
//         // upcoming if today or tomorrow (same as before)
//         statusFlag = "upcoming";
//       }

//       // 🔹 Merge driver details by transport_id
//       const driver = driverData.find(
//         (d) => d.transport_id === item.id
//       );

//       // 🔹 Merge company details by email
//       const company = B2bUserData.find(
//         (b) => b.email === item.email
//       );

//       const ledger = ledgerData.find(
//         (l) => l.email === item.email
//       );

//       if (statusFlag) {
//         processedData.push({
//           ...item.dataValues,
//           statusFlag,
//           driverDetails: driver ? driver.dataValues : null,
//           companyName: company ? company.company_name : null,
//           balanceAmount: ledger ? ledger.balance : null,
//         });
//       }
//     }

//     // ✅ Soft delete (update deleted_at for remove condition)
//     if (toSoftDelete.length > 0) {
//       await AssignPackageTransportDetails.update(
//         { deleted_at: new Date() },
//         { where: { id: toSoftDelete } }
//       );
//     }

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
//     // ⚠️ Note: This fetches ALL data. As your DB grows, consider using pagination or specific 'where' clauses.
//     const data = await AssignPackageTransportDetails.findAll({
//       order: [["id", "DESC"]],
//     });
//     const driverData = await Driver.findAll({
//       order: [["id", "DESC"]],
//     });
//     const B2bUserData = await B2bUser.findAll({
//       order: [["id", "DESC"]],
//     });
//     const ledgerData = await Ledger.findAll({
//       order: [["id", "DESC"]],
//     });

//     if (!data || data.length === 0) {
//       return ReE(res, { message: "No Data Found" }, 200);
//     }

//     const now = new Date();
//     const todayDateOnly = new Date(now.toDateString()); // remove time part

//     const processedData = [];
//     // ❌ Removed: const toSoftDelete = [];

//     for (const item of data) {
//       const assignDate = new Date(item.assign_date);
//       const assignDateOnly = new Date(assignDate.toDateString());

//       // Calculate diff in days (ignoring time)
//       const diffDays = (todayDateOnly - assignDateOnly) / (1000 * 60 * 60 * 24);

//       let statusFlag = null;

//       // ✅ Updated Logic: No Soft Delete
//       if (assignDate < now) {
//         // अगर date निकल चुकी है, तो सीधे expiry mark करें (चाहे कितना भी पुराना हो)
//         statusFlag = "expiry";
//       } else if (diffDays <= 0 && diffDays >= -1) {
//         // Upcoming if today or tomorrow
//         statusFlag = "upcoming";
//       }

//       // 🔹 Merge driver details by transport_id
//       const driver = driverData.find((d) => d.transport_id === item.id);

//       // 🔹 Merge company details by email
//       const company = B2bUserData.find((b) => b.email === item.email);

//       const ledger = ledgerData.find((l) => l.email === item.email);

//       if (statusFlag) {
//         processedData.push({
//           ...item.dataValues,
//           statusFlag,
//           driverDetails: driver ? driver.dataValues : null,
//           companyName: company ? company.company_name : null,
//           balanceAmount: ledger ? ledger.balance : null,
//         });
//       }
//     }

//     // ❌ Removed: Soft delete database update block

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
//     const driverData = await Driver.findAll({
//       order: [["id", "DESC"]],
//     });
//     const B2bUserData = await B2bUser.findAll({
//       order: [["id", "DESC"]],
//     });
//     const ledgerData = await Ledger.findAll({
//       order: [["id", "DESC"]],
//     });

//     if (!data || data.length === 0) {
//       return ReE(res, { message: "No Data Found" }, 200);
//     }

//     const now = new Date();
//     const todayDateOnly = new Date(now.toDateString());

//     const processedData = [];

//     for (const item of data) {
//       // 🕒 Time Calculation
//       const createdAt = new Date(item.created_at);
//       const assignDate = new Date(item.assign_date);

//       // Calculate differences in hours
//       const diffCreatedHours = (now - createdAt) / (1000 * 60 * 60);
//       const diffAssignHours = (now - assignDate) / (1000 * 60 * 60);

//       // 🛑 FILTER LOGIC:

//       // 1. अगर Assign Date (Trip Date) 48 घंटे से ज्यादा पुरानी है -> Skip
//       // (भले ही record अभी create हुआ हो, अगर trip 3 दिन पुरानी है तो नहीं दिखेगा)
//       if (assignDate < now && diffAssignHours > 48) {
//         continue;
//       }

//       // 2. अगर Created At 48 घंटे से पुराना है -> Skip
//       if (diffCreatedHours > 48) {
//         continue;
//       }

//       // --- बाकी Logic Same रहेगा ---
//       const assignDateOnly = new Date(assignDate.toDateString());
//       const diffDays = (todayDateOnly - assignDateOnly) / (1000 * 60 * 60 * 24);

//       let statusFlag = null;

//       if (assignDate < now) {
//         // Expiry (जो 48 घंटे के अंदर है, सिर्फ वही यहाँ आएगा)
//         statusFlag = "expiry";
//       } else if (diffDays <= 0 && diffDays >= -1) {
//         // Upcoming
//         statusFlag = "upcoming";
//       }

//       const driver = driverData.find((d) => d.transport_id === item.id);
//       const company = B2bUserData.find((b) => b.email === item.email);
//       const ledger = ledgerData.find((l) => l.email === item.email);

//       if (statusFlag) {
//         processedData.push({
//           ...item.dataValues,
//           statusFlag,
//           driverDetails: driver ? driver.dataValues : null,
//           companyName: company ? company.company_name : null,
//           balanceAmount: ledger ? ledger.balance : null,
//         });
//       }
//     }

//     return ReS(res, {
//       result: { data: processedData },
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

    const driverData = await Driver.findAll({ order: [["id", "DESC"]] });
    const B2bUserData = await B2bUser.findAll({ order: [["id", "DESC"]] });
    const ledgerData = await Ledger.findAll({ order: [["id", "DESC"]] });

    if (!data || data.length === 0) {
      return ReE(res, { message: "No Data Found" }, 200);
    }

    const now = new Date();

    // Today 12:00 AM
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    // Next 24 hours
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // 48 hours before now
    const expiryLimit = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    const processedData = [];

    for (const item of data) {
      const assignDate = new Date(item.assign_date);
      let statusFlag = null;

      /* ------------------- UPCOMING ------------------- */
      // Today + next 24 hours
      if (assignDate >= todayStart && assignDate <= next24Hours) {
        statusFlag = "upcoming";
      }

      /* ------------------- EXPIRY ------------------- */
      // Past but ONLY last 48 hours
      else if (assignDate < todayStart && assignDate >= expiryLimit) {
        statusFlag = "expiry";
      }

      // Ignore data older than 48 hours
      if (!statusFlag) continue;

      const driver = driverData.find(d => d.transport_id === item.id);
      const company = B2bUserData.find(b => b.email === item.email);
      const ledger = ledgerData.find(l => l.email === item.email);

      processedData.push({
        ...item.dataValues,
        statusFlag,
        driverDetails: driver ? driver.dataValues : null,
        companyName: company ? company.company_name : null,
        balanceAmount: ledger ? ledger.balance : null,
      });
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
