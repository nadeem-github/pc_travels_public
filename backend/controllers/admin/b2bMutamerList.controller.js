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
        group_size: body.group_size,  
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
    }

    return ReS(res, { message: "Data inserted successfully." }, 200);
  } catch (error) {
    console.error("Error inserting data:", error);
    return ReE(res, { message: "Error while inserting data.", error }, 500);
  }
}


module.exports = {
  uploadExcelToDatabase,
};
