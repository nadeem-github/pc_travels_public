const { Visitor } = require("@models");
const { ReE, ReS } = require("@services/util.service");
const useragent = require('useragent');
const crypto = require('crypto');


const fetch = async function (req, res) {
  try {
    const data = await Visitor.findAll({
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
    const userAgent = req.headers['user-agent'];
    const agent = useragent.parse(req.headers['user-agent']);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const cleanedIp = ip.replace(/^::ffff:/, '').replace(/^::1$/, '127.0.0.1');
    const rawString = `${cleanedIp}_${agent.os.toString()}_${agent.toAgent()}_${agent.device.toString()}`;
    const visitorId = crypto.createHash('md5').update(rawString).digest('hex');

    const data = await Visitor.create({
      ip_address: cleanedIp,
      user_agent: visitorId,
    })

    if (data) {
      return ReS(res, { data: data, message: "Visitor created successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};



module.exports = {
  fetch,
  create
};
