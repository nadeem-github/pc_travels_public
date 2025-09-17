const { MutamersList } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("@models");



// ===================== LOGIN =====================
const fetch = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return ReS(res, { message: "Email is required" }, 200);
    }
    // 1. Sab data ek sath lao
    const records = await MutamersList.findAll({
      where: { email },
      attributes: ["email", "group_name_number", "group_number",
         "hotel_details","flight_details","arrival_date","group_size",
         "transport_route","remark","view_dirver_details"],
      raw: true
    });
    if (!records.length) {
      return ReS(res, { message: "No records found for this email" }, 200);
    }
    // 2. Data ko restructure karo
    const groupedData = records.reduce((acc, curr) => {
      // check if group_name_number already added
      let existing = acc.find(item => item.group_name_number === curr.group_name_number);
      if (!existing) {
        existing = {
          email: curr.email,
          group_name_number: curr.group_name_number,
          hotel_details: curr.hotel_details,
          flight_details: curr.flight_details,
          arrival_date: curr.arrival_date,
          transport_route: curr.transport_route,
          // remark: curr.remark,
          remark: [],
          group_size: curr.group_size,
          view_dirver_details: curr.view_dirver_details,
          groupnumber: []
        };
        acc.push(existing);
      }
      // push unique group_number
      if (!existing.groupnumber.includes(curr.group_number)) {
        existing.groupnumber.push(curr.group_number);
        existing.remark.push(curr.remark);
      }
      return acc;
    }, []);
    return ReS(res, { data: groupedData, message: "success" });
  } catch (error) {
    console.error(error);
  }
};

// const fetch = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return ReS(res, { message: "Email is required" }, 200);
//     }

//     const results = await sequelize.query(
//       `SELECT 
//           email,
//           group_name_number,
//           hotel_details,
//           flight_details,
//           arrival_date,
//           group_size,
//           transport_route,
//           view_dirver_details,
//           GROUP_CONCAT(DISTINCT group_number) AS groupnumber,
//           GROUP_CONCAT(DISTINCT remark) AS remark
//        FROM mutamers_list
//        WHERE email = :email
//        GROUP BY email, group_name_number, hotel_details, flight_details, 
//                 arrival_date, group_size, transport_route, view_dirver_details`,
//       {
//         replacements: { email },
//         type: QueryTypes.SELECT
//       }
//     );

//     // GROUP_CONCAT string ko array me convert karo
//     const formatted = results.map(r => ({
//       ...r,
//       groupnumber: r.groupnumber ? r.groupnumber.split(",") : [],
//       remark: r.remark ? r.remark.split(",") : []
//     }));

//     return ReS(res, { data: formatted, message: "success" });
//   } catch (error) {
//     console.error(error);
//     return ReS(res, { message: "Server Error" }, 500);
//   }
// };


module.exports = {
  fetch,
};
