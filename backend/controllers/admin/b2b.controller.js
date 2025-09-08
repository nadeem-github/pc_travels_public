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
      existData.password = combinedWord;
      await existData.save();
      await transporter.sendMail({
        from: 'pctravelsweb@gmail.com',
        to: existData.email,
        subject: "Welcome to PC Travels - Your Account is Activated",
        // text: `Your OTP is ${OtpValue}`,
        html: `
  <div style="font-family: Arial, sans-serif; background:#f9fbff; padding:20px; border-radius:8px; border:1px solid #e0e7ff; max-width:500px; margin:auto;">
    <div style="color:#0a7cff; text-align:center; margin-bottom:20px; text-align:center">
        <img src="https://pctravelsonline.com/assets/images/logo.png" width="150" alt="PC Travels Logo" />
    </div>
    
    <p style="font-size:16px; color:#333; margin:0 0 12px;">
      Hello <b>${existData.person_name || "User"}</b>,
    </p>
    
    <p style="font-size:15px; color:#444; margin:0 0 16px; line-height:1.5;">
      Your account has been activated. Please use the credentials below to log in:
    </p>

    <!-- Username -->
    <div style="margin:12px 0;">
      <strong style="display:inline-block; width:100px;">Username:</strong>
      <span style="background:#eef4ff; padding:6px 10px; border-radius:4px; font-weight:600; color:#0a7cff;">
        ${existData.email}
      </span>
    </div>

    <!-- Password -->
    <div style="margin:12px 0;">
      <strong style="display:inline-block; width:100px;">Password:</strong>
      <span style="background:#eef4ff; padding:6px 10px; border-radius:4px; font-weight:600; color:#0a7cff;">
        ${combinedWord}
      </span>
    </div>

    <!-- Login Link -->
    <div style="text-align:center; margin:24px 0;">
      <a href="https://pctravelsonline.com/b2b/login" target="_blank" 
         style="display:inline-block; background:#0a7cff; color:#fff; text-decoration:none; padding:12px 22px; border-radius:6px; font-weight:600;">
        Login Now
      </a>
    </div>
    
    <p style="font-size:14px; color:#555; margin:0;">
      ✅ For security, please change your password after first login.
    </p>
    
    <hr style="margin:20px 0; border:none; border-top:1px solid #eee;">
    
    <p style="font-size:12px; color:#888; text-align:center; margin:0;">
      © ${new Date().getFullYear()} PC Travels. All rights reserved.
    </p>
  </div>`
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
  <div style="font-family: Arial, sans-serif; background:#fff8f8; padding:20px; border-radius:8px; border:1px solid #f5c2c7; max-width:500px; margin:auto;">
    <div style="color:#0a7cff; text-align:center; margin-bottom:20px; text-align:center">
        <img src="https://pctravelsonline.com/assets/images/logo.png" width="150" alt="PC Travels Logo" />
    </div>
    
    <p style="font-size:16px; color:#333; margin:0 0 12px;">
      Hello <b>${existData.person_name || "User"}</b>,
    </p>
    
    <p style="font-size:15px; color:#444; margin:0 0 16px; line-height:1.5;">
      Your account is currently <b style="color:#dc3545;">on hold</b>.  
      You will not be able to log in until the issue is resolved.
    </p>

    <!-- Account Status -->
    <div style="text-align:center; margin:20px 0;">
      <span style="display:inline-block; background:#dc3545; color:#fff; padding:12px 24px; font-size:18px; font-weight:bold; border-radius:6px;">
        🚫 Account on Hold
      </span>
    </div>

    <!-- Show Issue -->
    <div style="margin:16px 0; padding:14px; background:#fff0f0; border-left:4px solid #dc3545; border-radius:6px;">
      <strong style="color:#dc3545;">Reason:</strong> 
      <span style="color:#444;">${body?.issue || "Your account has been temporarily suspended by admin."}</span>
    </div>
    
    <p style="font-size:14px; color:#555; margin:0;">
      ⚠️ Please wait until this issue is resolved by our team.
    </p>
    
    <hr style="margin:20px 0; border:none; border-top:1px solid #eee;">
    
    <p style="font-size:12px; color:#888; text-align:center; margin:0;">
      © ${new Date().getFullYear()} PC Travels. All rights reserved.
    </p>
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
  <div style="font-family: Arial, sans-serif; background:#fff8f8; padding:20px; border-radius:8px; border:1px solid #f5c2c7; max-width:500px; margin:auto;">
    <div style="color:#0a7cff; text-align:center; margin-bottom:20px; text-align:center">
        <img src="https://pctravelsonline.com/assets/images/logo.png" width="150" alt="PC Travels Logo" />
    </div>
    
    <p style="font-size:16px; color:#333; margin:0 0 12px;">
      Hello <b>${existData.person_name || "User"}</b>,
    </p>
    
    <p style="font-size:15px; color:#444; margin:0 0 16px; line-height:1.5;">
      We regret to inform you that your account has been <b style="color:#dc3545;">permanently cancelled</b>.  
      You will no longer be able to log in or use our services with this account.
    </p>

    <!-- Account Status -->
    <div style="text-align:center; margin:20px 0;">
      <span style="display:inline-block; background:#dc3545; color:#fff; padding:12px 24px; font-size:18px; font-weight:bold; border-radius:6px;">
        ❌ Account Cancelled
      </span>
    </div>

    <!-- Show Issue -->
    <div style="margin:16px 0; padding:14px; background:#fff0f0; border-left:4px solid #dc3545; border-radius:6px;">
      <strong style="color:#dc3545;">Reason:</strong> 
      <span style="color:#444;">${body?.issue || "Your account has been cancelled by admin."}</span>
    </div>
    
    <p style="font-size:14px; color:#555; margin:0;">
      ⚠️ If this was unexpected, please contact our team for further clarification.
    </p>
    
    <hr style="margin:20px 0; border:none; border-top:1px solid #eee;">
    
    <p style="font-size:12px; color:#888; text-align:center; margin:0;">
      © ${new Date().getFullYear()} PC Travels. All rights reserved.
    </p>
  </div>`
      });
      return ReS(res, { message: "B2b user has been deleted successfully." }, 200);
    }
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};

module.exports = {
  fetch,
  update
};
