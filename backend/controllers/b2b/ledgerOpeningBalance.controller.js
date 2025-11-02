const { LedgerOpeningBalance, MutamersList } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");

const fetch = async function (req, res) {
  try {
    const data = await LedgerOpeningBalance.findAll({
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
    const data = await LedgerOpeningBalance.create({
      email: body.email,
      opening_balance: body.opening_balance,
      
    })
return ReS(res, { message: "Opening Balance created  successfully." }, 200);
 

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await LedgerOpeningBalance.findOne({
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
    const existData = await LedgerOpeningBalance.findOne({
      where: { id: body.id }
    });

    await LedgerOpeningBalance.update({
      opening_balance: body.opening_balance ? body.opening_balance : existData.opening_balance,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "LedgerOpeningBalance has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await LedgerOpeningBalance.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "LedgerOpeningBalance has been deleted successfully." }, 200);
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
