const { AssignPackageTransportDetails } = require("@models");
const hotel = require("@root/models/hotel");
const { ReE, ReS, to } = require("@services/util.service");
const { check } = require("express-validator");
const { assign } = require("nodemailer/lib/shared");



const fetchUpcomingAndExpiry = async (req, res) => {
  try {
    const data = await AssignPackageTransportDetails.findAll({
      order: [["id", "DESC"]],
    });

    if (!data || data.length === 0) {
      return ReE(res, { message: "No Data Found" }, 200);
    }

    const today = new Date();
    const todayDateOnly = new Date(today.toDateString()); // remove time part

    const processedData = data
      .map((item) => {
        const assignDate = new Date(item.assign_date);
        const assignDateOnly = new Date(assignDate.toDateString());

        const diffDays =
          (todayDateOnly - assignDateOnly) / (1000 * 60 * 60 * 24);

        // difference meaning:
        // diffDays = -1 => upcoming (1 day before)
        // diffDays = 1  => expiry (1 day after)
        // diffDays >= 2 => remove (skip)
        // diffDays = 0  => normal (no flag)

        let statusFlag = null;

        if (diffDays === -1) {
          statusFlag = "upcoming";
        } else if (diffDays === 1) {
          statusFlag = "expiry";
        } else if (diffDays >= 2) {
          return null; // remove
        }

        return {
          ...item.dataValues,
          statusFlag,
        };
      })
      .filter((item) => item !== null);

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
