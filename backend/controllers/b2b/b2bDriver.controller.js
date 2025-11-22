const { Driver, MutamersList, AssignPackageTransportDetails, B2bUser } = require("@models");
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
      order: [['assign_date', 'ASC']],
      where: {
        email: body.email,
        group_name_number: body.group_name_number
      }
    });
    const driverDetails = await Driver.findAll({
      order: [['d_date', 'ASC']],
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
//           <img src="https://pctravelsonline.com/assets/images/PClogoEmail.jpg" width="150" style="max-width:100%;height:auto;" alt="PC Travels" />
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
//     const body = req.body;
//     const files = req.files; // images
//     let driverDetailsArray = [];

// // If driverDetails is JSON string (From Postman Form-Data)
// if (typeof body.driverDetails === "string") {
//   try {
//     driverDetailsArray = JSON.parse(body.driverDetails);
//   } catch (err) {
//     return ReE(res, { message: "Invalid driverDetails JSON format" }, 400);
//   }
// } else {
//   driverDetailsArray = body.driverDetails;
// }
    

//     // Step 1: Create drivers and collect created records
//     const createdDrivers = [];
//     const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/drivers`;
//     for (const item of driverDetailsArray) {
//       let uploadedDriverImage = "";
//       // ---------- IMAGE UPLOAD LOGIC (NEW) ----------
//     if (files && item.upload_pdf) {
//     // Example: item.upload_pdf = "file1" or "file2"
//     const fileArray = files[item.upload_pdf];

//     if (fileArray && fileArray.length > 0) {
//       const imgFile = fileArray[0];
//       const imageName = Date.now() + "-" + imgFile.originalname;

//       uploadedDriverImage = "drivers/" + imageName;

//       const uploaded = await helper.fileUpload(
//         imageName,
//         imgFile,
//         baseFileUploadPath
//       );

//       if (!uploaded) {
//         return ReE(res, { message: "Driver image upload failed" }, 500);
//       }
//     }
//   }
//       // ------------------------------------------------
//       const driver = await Driver.create({
//         email: item.email,
//         group_name_number: item.group_name_number,
//         transport_id: item.transport_id,
//         driver_name: item.driver_name,
//         driver_mobile: item.driver_mobile,
//         bus_no: item.bus_no,
//         status: item.status,
//         location: item.location,
//         to_location: item.to_location,
//         time: item.time,
//         remarks: item.remarks,
//         upload_pdf: uploadedDriverImage,
//       });
//       createdDrivers.push(driver);
//     }




     const body = req.body;
    const files = req.files; // express-fileupload files

    let driverDetailsArray = [];

    // Parse driverDetails JSON
    if (typeof body.driverDetails === "string") {
      try {
        driverDetailsArray = JSON.parse(body.driverDetails);
      } catch (err) {
        return res.status(400).json({ message: "Invalid driverDetails JSON" });
      }
    } else {
      driverDetailsArray = body.driverDetails;
    }

    const createdDrivers = [];
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/drivers`;

    for (const item of driverDetailsArray) {
      
      let uploadedDriverImage = "";

      // 🔥 DYNAMIC FILE UPLOAD LOGIC (file1/file2/fileX)
      if (files && item.upload_pdf) {
        // upload_pdf: "file1"
        const imgFile = files[item.upload_pdf];

        if (imgFile) {
          const imageName = Date.now() + "-" + imgFile.name;
          uploadedDriverImage = "drivers/" + imageName;

          const uploaded = await helper.fileUpload(
            imageName,
            imgFile,
            baseFileUploadPath
          );

          if (!uploaded) {
            return res
              .status(500)
              .json({ message: "Driver image upload failed" });
          }
        }
      }

      // 🔥 Create driver record
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
        upload_pdf: uploadedDriverImage,
      });

      createdDrivers.push(driver);
    }

    const email = createdDrivers[0]?.email || "N/A";
    const groupName = createdDrivers[0]?.group_name_number || "N/A";
    // Step 2: Find all transport details for these transport_ids
    const transportIds = createdDrivers.map((d) => d.transport_id);
    const transportDetails = await AssignPackageTransportDetails.findAll({
      where: { id: transportIds },
    });
    const B2bUserEmail = await B2bUser.findAll({
      where: { email: email },
    });
    const companyName = B2bUserEmail[0]?.company_name || "Valued Customer";

    // Step 3: Generate HTML tables for email
    const driverTable = `
      <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;text-align: left;">
        <thead>
          <tr style="background:#174a7f;color:#fff;">
            <th>Driver Name</th>
            <th>Mobile</th>
            <th>Bus No</th>
          </tr>
        </thead>
        <tbody>
          ${createdDrivers
        .map(
          (d) => `
              <tr>
                <td>${d.driver_name || "-"}</td>
                <td>${d.driver_mobile || "-"}</td>
                <td>${d.bus_no || "-"}</td>
              </tr>
              <tr>
                <td colspan="4">
                  <b>Remarks</b>:
                  <span>${d.remarks || "-"}</span>
                </td>
              </tr>
            `
        )
        .join("")}
        </tbody>
      </table>
    `;
    function formatDate(date) {
      if (!date) return "-";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const month = monthNames[d.getMonth()];
      const year = d.getFullYear();
      return `${day} ${month} ${year}`;
    }


    const transportTable = `
      <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;text-align: left;">
        <thead>
          <tr style="background:#174a7f;color:#fff;">
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          ${transportDetails
        .map(
          (t) => `
              <tr>
                <td>${t.assign_from || "-"}</td>
                <td>${t.assign_to || "-"}</td>
                <td>${formatDate(t.assign_date) || "-"}</td>
                <td>${t.assign_time || "-"}</td>
              </tr>
              <tr>
                <td colspan="5">
                  <b>Remarks</b>:
                  <span>${t.notes || "-"}</span>
                </td>
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
      to: `${email}`,
      subject: `PC Travels - Driver & Transport Details For Group No. - (${groupName})`,
      html: `
        <div style="font-family:Arial,sans-serif;background: #f1f1f1;padding:20px;">
          <div style="max-width:700px;margin:auto;background:#fff;padding:15px;border-radius:10px;border: solid 2px #174a7f;position: relative;">
              <div style="background:#fff;text-align:center;padding:15px; border-bottom: solid #174a7f;padding-top: 0;">
                <img src="https://pctravelsonline.com/assets/images/PClogoEmail.jpg" width="150" style="max-width:100%;height:auto;" alt="PC Travels Logo" />
              </div>

              <div>
                <p style="margin: 1rem 0 0 0;">Dear,</p>
                <h3 style="font-weight: bold;color: #174a7f;margin-top: 10px;">${companyName}</h3>
                <p style="margin-top: 10px;">Assalamu Alaikum Warahmatullahi Wabarakatuh.</p>
                <p>Thank you for choosing PC Travels.</p>
              </div>
           
              <p style="font-size:15px;color:#333;">
                We are pleased to provide the confirmed driver and vehicle details for Group Number: 
                <b style="color: #174a7f;">${groupName}</b>
              </p>
              <p>Please find the details below:</p>

              <h3 style="color:#174a7f;margin-top:20px;margin-bottom: 10px;">Transport Details:</h3>
              <div style="width: 100%; overflow: auto;">
                ${transportTable}
              </div>

              <h3 style="color:#174a7f;margin-bottom: 10px;">Driver Details:</h3>
              <div style="width: 100%; overflow: auto;">
                  ${driverTable}
              </div>

              <div>
                <p style="line-height: 1.4;">
                    For any immediate assistance related to transportation and visa, please do not hesitate to contact
                    us. Our 24/7 operations team is also available at 
                    <a href="tel:+919826953206" style="text-decoration: none;color: #174a7f;font-weight: 600;">+919826953206</a> should you require any further
                    support.
                </p>
                <p style="line-height: 1.4;">
                    We are honored to be of service and pray that your group's Umrah is accepted and spiritually fulfilling.
                </p>
                <p>Jazakum Allahu Khairan,</p>
              </div>

              <div>
                  <p style="margin-bottom: 0;">Thanks & Regards</p>
                  <p style="margin-top: 5px;margin-bottom: 0;">Team PC</p>
              </div>


            <p style="font-size:14px;color:#e4e4e4;text-align:center;margin-top:15px;background:#174a7f;padding: 10px 0;margin-bottom: 0;">
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

// const update = async function (req, res) {
//   try {
//     const { driverDetails } = req.body;

//     if (!driverDetails || !Array.isArray(driverDetails)) {
//       return ReE(res, { message: "driverDetails array is required" }, 400);
//     }

//     for (const item of driverDetails) {
//       // 1️⃣ Existing record lo
//       const existing = await Driver.findOne({
//         where: {
//           id: item.id,
//         },
//       });


//       if (existing) {
//         // 2️⃣ Conditional update (agar naya value aaya hai to lo, warna purana rakho)
//         const updatedData = {
//           driver_name: item.driver_name ?? existing.driver_name,
//           driver_mobile: item.driver_mobile ?? existing.driver_mobile,
//           bus_no: item.bus_no ?? existing.bus_no,
//           status: item.status ?? existing.status,

//           d_date: item.d_date ?? existing.d_date,
//           location: item.location ?? existing.location,
//           to_location: item.to_location ?? existing.to_location,
//           time: item.time ?? existing.time,
//           remarks: item.remarks ?? existing.remarks,
//         };

//         // 3️⃣ Record update karo
//         await existing.update(updatedData);
//       }
//     }

//     return ReS(res, { message: "Driver details updated successfully." }, 200);

//   } catch (error) {
//     console.error("Error updating driver details:", error);
//     return ReE(res, { message: "Something went wrong", err: error.message }, 500);
//   }
// };

const update = async function (req, res) {
  try {
    // const { driverDetails } = req.body;
    //  const files = req.files; // for pdf/image files

    // if (!driverDetails || !Array.isArray(driverDetails)) {
    //   return ReE(res, { message: "driverDetails array is required" }, 400);
    // }

    // const updatedDrivers = [];
    // const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/drivers`;

    // // Step 1️⃣ Update records
    // for (const item of driverDetails) {
    //   const existing = await Driver.findOne({ where: { id: item.id } });
    //   if (!existing) continue;
    //   let uploadedDriverPdf = existing.upload_pdf; // keep previous pdf if no new file is uploaded

    //   // ----------------------- FILE UPLOAD LOGIC -----------------------
    //   // item.upload_pdf => field name sent from frontend (e.g., "driver_pdf_1")
    //   if (files && files[item.upload_pdf]) {
    //     const pdfFile = files[item.upload_pdf];

    //     const pdfName = Date.now() + "-" + pdfFile.name;
    //     uploadedDriverPdf = "drivers/" + pdfName;

    //     const uploaded = await helper.fileUpload(pdfName, pdfFile, baseFileUploadPath);

    //     if (!uploaded) {
    //       return ReE(res, { message: "PDF upload failed" }, 200);
    //     }
    //   }
    //   // ----------------------------------------------------------------
    //   if (existing) {
    //     const updatedData = {
    //       driver_name: item.driver_name ?? existing.driver_name,
    //       driver_mobile: item.driver_mobile ?? existing.driver_mobile,
    //       bus_no: item.bus_no ?? existing.bus_no,
    //       status: item.status ?? existing.status,
    //       d_date: item.d_date ?? existing.d_date,
    //       location: item.location ?? existing.location,
    //       to_location: item.to_location ?? existing.to_location,
    //       time: item.time ?? existing.time,
    //       remarks: item.remarks ?? existing.remarks,
    //        upload_pdf: uploadedDriverPdf, // updated or old
    //     };
    //     const updated = await existing.update(updatedData);
    //     updatedDrivers.push(updated);
    //   }
    // }








    const body = req.body;
    const files = req.files; // express-fileupload files

    let driverDetailsArray = [];

    // -------------------- Parse driverDetails JSON --------------------
    if (typeof body.driverDetails === "string") {
      try {
        driverDetailsArray = JSON.parse(body.driverDetails);
      } catch (err) {
        return res.status(400).json({ message: "Invalid driverDetails JSON" });
      }
    } else {
      driverDetailsArray = body.driverDetails;
    }

    if (!driverDetailsArray || !Array.isArray(driverDetailsArray)) {
      return res.status(400).json({ message: "driverDetails array is required" });
    }

    const updatedDrivers = [];
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/drivers`;

    // ================= LOOP THROUGH EACH DRIVER =================
    for (const item of driverDetailsArray) {
      const existing = await Driver.findOne({ where: { id: item.id } });
      if (!existing) continue;

      let uploadedDriverPdf = existing.upload_pdf;  // keep old PDF if not updated

      // -------------------- FILE UPLOAD LOGIC --------------------
      // item.upload_pdf => frontend field name like: "file1", "file2", "driver_pdf_3"
      if (files && item.upload_pdf) {
        const pdfFile = files[item.upload_pdf]; // dynamic file

        if (pdfFile) {
          const pdfName = Date.now() + "-" + pdfFile.name;
          uploadedDriverPdf = "drivers/" + pdfName;

          const uploaded = await helper.fileUpload(
            pdfName,
            pdfFile,
            baseFileUploadPath
          );

          if (!uploaded) {
            return res.status(500).json({ message: "PDF upload failed" });
          }
        }
      }

      // -------------------- UPDATE RECORD --------------------
      const updatedData = {
        email: item.email ?? existing.email,
        group_name_number: item.group_name_number ?? existing.group_name_number,
        transport_id: item.transport_id ?? existing.transport_id,

        driver_name: item.driver_name ?? existing.driver_name,
        driver_mobile: item.driver_mobile ?? existing.driver_mobile,
        bus_no: item.bus_no ?? existing.bus_no,
        status: item.status ?? existing.status,

        location: item.location ?? existing.location,
        to_location: item.to_location ?? existing.to_location,
        time: item.time ?? existing.time,
        remarks: item.remarks ?? existing.remarks,

        upload_pdf: uploadedDriverPdf, // updated OR old
      };

      const updatedRecord = await existing.update(updatedData);
      updatedDrivers.push(updatedRecord);
    }

    if (updatedDrivers.length === 0) {
      return ReE(res, { message: "No matching driver records found." }, 404);
    }

    // Step 2️⃣ Email preparation (similar to create)
    const email = updatedDrivers[0]?.email || "N/A";
    const groupName = updatedDrivers[0]?.group_name_number || "N/A";

    const transportIds = updatedDrivers.map((d) => d.transport_id);
    const transportDetails = await AssignPackageTransportDetails.findAll({
      where: { id: transportIds },
    });
    const B2bUserEmail = await B2bUser.findAll({
      where: { email: email },
    });
    const companyName = B2bUserEmail[0]?.company_name || "Valued Customer";

    // Step 3️⃣ Helper function for date format
    function formatDate(date) {
      if (!date) return "-";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
      const month = monthNames[d.getMonth()];
      const year = d.getFullYear();
      return `${day} ${month} ${year}`;
    }

    // Step 4️⃣ Create driver table
    const driverTable = `
      <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;text-align: left;">
        <thead>
          <tr style="background:#174a7f;color:#fff;">
            <th>Driver Name</th>
            <th>Mobile</th>
            <th>Bus No</th>
          </tr>
        </thead>
        <tbody>
          ${updatedDrivers
        .map(
          (d) => `
              <tr>
                <td>${d.driver_name || "-"}</td>
                <td>
                  ${d.driver_mobile ? `<a href="tel:${d.driver_mobile}" style="color:#174a7f;text-decoration:none;font-weight:600;">${d.driver_mobile}</a>` : "-"
            }
                </td>
                <td>${d.bus_no || "-"}</td>
              </tr>
              <tr>
                <td colspan="4">
                  <b>Remarks</b>:
                  <span>${d.remarks || "-"}</span>
                </td>
              </tr>
            `
        )
        .join("")}
        </tbody>
      </table>
    `;

    // Step 5️⃣ Create transport table
    const transportTable = `
      <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;text-align: left;">
        <thead>
          <tr style="background:#174a7f;color:#fff;">
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          ${transportDetails
        .map(
          (t) => `
              <tr>
                <td>${t.assign_from || "-"}</td>
                <td>${t.assign_to || "-"}</td>
                <td>${formatDate(t.assign_date) || "-"}</td>
                <td>${t.assign_time || "-"}</td>
              </tr>
              <tr>
                <td colspan="5">
                  <b>Remarks</b>:
                  <span>${t.notes || "-"}</span>
                </td>
              </tr>
            `
        )
        .join("")}
        </tbody>
      </table>
    `;

    // Step 6️⃣ Send Email (same design as create)
    await transporter.sendMail({
      from: "pctravelsweb@gmail.com",
      to: `${email}`,
      subject: `PC Travels - Updated Driver Details For Group No. - (${groupName})`,
      html: `
        <div style="font-family:Arial,sans-serif;background: #f1f1f1;padding:20px;">
          <div
            style="max-width:700px;margin:auto;background:#fff;padding:15px;border-radius:10px;border: solid 2px #174a7f;position: relative;">
            <div style="background:#fff;text-align:center;padding:15px; border-bottom: solid #174a7f;padding-top: 0;">
                <img src="https://pctravelsonline.com/assets/images/PClogoEmail.jpg" width="150"
                    style="max-width:100%;height:auto;" alt="PC Travels Logo" />
            </div>

            <div>
                <p style="margin: 1rem 0 0 0;">Dear,</p>
                <h3 style="font-weight: bold;color: #174a7f;margin-top: 10px;">${companyName}</h3>
                <p style="margin-top: 10px;">Assalamu Alaikum Warahmatullahi Wabarakatuh.</p>
                <p>We hope you are doing well.</p>
            </div>

            <p style="font-size:15px;color:#333;">
              This is to inform you that there has been an update in the driver or vehicle assignment for
              <b style="color: #174a7f;">Group No. ${groupName}</b>.
              Please find below the latest confirmed details for your reference.
            </p>

            <h3 style="color:#174a7f;margin-top:20px;margin-bottom: 10px;">Updated Transport Details:</h3>
            <div style="width: 100%; overflow: auto;">
              ${transportTable}
            </div>

            <h3 style="color:#174a7f;margin-bottom: 10px;">Updated Driver Details:</h3>
            <div style="width: 100%; overflow: auto;">
              ${driverTable}
            </div>

            <div>
              <p style="line-height: 1.4;">
                Should you require any clarification or immediate assistance, please do not hesitate to contact our
                24/7 Operations Team at
                <a href="tel:+919826953206" style="text-decoration: none;color: #174a7f;font-weight: 600;">
                  +919826953206
                </a>.
              </p>
              <p style="line-height: 1.4;">
                We sincerely apologize for any inconvenience caused and appreciate your understanding and cooperation.
              </p>
              <p>Jazakum Allahu Khairan,</p>
            </div>

            <div>
              <p style="margin-bottom: 0;">Thanks & Regards</p>
              <p style="margin-top: 5px;margin-bottom: 0;">Team PC</p>
            </div>

            <p
              style="font-size: 14px; color: #909090; text-align: center; margin-top: 15px; background: #f1f1f1; padding: 8px 0; margin-bottom: 0; border-radius: 0px 0px 10px 10px;">
              © PC Travels. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    return ReS(res, { message: "Driver(s) updated and email sent successfully." }, 200);
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
