const { Driver, MutamersList, AssignPackageTransportDetails } = require("@models");
const { ReE, ReS, to } = require("@services/util.service");
const app = require('@services/app.service');
const config = require('@config/app.json')[app['env']];
const helper = require("@helpers/fileupload.helper");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pctravelsweb@gmail.com",   // <-- आपका Gmail
    pass: "pdkd jfnt vupn opgq"  // <-- 16 digit App Password
  }
});


const fetch = async function (req, res) {
  try {
    let body = req.body;
    const transportDetails = await AssignPackageTransportDetails.findAll({
      order: [['id', 'DESC']],
      where: {
        email: body.email,
        group_name_number: body.group_name_number
      }
    });
    const driverDetails = await Driver.findAll({
      order: [['id', 'DESC']],
      where: {
        email: body.email,
        group_name_number: body.group_name_number
      }
    });
    const mergedData = transportDetails.map(transport => {
      const relatedDrivers = driverDetails.filter(
        driver => driver.transport_id === transport.id
      );
      return {
        ...transport.dataValues,
        driverDetails: relatedDrivers
      };
    });
    return ReS(res, { data: mergedData, message: "success" });

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};


const fetchB2b = async function (req, res) {
  try {
    let body = req.body;
    const data = await Driver.findAll({
      order: [['id', 'DESC']],
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

// const create = async (req, res) => {
//   try {
//     let body = req.body;
//     body.driverDetails.forEach(async (item) => {
//       await Driver.create({
//         email: item.email,
//         group_name_number: item.group_name_number,
//         transport_id: item.transport_id,
//         driver_name: item.driver_name,
//         driver_mobile: item.driver_mobile,
//         bus_no: item.bus_no,
//         status: item.status,
//         // d_date: item.d_date,
//         location: item.location,
//         to_location: item.to_location,
//         time: item.time,
//         remarks: item.remarks,
//       });
//     });
//          await transporter.sendMail({
//             from: 'pctravelsweb@gmail.com',
//             to: 'rupeshpantawane62@gmail.com',
//             subject: "Welcome to PC Travels - Your Account is Activated",
//             // text: `Your OTP is ${OtpValue}`,
//             html: `
//       <div style="font-family:Arial,sans-serif;background:#b7ffac;padding:20px;margin:0;">
//       <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
//         <div style="background:#174a7f;text-align:center;padding:20px;">
//           <img src="https://pctravelsonline.com/assets/images/logo.png" width="150" style="max-width:100%;height:auto;" alt="PC Travels" />
//         </div>
//         <div style="padding:24px;">
//           <h2 style="color:#174a7f;margin-top:0;text-align: center;">Welcome to PC Travels!</h2>
//           <p style="font-size:15px;color:#333;">Dear <b></b>,</p>
//           <p style="font-size:15px;color:#444;line-height:1.6;">
//             Your account has been successfully <b style="color: #039a03">activated</b>. Use the credentials below to log in:
//           </p>
    
//           <div style="background:#f0f4fa;padding:14px;border-radius:6px;margin:16px 0;">
//             <p style="margin:4px 0;"><b>Email:</b> <span style="color:#174a7f;"></span></p>
//             <p style="margin:4px 0;"><b>Password:</b> <span style="color:#174a7f;"></span></p>
//           </div>
    
//           <div style="text-align:center;margin:30px 0;">
//             <a href="https://pctravelsonline.com/b2b/login" target="_blank"
//                style="display:inline-block;background:#174a7f;color:#fff;text-decoration:none;padding:12px 26px;border-radius:6px;font-weight:bold;">
//               Login Now
//             </a>
//           </div>
    
//           <p style="font-size:13px;color:#666;text-align:center">For security, please change your password after first login.</p>
//         </div>
//         <div style="background:#f6f9fc;padding:14px;text-align:center;font-size:12px;color:#888;">
//           ©  PC Travels. All rights reserved.
//         </div>
//       </div>
//     </div>
//       `
//           });

//     return ReS(res, { message: "Driver created successfully." }, 200);

//   } catch (error) {
//     return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
//   }
// };

const create = async (req, res) => {
  try {
    const body = req.body;

    // Step 1: Create drivers and collect created records
    const createdDrivers = [];
    for (const item of body.driverDetails) {
      const driver = await Driver.create({
        email: item.email,
        group_name_number: item.group_name_number,
        transport_id: item.transport_id,
        driver_name: item.driver_name,
        driver_mobile: item.driver_mobile,
        bus_no: item.bus_no,
        status: item.status,
        location: item.location,
        to_location: item.to_location,
        time: item.time,
        remarks: item.remarks,
      });
      createdDrivers.push(driver);
    }

     const groupName = createdDrivers[0]?.group_name_number || "N/A";
    // Step 2: Find all transport details for these transport_ids
    const transportIds = createdDrivers.map((d) => d.transport_id);
    const transportDetails = await AssignPackageTransportDetails.findAll({
      where: { id: transportIds },
    });

    // Step 3: Generate HTML tables for email
    const driverTable = `
      <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="background:#174a7f;color:#fff;">
            <th>Driver Name</th>
            <th>Mobile</th>
            <th>Bus No</th>
            <th>Status</th>
            <th>From</th>
            <th>To</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          ${createdDrivers
            .map(
              (d) => `
              <tr>
                <td>${d.driver_name}</td>
                <td>${d.driver_mobile}</td>
                <td>${d.bus_no}</td>
                <td>${d.notes}</td>
                <td>${d.location}</td>
                <td>${d.to_location}</td>
                <td>${d.time}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
    `;

    const transportTable = `
      <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;margin-top:20px;">
        <thead>
          <tr style="background:#174a7f;color:#fff;">
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Time</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          ${transportDetails
            .map(
              (t) => `
              <tr>
                <td>${t.assign_from}</td>
                <td>${t.assign_to || "-"}</td>
                <td>${t.assign_date || "-"}</td>
                <td>${t.assign_time || "-"}</td>
                <td>${t.notes || "-"}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
    `;

    // Step 5: Send Email
    await transporter.sendMail({
      from: "pctravelsweb@gmail.com",
      to: "m.nadeempatel@gmail.com",
      subject: `PC Travels - Driver & Transport Details (${groupName})`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
          <div style="max-width:700px;margin:auto;background:#fff;padding:24px;border-radius:8px;">
            <h2 style="color:#174a7f;text-align:center;">Group: ${groupName}</h2>
            <p style="font-size:15px;color:#333;text-align:center;">
              Below are the driver and transport details for <b>${groupName}</b>:
            </p>

            <h3 style="color:#174a7f;">Driver Details:</h3>
            ${driverTable}

            <h3 style="color:#174a7f;margin-top:40px;">Transport Details:</h3>
            ${transportTable}

            <p style="font-size:13px;color:#666;text-align:center;margin-top:30px;">
              © PC Travels. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    return ReS(res, { message: "Driver(s) created and email sent successfully." }, 200);
  } catch (error) {
    console.error("Error:", error);
    return ReE(res, { message: "Something went wrong", err: error.message }, 500);
  }
};

const fetchSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const transportDetails = await AssignPackageTransportDetails.findAll({
      where: { id: body.transport_id }
    });
    const driverDetails = await Driver.findAll({
      where: { transport_id: body.transport_id }
    });
    const mergedData = transportDetails.map(transport => {
      const relatedDrivers = driverDetails.filter(
        driver => driver.transport_id === transport.id
      );
      return {
        ...transport.dataValues,
        driverDetails: relatedDrivers
      };
    });
    return ReS(res, { data: mergedData, message: "success" });
   
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};

const update = async function (req, res) {
  try {
    const { driverDetails } = req.body;

    if (!driverDetails || !Array.isArray(driverDetails)) {
      return ReE(res, { message: "driverDetails array is required" }, 400);
    }

    for (const item of driverDetails) {
      // 1️⃣ Existing record lo
      const existing = await Driver.findOne({
        where: {
          id: item.id,
        },
      });
     

      if (existing) {
        // 2️⃣ Conditional update (agar naya value aaya hai to lo, warna purana rakho)
        const updatedData = {
          driver_name: item.driver_name ?? existing.driver_name,
          driver_mobile: item.driver_mobile ?? existing.driver_mobile,
          bus_no: item.bus_no ?? existing.bus_no,
          status: item.status ?? existing.status,
         
          d_date: item.d_date ?? existing.d_date,
          location: item.location ?? existing.location,
          to_location: item.to_location ?? existing.to_location,
          time: item.time ?? existing.time,
          remarks: item.remarks ?? existing.remarks,
        };

        // 3️⃣ Record update karo
        await existing.update(updatedData);
      }
    }

    return ReS(res, { message: "Driver details updated successfully." }, 200);

  } catch (error) {
    console.error("Error updating driver details:", error);
    return ReE(res, { message: "Something went wrong", err: error.message }, 500);
  }
};
const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await Driver.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "Driver has been deleted successfully." }, 200);
    }).catch(function (err) {
      return ReE(res, { message: "Somthing Went Wrong", err: err.errors }, 200);
    });

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
}


module.exports = {
  fetch,
  fetchB2b,
  create,
  fetchSingle,
  update,
  deleted
};
