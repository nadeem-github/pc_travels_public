const { MutamersList } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const xlsx = require('xlsx');

const uploadExcelToDatabase = async function (req, res) {
  try {
    let body = req.body;
    const file = req.files.upload_excel;
    const groupNumber = Date.now();
    const workbook = xlsx.read(file.data, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    const BATCH_SIZE = 1000;
    const total = data.length;

    const count = await MutamersList.count({
      where: {
        email: body.email,
        group_name_number: body.group_name_number
      }
    });
    const finalTotal = total + count;

    for (let i = 0; i < total; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);

      const formattedBatch = batch.map(row => ({
        mutamer_name: row["Mutamer name"],
        email: body.email,
        group_name_number: body.group_name_number,
        group_number: groupNumber,
        hotel_details: body.hotel_details,
        flight_details: body.flight_details,
        arrival_date: body.arrival_date,
        // group_size: finalTotal,
        transport_route: body.transport_route,
        remark: body.remark,
        view_dirver_details: body.view_dirver_details,
        mutamer_age: row["Mutamer Age"],
        passport_number: row["Passport Number"],
        nationality: row["Nationality"],
        main_external_agent_code: row["Main External Agent Code"],
        main_external_agent_name: row["Main External Agent Name"],
        sub_ea_code: row["Sub EA Code"],
        sub_ea_name: row["Sub EA Name"],
        visa_status: row["Visa Status"],
        biometric_status: row["Biometric status"],
        visa_number: row["Visa Number"],
        mofa_number: row["Mofa Number"]
      }));

      await MutamersList.bulkCreate(formattedBatch);
      await MutamersList.update(
        { group_size: finalTotal },  // 👈 new value
        {
          where: {
            email: body.email,
            group_name_number: body.group_name_number
          }
        }
      );
    }

    return ReS(res, { message: "Data inserted successfully." }, 200);
  } catch (error) {
    console.error("Error inserting data:", error);
    return ReE(res, { message: "Error while inserting data.", error }, 500);
  }
}

const fetchAll = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return ReS(res, { message: "Email is required" }, 200);
    }
    // 1. Sab data ek sath lao
    const records = await MutamersList.findAll({
      attributes: [
        "email",
        "group_name_number",
        "group_number",
        "hotel_details",
        "flight_details",
        "arrival_date",
        "group_size",
        "transport_route",
        "remark",
        "view_dirver_details",
        "main_external_agent_code"
      ],
      where: { email },
      raw: true
    });

    if (!records.length) {
      return ReS(res, { message: "No records found" }, 200);
    }

    // Group by email + group_name_number
    let groupedByEmail = records.reduce((acc, curr) => {
      let emailGroup = acc.find(item => item.email === curr.email);
      if (!emailGroup) {
        emailGroup = {
          email: curr.email,
          groups: []
        };
        acc.push(emailGroup);
      }

      let existing = emailGroup.groups.find(
        g => g.group_name_number === curr.group_name_number
      );
      if (!existing) {
        existing = {
          group_name_number: curr.group_name_number,
          hotel_details: curr.hotel_details,
          flight_details: curr.flight_details,
          arrival_date: curr.arrival_date,
          transport_route: curr.transport_route,
          remark: [],
          group_size: curr.group_size,
          view_dirver_details: curr.view_dirver_details,
          groupnumber: []
        };
        emailGroup.groups.push(existing);
      }

      if (!existing.groupnumber.includes(curr.main_external_agent_code)) {
        existing.groupnumber.push(curr.main_external_agent_code);
        existing.remark.push(curr.remark);
      }

      return acc;
    }, []);

    // 👉 id add karo (1,2,3...)
    groupedByEmail = groupedByEmail.map((item, index) => ({
      id: index + 1,
      ...item
    }));


    return ReS(res, { data: groupedByEmail, message: "success" });
  } catch (error) {
    console.error(error);
  }
};
const fetch = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await MutamersList.findAll({
      where: {
        main_external_agent_code: userId,
        email: body.email,
        group_name_number: body.group_name_number
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
const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await MutamersList.findOne({
      where: {
        id: userId,
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

const update = async function (req, res) {
  try {
    let body = req.body;
    const existData = await MutamersList.findOne({
      where: { id: body.id }
    });

    await MutamersList.update({
      mutamer_name: body.mutamer_name ? body.mutamer_name : existData.mutamer_name,
      mutamer_age: body.mutamer_age ? body.mutamer_age : existData.mutamer_age,
      passport_number: body.passport_number ? body.passport_number : existData.passport_number,
      hotel_details: body.hotel_details ? body.hotel_details : existData.hotel_details,
      flight_details: body.flight_details ? body.flight_details : existData.flight_details,
      arrival_date: body.arrival_date ? body.arrival_date : existData.arrival_date,
      transport_route: body.transport_route ? body.transport_route : existData.transport_route,
      remark: body.remark ? body.remark : existData.remark,
      view_dirver_details: body.view_dirver_details ? body.view_dirver_details : existData.view_dirver_details,
      sub_ea_code: body.sub_ea_code ? body.sub_ea_code : existData.sub_ea_code,
      sub_ea_name: body.sub_ea_name ? body.sub_ea_name : existData.sub_ea_name,
      visa_status: body.visa_status ? body.visa_status : existData.visa_status,
      biometric_status: body.biometric_status ? body.biometric_status : existData.biometric_status,
      visa_number: body.visa_number ? body.visa_number : existData.visa_number,
      mofa_number: body.mofa_number ? body.mofa_number : existData.mofa_number,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "MutamersList has been updated successfully." }, 200);
  } catch (error) {
    console.error(error, "eeeee");
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await MutamersList.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "MutamersList has been deleted successfully." }, 200);
    }).catch(function (err) {
      return ReE(res, { message: "Somthing Went Wrong", err: err.errors }, 200);
    });

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
}


module.exports = {
  uploadExcelToDatabase,
  fetchAll,
  fetch,
  fetchSingle,
  update,
  deleted
};
