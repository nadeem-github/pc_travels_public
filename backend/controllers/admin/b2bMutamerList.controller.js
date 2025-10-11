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
        // hotel_details: body.hotel_details,
        // flight_details: body.flight_details,
        // arrival_date: body.arrival_date,
        // group_size: finalTotal,
        // transport_route: body.transport_route,
        // remark: body.remark,
        // view_dirver_details: body.view_dirver_details,
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
        "id",
        "email",
        "group_name_number",
        "group_number",
        "hotel_details",
        "flight_details",
        "arrival_date",
        "return_date",
        "group_size",
        "transport_route",
        "remark",
        "view_dirver_details",
        "main_external_agent_code",
        "leader_name",
        "mobile_number"

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
          return_date: curr.return_date,
          transport_route: curr.transport_route,
          remark: [],
          group_size: curr.group_size,
          view_dirver_details: curr.view_dirver_details,
          leader_name: curr.leader_name,
          mobile_number: curr.mobile_number,
          id: curr.id,
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

const fetchByGroupName = async function (req, res) {
  try {
    let body = req.body;
    const data = await MutamersList.findOne({
      where: {
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

const create = async (req, res) => {

  try {
    let body = req.body;
    // const data = await MutamersList.findOne({
    //   where: {
    //     email: body.email,
    //     // group_name_number: body.group_name_number,
    //   }
    // });

    function getInitials(fullName) {
      if (!fullName || typeof fullName !== 'string') return '';

      // normalize spaces, remove extra punctuation (optional)
      const cleaned = fullName.trim().replace(/\s+/g, ' ').replace(/[^\p{L}\s'-]/gu, '');
      const parts = cleaned.split(' ');

      if (parts.length === 0) return '';

      // first letter of first word
      const first = parts[0].charAt(0) || '';
      // first letter of last word (if only one word, you can choose same as first or '')
      const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';

      // return uppercase letters separated (or concat if you want "RP")
      return (first + last).toUpperCase(); // => "RP"
    }
    function getDayAndMonth(dateString) {
      if (!dateString) return '';

      const date = new Date(dateString); // "2025-10-09"

      // Get day and month with leading zeros
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // month 0-based hota hai

      return `${day}${month}`; // "09-10"
    }

    // if (data) {
    //   const initials = getInitials(body.company_name);
    //   const formatted = getDayAndMonth(body.return_date);
    //   const formatted1 = getDayAndMonth(body.arrival_date);
    //   const gname = `PC${initials}${formatted1}R${formatted}`;
    //   const data1 = await MutamersList.update({
    //     group_name_number: gname,
    //     arrival_date: body.arrival_date ? body.arrival_date : data.arrival_date,
    //     return_date: body.return_date ? body.return_date : data.return_date,
    //     transport_route: body.transport_route ? body.transport_route : data.transport_route,
    //     remark: body.remark ? body.remark : data.remark,
    //     leader_name: body.leader_name ? body.leader_name : data.leader_name,
    //     mobile_number: body.mobile_number ? body.mobile_number : data.mobile_number,
    //   },
    //     {
    //       where: {
    //         email: body.email,
    //         // group_name_number: body.group_name_number,

    //       }
    //     });
    //   return ReS(res, { message: "b2b group name updated successfully." }, 200);
    // }
    // else {
    const initials = getInitials(body.company_name);
    const formatted = getDayAndMonth(body.return_date);
    const formatted1 = getDayAndMonth(body.arrival_date);
    const gname = `PC${initials}${formatted1}R${formatted}`;
    const data = await MutamersList.create({
      email: body.email,
      group_name_number: gname,
      arrival_date: body?.arrival_date,
      return_date: body?.return_date,
      transport_route: body?.transport_route,
      remark: body?.remark,
      leader_name: body?.leader_name,
      mobile_number: body?.mobile_number,
      group_size: body?.group_size,

    })
    return ReS(res, { message: "b2b group name created successfully." }, 200);
    // }

  } catch (error) {
    con
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const updateGn = async (req, res) => {

  try {
    let body = req.body;
    const data = await MutamersList.findOne({
      where: {
        email: body.email,
        id: body.id,
      }
    });

    function getInitials(fullName) {
      if (!fullName || typeof fullName !== 'string') return '';

      // normalize spaces, remove extra punctuation (optional)
      const cleaned = fullName.trim().replace(/\s+/g, ' ').replace(/[^\p{L}\s'-]/gu, '');
      const parts = cleaned.split(' ');

      if (parts.length === 0) return '';

      // first letter of first word
      const first = parts[0].charAt(0) || '';
      // first letter of last word (if only one word, you can choose same as first or '')
      const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';

      // return uppercase letters separated (or concat if you want "RP")
      return (first + last).toUpperCase(); // => "RP"
    }
    function getDayAndMonth(dateString) {
      if (!dateString) return '';

      const date = new Date(dateString); // "2025-10-09"

      // Get day and month with leading zeros
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // month 0-based hota hai

      return `${day}${month}`; // "09-10"
    }

    if (data) {
      const initials = getInitials(body.company_name);
      const formatted = getDayAndMonth(body.return_date);
      const formatted1 = getDayAndMonth(body.arrival_date);
      const gname = `PC${initials}${formatted1}R${formatted}`;
      const data1 = await MutamersList.update({
        group_name_number: gname,
        arrival_date: body.arrival_date ? body.arrival_date : data.arrival_date,
        return_date: body.return_date ? body.return_date : data.return_date,
        transport_route: body.transport_route ? body.transport_route : data.transport_route,
        remark: body.remark ? body.remark : data.remark,
        leader_name: body.leader_name ? body.leader_name : data.leader_name,
        mobile_number: body.mobile_number ? body.mobile_number : data.mobile_number,
        group_size: body.group_size ? body.group_size : data.group_size,
      },
        {
          where: {
            email: body.email,
            id: body.id,

          }
        });
      return ReS(res, { message: "b2b group name updated successfully." }, 200);
    }

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
    function getInitials(fullName) {
      if (!fullName || typeof fullName !== 'string') return '';

      // normalize spaces, remove extra punctuation (optional)
      const cleaned = fullName.trim().replace(/\s+/g, ' ').replace(/[^\p{L}\s'-]/gu, '');
      const parts = cleaned.split(' ');

      if (parts.length === 0) return '';

      // first letter of first word
      const first = parts[0].charAt(0) || '';
      // first letter of last word (if only one word, you can choose same as first or '')
      const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';

      // return uppercase letters separated (or concat if you want "RP")
      return (first + last).toUpperCase(); // => "RP"
    }
    function getDayAndMonth(dateString) {
      if (!dateString) return '';

      const date = new Date(dateString); // "2025-10-09"

      // Get day and month with leading zeros
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // month 0-based hota hai

      return `${day}${month}`; // "09-10"
    }
    const initials = getInitials(body.company_name);
    const formatted = getDayAndMonth(body.return_date);
    const formatted1 = getDayAndMonth(body.arrival_date);
    const gname = `PC${initials}${formatted1}R${formatted}`;
    await MutamersList.update({
      group_name_number: gname,
      return_date: body.return_date ? body.return_date : existData.return_date,
      leader_name: body.leader_name ? body.leader_name : existData.leader_name,
      mobile_number: body.mobile_number ? body.mobile_number : existData.mobile_number,
      group_size: body.group_size ? body.group_size : existData.group_size,

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
  create,
  fetchSingle,
  update,
  deleted,
  updateGn,
};
