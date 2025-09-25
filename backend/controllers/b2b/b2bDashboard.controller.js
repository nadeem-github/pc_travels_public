const { MutamersList, FlightDetail, B2bHotel, Driver } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("@models");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
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
        "hotel_details", "flight_details", "arrival_date", "group_size",
        "transport_route", "remark", "view_dirver_details", "main_external_agent_code"],
      // group: ["email"], 
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
      if (!existing.groupnumber.includes(curr.main_external_agent_code)) {
        existing.groupnumber.push(curr.main_external_agent_code);
        existing.remark.push(curr.remark);
      }
      return acc;
    }, []);
    return ReS(res, { data: groupedData, message: "success" });
  } catch (error) {
    console.error(error);
  }
};

const downloadMutamerList = async function (req, res) {

  try {
    let body = req.body;
    let userId = body.id
    const rows = await MutamersList.findAll({
      attributes: ["mutamer_name", "mutamer_age", "passport_number", "nationality",
        "main_external_agent_code", "main_external_agent_name", "sub_ea_code", "sub_ea_name",
        "visa_status", "biometric_status", "visa_number", "mofa_number",
      ],
      where: {
        main_external_agent_code: userId,
        email: body.email,
        group_name_number: body.group_name_number
      }
    });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");
    const extractedData = rows.map(row => row.dataValues);

    if (extractedData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    const headers = [
      "Mutamer Name",
      "Mutamer Age",
      "Passport Number",
      "Nationality",
      "Main External Agent Code",
      "Main External Agent Name",
      "Sub EA Code",
      "Sub EA Name",
      "Visa Status",
      "Biometric Status",
      "Visa Number",
      "Mofa Number"
    ];
    // const headers = ["Company", "Address", "Phone 1", "Phone 2", "Email", "Website", "First Name", "Last Name"]; // Custom header names
    worksheet.addRow(headers);

    // Add data rows
    extractedData.forEach(obj => {
      worksheet.addRow([obj.mutamer_name, obj.mutamer_age, obj.passport_number, obj.nationality, obj.main_external_agent_code, obj.main_external_agent_name, obj.sub_ea_code, obj.sub_ea_name, obj.visa_status, obj.biometric_status, obj.visa_number, obj.mofa_number]); // Map data manually
    });
    // Save and send file
    // const fileName = "data.xlsx";
    const timestamp = new Date().toISOString().replace(/[-:.]/g, ""); // Remove special chars
    const fileName = `export_${timestamp}.xlsx`; // Example: export_20250210084500.xlsx
    const filePath = path.join(__dirname, fileName);
    // console.log(filePath);
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
      else {
        console.log("File downloaded successfully:", filePath);
        // Optionally delete the file after sending
        setTimeout(() => fs.unlinkSync(filePath), 10000); // Delete after 10 seconds
      }
    });
    // res.json({ filePath, message: "File ready for download" });
    // return ReS(res, { message: "Exported.",filePath }, 200);
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).send("Internal Server Error");
  }

};
const fetchAll = async function (req, res) {
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
const fetchFlightDetail = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await FlightDetail.findAll({
      where: {
        id: userId,
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

const fetchHotelDetail = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await B2bHotel.findAll({
      where: {
        id: userId,
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

const fetchDriverDetail = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Driver.findAll({
      where: {
        id: userId,
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



module.exports = {
  fetch,
  downloadMutamerList,
  fetchAll,
  fetchFlightDetail,
  fetchHotelDetail,
  fetchDriverDetail
};
