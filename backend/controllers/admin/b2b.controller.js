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
          <div style="font-family:Arial,sans-serif;background:#ededed;padding:20px;margin:0;">
        <div
            style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

            <!-- Header -->
            <div style="background:#fff;text-align:center;padding:20px;border-bottom: solid 3px #174a7f;">
                <img src="https://pctravelsonline.com/assets/images/PClogoEmail.jpg" width="150"
                    style="max-width:100%;height:auto;" alt="PC Travels" />
            </div>

            <!-- Body -->
            <div style="padding:20px;">
                <h2 style="color:#174a7f;margin-top:0;text-align: center;">Welcome to PC Travels!</h2>

                <p style="font-size:15px;color:#333;margin-bottom: 0;">Dear,</p>
                <p style="margin-bottom: 0; margin-top: 5px;"><b>${existData.person_name || "Valued Partner"}</b></p>

                <p style="font-size:15px;color:#444;line-height:1.6;">
                    We’re pleased to inform you that your <b>PC Travels account</b> has been successfully
                    <b style="color:#039a03;">activated</b>.
                </p>

                <p style="font-size:15px;color:#444;line-height:1.6;">
                    You can now log in to your account using the credentials below:
                </p>

                <div style="background:#f0f4fa;padding:14px;border-radius:6px;margin:16px 0;">
                    <p style="margin:6px 0;border-bottom: solid 2px #ddd;padding-bottom: 10px;">
                        <b>Email:</b>
                        <span style="color:#174a7f;">${existData.email}</span>
                    </p>
                    <p style="margin:6px 0;padding-top: 3px;">
                        <b>Password:</b>
                        <span style="color:#174a7f;">${combinedWord}</span>
                    </p>
                </div>

                <div style="text-align:center;margin:30px 0;">
                    <a href="https://pctravelsonline.com/b2b/login" target="_blank"
                        style="display:inline-block;background:#174a7f;color:#fff;text-decoration:none;padding:16px 28px;border-radius:6px;font-weight:bold;font-size:15px;">
                        Login to Your Account
                    </a>
                </div>

                <p style="font-size:13px;color:#666;text-align:center;line-height:1.6;">
                    For your security, please make sure to change your password after your first login.
                </p>

                <p style="line-height: 1.6;font-size:13px;color:#666;text-align:center;margin-top:10px;">
                    For any assistance or if you experience login-related issues, please feel free to contact our
                    technical support team at
                    <a href="tel:+919826953206" style="text-decoration: none; color: #174a7f; font-weight: 600;">
                        +91 98269 53206
                    </a>.
                </p>

                <p style="font-size:13px;color:#666;text-align:center;margin-top:10px;">
                    We’re delighted to have you on board and look forward to a successful partnership ahead.
                </p>
            </div>

            <!-- Footer -->
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
        subject: "PC Travels - Important Notice: Your PC Travels Account Is On Hold",
        // text: `Your OTP is ${OtpValue}`,
        html: `
          <div style="font-family:Arial,sans-serif;background:#ededed;padding:20px;margin:0;">
            <div
              style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

            <!-- Header -->
            <div style="background:#fff;text-align:center;padding:20px;border-bottom: solid 3px #d97706;">
                <img src="https://pctravelsonline.com/assets/images/PClogoEmail.jpg" width="150"
                    style="max-width:100%;height:auto;" alt="PC Travels" />
            </div>

            <!-- Body -->
            <div style="padding:20px;">
                <h2 style="color:#d50606;margin-top:0;text-align:center;">Account On Hold</h2>

                <p style="font-size:15px;color:#333;margin-bottom:0;">Dear,</p>
                <p style="margin-bottom:0;margin-top:5px;"><b>${existData.person_name || "Valued Partner"}</b></p>

                <p style="font-size:15px;color:#444;line-height:1.6;">
                    We regret to inform you that your <b>PC Travels account</b> has been temporarily placed
                    <b style="color:#d97706;">on hold</b>.
                    You will not be able to log in until the issue has been resolved.
                </p>

                <div
                    style="background:#fff6e0;padding:14px;border-radius:6px;margin:16px 0;border-left:4px solid #d97706;">
                    <p style="margin:6px 0;">
                        <b>Reason:</b>
                        <span style="color:#444;">${body?.issue || "Account temporarily suspended by admin."}</span>
                    </p>
                </div>

                <p style="font-size:14px;color:#444;line-height:1.6;text-align:center;margin-top:20px;">
                    Our support team is reviewing your case and will contact you shortly with further details.
                </p>

                <p style="line-height:1.6;font-size:14px;color:#666;text-align:center;margin-top:20px;">
                    For any urgent assistance or clarification, please contact our 24/7 support team at
                    <a href="tel:+919826953206" style="text-decoration:none;color:#174a7f;font-weight:600;text-wrap: nowrap;">
                        +91 98269 53206
                    </a>.
                </p>

                <p style="font-size:13px;color:#666;text-align:center;margin-top:10px;">
                    We appreciate your patience and understanding in this matter.
                </p>
            </div>

            <!-- Footer -->
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
        subject: "PC Travels - Your Account Approval Is Pending",
        // text: `Your OTP is ${OtpValue}`,
        html: `
          <div style="font-family:Arial,sans-serif;background:#ededed;padding:20px;margin:0;">
        <div
            style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

            <!-- Header -->
            <div style="background:#fff;text-align:center;padding:20px;border-bottom: solid 3px #174a7f;">
                <img src="https://pctravelsonline.com/assets/images/PClogoEmail.jpg" width="150"
                    style="max-width:100%;height:auto;" alt="PC Travels" />
            </div>

            <!-- Body -->
            <div style="padding:20px;">
                <h2 style="color:#174a7f;margin-top:0;text-align:center;">Account Approval Pending</h2>

                <p style="font-size:15px;color:#333;margin-bottom:0;">Dear,</p>
                <p style="margin-bottom:0;margin-top:5px;"><b>${existData.person_name || "Valued Partner"}</b></p>

                <p style="font-size:15px;color:#444;line-height:1.6;">
                    Thank you for registering with <b>PC Travels</b>.
                    Your account is currently <b style="color:#d97706;">pending approval</b> and under review by our
                    verification team.
                </p>

                <div
                    style="background:#fff6e0;padding:14px;border-radius:6px;margin:16px 0;border-left:4px solid #d97706;">
                    <p style="margin:6px 0;">
                        <b>Status:</b>
                        <span style="color:#444;">${body?.issue || "Awaiting admin approval."}</span>
                    </p>
                </div>

                <p style="font-size:14px;color:#444;line-height:1.6;text-align:center;margin-top:20px;">
                    Once your account is approved, you will receive a confirmation email with your login credentials.
                </p>

                <p style="line-height:1.6;font-size:14px;color:#666;text-align:center;margin-top:20px;">
                    For any urgent assistance or clarification, please contact our 24/7 support team at
                    <a href="tel:+919826953206"
                        style="text-decoration:none;color:#174a7f;font-weight:600;text-wrap: nowrap;">
                        +91 98269 53206
                    </a>.
                </p>

                <p style="font-size:13px;color:#666;text-align:center;margin-top:10px;">
                    We appreciate your patience and look forward to welcoming you soon.
                </p>
            </div>

            <!-- Footer -->
            <div style="background:#f6f9fc;padding:14px;text-align:center;font-size:12px;color:#888;">
                © ${new Date().getFullYear()} PC Travels. All rights reserved.
            </div>
        </div>
    </div>
        `
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
