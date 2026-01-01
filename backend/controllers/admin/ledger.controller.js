const { Ledger } = require("@models");
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

// const create = async (req, res) => {
//   try {
//     const body = req.body;
//     // Step 1: Create drivers and collect created records
//     const createdLedgers = [];
//     for (const item of body.ledgerDetails) {
//       const driver = await Ledger.create({
//         email: item.email,
//         service: item.service,
//         ledger_date: item.ledger_date,
//         particulars: item.particulars,
//         particular_remark: item.particular_remark,
//         pax: item.pax,
//         rate: item.rate,
//         debit: item.debit,
//         credit: item.credit,
//         balance: item.balance,
//         remark: item.remark,
//       });
//       createdLedgers.push(driver);
//     }
//     return ReS(res, { message: "Ledger(s) created  successfully." }, 200);
//   } catch (error) {
//     console.error("Error:", error);
//     return ReE(res, { message: "Something went wrong", err: error.message }, 500);
//   }
// };

const create = async (req, res) => {
  try {
    const { ledgerDetails } = req.body;

    if (!ledgerDetails || !Array.isArray(ledgerDetails)) {
      return ReE(res, { message: "Invalid ledger details provided" }, 400);
    }

    // Saare records ko prepare aur create karne ke liye map function
    const creationPromises = ledgerDetails.map(async (item) => {

      // 1. Frontend ki date se object banayein
      let fullDate = new Date(item.ledger_date);

      // 2. Current system time (H:M:S) nikalein
      const now = new Date();

      // 3. Frontend ki date mein current time set karein
      fullDate.setHours(now.getHours());
      fullDate.setMinutes(now.getMinutes());
      fullDate.setSeconds(now.getSeconds());

      // Database mein entry create karein
      return await Ledger.create({
        email: item.email,
        service: item.service,
        ledger_date: fullDate, // Ab ye "2026-01-01 22:15:30" jaisa jayega
        particulars: item.particulars,
        particular_remark: item.particular_remark,
        pax: item.pax,
        rate: item.rate,
        debit: item.debit,
        credit: item.credit,
        balance: item.balance,
        remark: item.remark,
      });
    });

    // Saari entries ko ek saath execute karein
    const createdLedgers = await Promise.all(creationPromises);

    return ReS(res, {
      message: "Ledger(s) created successfully.",
      count: createdLedgers.length
    }, 200);

  } catch (error) {
    console.error("Error creating ledger:", error);
    return ReE(res, {
      message: "Something went wrong",
      err: error.message
    }, 500);
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
          ledger_date: item.ledger_date ?? existing.ledger_date,
          particulars: item.particulars ?? existing.particulars,
          particular_remark: item.particular_remark ?? existing.particular_remark,
          pax: item.pax ?? existing.pax,
          rate: item.rate ?? existing.rate,
          debit: item.debit ?? existing.debit,
          credit: item.credit ?? existing.credit,
          balance: item.balance ?? existing.balance,
          remark: item.remark ?? existing.remark,
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
