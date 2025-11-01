const { Ledger  } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];

const fetch = async function (req, res) {
  try {
    let body = req.body;
    const data = await Ledger.findAll({
      order: [['id', 'DESC']],
      where: {
        email: body.email,       
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
    const body = req.body;

    // Step 1: Create drivers and collect created records
    const createdLedgers = [];
    for (const item of body.ledgerDetails) {
      const driver = await Ledger.create({
       email: item.email, 
       service: item.service,
       ledger_date:item.ledger_date,
       opening_balance:item.opening_balance,
       opening_balance_remark:item.opening_balance_remark,
       pax:item.pax,
       rate:item.rate,
       debit:item.debit,
       credit:item.credit,
       balance:item.balance,
       remark:item.remark,
      });
      createdLedgers.push(driver);
    }
    return ReS(res, { message: "Ledger(s) created  successfully." }, 200);
  } catch (error) {
    console.error("Error:", error);
    return ReE(res, { message: "Something went wrong", err: error.message }, 500);
  }
};

const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    const ledgerDetails = await Ledger.findAll({
      where: { email: body.email }
    });
    
    return ReS(res, { data: ledgerDetails, message: "success" });

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};

const update = async function (req, res) {
  try {
    const { ledgerDetails } = req.body;

    if (!ledgerDetails || !Array.isArray(ledgerDetails)) {
      return ReE(res, { message: "ledgerDetails array is required" }, 400);
    }

    const updatedLedgers = [];

    // Step 1️⃣ Update records
    for (const item of ledgerDetails) {
      const existing = await Ledger.findOne({ where: { id: item.id } });
      if (existing) {
        const updatedData = {
          email: item.email ?? existing.email,
          service: item.service ?? existing.service,
          ledger_date:item.ledger_date ?? existing.ledger_date,
          opening_balance:item.opening_balance ?? existing.opening_balance,
          opening_balance_remark:item.opening_balance_remark ?? existing.opening_balance_remark,
          pax:item.pax ?? existing.pax,
          rate:item.rate ?? existing.rate,
          debit:item.debit ?? existing.debit,
          credit:item.credit ?? existing.credit,
          balance:item.balance ?? existing.balance,
          remark:item.remark ?? existing.remark,
        };
        const updated = await existing.update(updatedData);
        updatedLedgers.push(updated);
      }
    }


    return ReS(res, { message: "Ledger(s) updated  successfully." }, 200);
  } catch (error) {
    console.error("Error updating driver details:", error);
    return ReE(res, { message: "Something went wrong", err: error.message }, 500);
  }
};

const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Ledger.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Ledger has been deleted successfully." }, 200);
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
