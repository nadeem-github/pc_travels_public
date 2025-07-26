const { Visitor, OurPackage, BlockAvailable, Hotel, AddYourAgent, ContactUs } = require("@models");
const { ReE, ReS } = require("@services/util.service");
const { Op } = require("sequelize");


const count = async function (req, res) {
  try {

    const now = new Date();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59); // last day of last monthOurPackage

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // 00:00:00

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999); // 23:59:59
    const visitorCount = await Visitor.count();
    const visitorLastMonthCount = await Visitor.count({
      where: {
        created_at: {
          [Op.between]: [startOfLastMonth, endOfLastMonth]
        }
      }
    });
    const ourPackageCount = await OurPackage.count();
    const blockAvailableCount = await BlockAvailable.count();
    const hotelCount = await Hotel.count();
    const addYourAgentCount = await AddYourAgent.count();
    const contactUsCount = await ContactUs.count();
    const contactUsRecentCount = await ContactUs.count({
      where: {
        created_at: {
          [Op.between]: [startOfToday, endOfToday]
        }
      }
    });
    const contactUsLastMonthCount = await ContactUs.count({
      where: {
        created_at: {
          [Op.between]: [startOfLastMonth, endOfLastMonth]
        }
      }
    });

    return ReS(res, {
      data: {
        visitorCount,
        visitorLastMonthCount,
        ourPackageCount,
        blockAvailableCount,
        hotelCount,
        addYourAgentCount,
        contactUsCount,
        contactUsRecentCount,
        contactUsLastMonthCount
      }, message: "success"
    });
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};




module.exports = {
  count
};
