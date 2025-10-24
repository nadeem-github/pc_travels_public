const { B2bUser } = require("@models");
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
    const data = await B2bUser.findAll({
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


const update = async function (req, res) {
  try {
    let body = req.body;
    const existData = await B2bUser.findOne({
      where: { id: body.id }
    });
    if (existData && body.status === "complete") {
      // First 4 letters of person_name
      const firstFour = existData.person_name
        ? existData.person_name.substring(0, 4)
        : "";

      // Last 4 digits of whatsapp_number
      const lastFour = existData.whatsapp_number
        ? existData.whatsapp_number.slice(-4)
        : "";
      const combinedWord = firstFour + lastFour;
      existData.status = body.status;
      existData.b2b_unique_id = body.b2b_unique_id;
      existData.password = combinedWord;
      await existData.save();
      await transporter.sendMail({
        from: 'pctravelsweb@gmail.com',
        to: existData.email,
        subject: "Welcome to PC Travels - Your Account is Activated",
        // text: `Your OTP is ${OtpValue}`,
        html: `
  <div style="font-family:Arial,sans-serif;background:#b7ffac;padding:20px;margin:0;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    <div style="background:#174a7f;text-align:center;padding:20px;">
      <img src="https://pctravelsonline.com/assets/images/logo.png" width="150" style="max-width:100%;height:auto;" alt="PC Travels" />
    </div>
    <div style="padding:24px;">
      <h2 style="color:#174a7f;margin-top:0;text-align: center;">Welcome to PC Travels!</h2>
      <p style="font-size:15px;color:#333;">Dear <b>${existData.person_name || "User"}</b>,</p>
      <p style="font-size:15px;color:#444;line-height:1.6;">
        Your account has been successfully <b style="color: #039a03">activated</b>. Use the credentials below to log in:
      </p>

      <div style="background:#f0f4fa;padding:14px;border-radius:6px;margin:16px 0;">
        <p style="margin:4px 0;"><b>Email:</b> <span style="color:#174a7f;">${existData.email}</span></p>
        <p style="margin:4px 0;"><b>Password:</b> <span style="color:#174a7f;">${combinedWord}</span></p>
      </div>

      <div style="text-align:center;margin:30px 0;">
        <a href="https://pctravelsonline.com/b2b/login" target="_blank"
           style="display:inline-block;background:#174a7f;color:#fff;text-decoration:none;padding:12px 26px;border-radius:6px;font-weight:bold;">
          Login Now
        </a>
      </div>

      <p style="font-size:13px;color:#666;text-align:center">For security, please change your password after first login.</p>
    </div>
    <div style="background:#f6f9fc;padding:14px;text-align:center;font-size:12px;color:#888;">
      © ${new Date().getFullYear()} PC Travels. All rights reserved.
    </div>
  </div>
</div>
  `
      });
      return ReS(res, { message: "B2b user has been updated successfully." }, 200);
    }
    if (existData && body.status === "hold") {
      existData.status = body.status;
      await existData.save();
      await transporter.sendMail({
        from: 'pctravelsweb@gmail.com',
        to: existData.email,
        subject: "Welcome to PC Travels - Your Account is Activated",
        // text: `Your OTP is ${OtpValue}`,
        html: `
  <div style="font-family:Arial,sans-serif;background:#c0dcf8;padding:20px;margin:0;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    <div style="background:#174a7f;text-align:center;padding:20px;">
      <img src="https://pctravelsonline.com/assets/images/logo.png" width="150" style="max-width:100%;height:auto;" alt="PC Travels" />
    </div>
    <div style="padding:24px;">
      <h2 style="color:#d50606;text-align: center;font-size: 1.5rem; font-weight: bold;margin-top:0;">Account On Hold</h2>
      <p style="font-size:15px;color:#333;">Dear <b>${existData.person_name || "User"}</b>,</p>
      <p style="font-size:15px;color:#444;line-height:1.6;">
        Your account has been temporarily placed <b style="color:#d97706;">on hold</b>.  
        You will not be able to log in until the issue is resolved.
      </p>

      <div style="background:#fff6e0;border-left:4px solid #d97706;padding:14px 16px;border-radius:6px;margin:16px 0;">
        <strong style="color:#d97706;">Reason:</strong>
        <span style="color:#444;">${body?.issue || "Account temporarily suspended by admin."}</span>
      </div>

      <p style="font-size:14px;color:#555;text-align:center">Our team will review and contact you soon.</p>
    </div>
    <div style="background:#f6f9fc;padding:14px;text-align:center;font-size:12px;color:#888;">
      © ${new Date().getFullYear()} PC Travels. All rights reserved.
    </div>
  </div>
</div>`
      });
      return ReS(res, { message: "B2b user has been updated successfully." }, 200);
    }
    if (existData && body.status === "pending") {
      const data = await B2bUser.destroy({
        where: { id: body.id }
      })
      await transporter.sendMail({
        from: 'pctravelsweb@gmail.com',
        to: existData.email,
        subject: "Welcome to PC Travels - Your Account is Activated",
        // text: `Your OTP is ${OtpValue}`,
        html: `
  <div style="font-family:Arial,sans-serif;background:#c0dcf8;padding:20px;margin:0;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    <div style="background:#174a7f;text-align:center;padding:20px;">
      <img src="https://pctravelsonline.com/assets/images/logo.png" width="150" style="max-width:100%;height:auto;" alt="PC Travels" />
    </div>
    <div style="padding:24px;">
      <h2 style="color:#174a7f;margin-top:0;">Account Cancelled</h2>
      <p style="font-size:15px;color:#333;">Dear <b>${existData.person_name || "User"}</b>,</p>
      <p style="font-size:15px;color:#444;line-height:1.6;">
        Your account has been <b style="color:#dc2626;">permanently cancelled</b>.  
        You will no longer be able to log in or use our services with this account.
      </p>

      <div style="background:#ffecec;border-left:4px solid #dc2626;padding:14px 16px;border-radius:6px;margin:16px 0;">
        <strong style="color:#dc2626;">Reason:</strong>
        <span style="color:#444;">${body?.issue || "Account cancelled by admin."}</span>
      </div>

      <p style="font-size:14px;color:#555;text-align:center">If this was unexpected, please contact our support team.</p>
    </div>
    <div style="background:#f6f9fc;padding:14px;text-align:center;font-size:12px;color:#888;">
      © ${new Date().getFullYear()} PC Travels. All rights reserved.
    </div>
  </div>
</div>`
      });
      return ReS(res, { message: "B2b user has been deleted successfully." }, 200);
    }
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};

const deleted = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await B2bUser.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "B2b user has been deleted successfully." }, 200);
    }).catch(function (err) {
      return ReE(res, { message: "Somthing Went Wrong", err: err.errors }, 200);
    });

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
}

module.exports = {
  fetch,
  update,
  deleted
};
