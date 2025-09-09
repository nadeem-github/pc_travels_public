const { B2bUser } = require("@models");
const bcrypt_p = require("bcrypt-promise");
const jwt = require("jsonwebtoken");
const CONFIG = require("@config/config.json");
const appService = require("@services/app.service");
const { ReE, ReS, to } = require("@services/util.service");
const nodemailer = require("nodemailer");
const { body } = require("express-validator");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pctravelsweb@gmail.com",   // <-- आपका Gmail
    pass: "pdkd jfnt vupn opgq"  // <-- 16 digit App Password
  }
});


// ===================== LOGIN =====================
const login = async (req, res) => {
  const { password, email } = req.body;
  const [err, user] = await to(B2bUser.findOne({
    attributes: ['id', 'email', 'password'],
    where: { email, status: "complete" }
  }));
  if (err || !user) return ReE(res, {
    message: "Please enter the registered email address. The user is not registered with us."
  }, 400);

  const isMatch = await bcrypt_p.compare(password, user.password);
  if (!isMatch) return ReE(res, {
    message: "The password you entered is incorrect. Please try again."
  }, 400);

  const token = jwt.sign(
    { user_id: user.id, username: user.email, role: 'b2b' },
    CONFIG.jwt_encryption,
    { expiresIn: '365d' }
  );

  return ReS(res, { user, token });
};


// ===================== REGISTER =====================
const Register = async (req, res) => {
  const body = req.body;
  // const files = req.files;
  // const OtpValue = Math.floor(100000 + Math.random() * 900000);
  const [err, existingUser] = await to(B2bUser.findOne({ where: { email: body.email } }));
  if (err) return ReE(res, { message: "DB Error", err }, 500);
  const [errMobile, existingMobileUser] = await to(B2bUser.findOne({ where: { whatsapp_number: body.whatsapp_number } }));
  if (errMobile) return ReE(res, { message: "DB Error", errMobile }, 500);

  if (existingUser) {
    return ReE(res, { message: "B2bUser email already exists. Please login!" }, 400);
  }
  if (existingMobileUser) {
    return ReE(res, { message: "B2bUser number already exists. Please login!" }, 400);
  }

  const data = await B2bUser.create({
    company_name: body.company_name,
    // password: body.password,
    email: body.email,
    whatsapp_number: body.whatsapp_number,
    person_name: body.person_name,
    // whatsapp_number_verify: OtpValue,
    // email_verify: OtpValue,
  })
  // if (data) {
  //   await transporter.sendMail({
  //     from: 'pctravelsweb@gmail.com',
  //     to: body.email,
  //     subject: "Verify your Email - OTP",
  //     text: `Your OTP is ${OtpValue}`,
  //     html: `<p>Your OTP is <b>${OtpValue}</b>. please verify your email verification.</p>`
  //   });
  //   console.log("Email sent successfully",OtpValue);
  //   return ReS(res, { message: "B2b User created successfully." }, 200);
  // }

  // const [createErr, newUser] = await to(B2bUser.create({ username, password }));
  // if (createErr) return ReE(res, { message: "Failed to create user", err: createErr }, 500);

  return ReS(res, { user: data, message: "Your registration request has been submitted successfully to the admin for review." }, 200);
};
const UpdatePassword = async (req, res) => {
  let body = req.body;
  const existData = await B2bUser.findOne({
    where: { id: req.user.id }
  });
  if (existData) {
    existData.password = body.password;
    await existData.save();
    return ReS(res, { message: "B2b user has been updated successfully." }, 200);
  }
};



const VerifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  // ✅ Validation
  if (!email || !otp) {
    return ReE(res, { message: "Email and OTP are required!" }, 400);
  }

  // ✅ Find user
  const [err, user] = await to(B2bUser.findOne({ where: { email } }));
  if (err) return ReE(res, { message: "DB Error", err }, 500);

  if (!user) {
    return ReE(res, { message: "User not found!" }, 404);
  }

  // ✅ Check OTP
  if (user.email_verify != otp) {
    return ReE(res, { message: "Invalid OTP!" }, 400);
  }



  return ReS(res, { message: "Email verified successfully!" }, 200);
};

const VerifyMobile = async (req, res) => {
  const { whatsapp_number, otp } = req.body;

  // ✅ Validation
  if (!whatsapp_number || !otp) {
    return ReE(res, { message: "Whatsapp number and OTP are required!" }, 400);
  }

  // ✅ Find user
  const [err, user] = await to(B2bUser.findOne({ where: { whatsapp_number } }));
  if (err) return ReE(res, { message: "DB Error", err }, 500);

  if (!user) {
    return ReE(res, { message: "User not found!" }, 404);
  }

  // ✅ Check OTP
  if (user.whatsapp_number_verify != otp) {
    return ReE(res, { message: "Invalid OTP!" }, 400);
  }

  return ReS(res, { message: "Whatsapp number verified successfully!" }, 200);
};
const otpVerification = async function (req, res) {
  try {
    let body = req.body;

    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    const existData = await B2bUser.findOne({
      where: { email: body.email }
    });

    if (existData) {
      // Generate OTP
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min valid

      // Save OTP and expiry in DB
      existData.email_verify = otpValue; // add column in DB: otp
      await existData.save();

      // Send OTP via email
      await transporter.sendMail({
        from: 'pctravelsweb@gmail.com',
        to: existData.email,
        subject: "PC Travels - Your OTP Verification",
        html: `
              <div
                style="font-family: Arial, sans-serif; background:#f9fbff; padding:20px; border-radius:8px; border:1px solid #e0e7ff; max-width:500px; margin:auto;">
                <div style="color:#0a7cff; text-align:center; margin-bottom:20px; text-align:center">
                  <img src="https://pctravelsonline.com/assets/images/logo.png" width="150" alt="PC Travels Logo" />
                </div>
                <h2 style="color:#0a7cff; text-align:center;">Verify Your Account</h2>
                <p style="font-size:16px; color:#333;">Hello <b>${existData.person_name || "User"}</b>,</p>
                <p style="font-size:15px; color:#444;">
                  Your One-Time Password (OTP) is:
                </p>
                <div style="text-align:center; margin:20px 0;">
                  <span style="font-size:28px; font-weight:bold; letter-spacing:6px; color:#0a7cff;">${otpValue}</span>
                </div>
                <p style="font-size:14px; color:#555;">This OTP is valid for 24 hours. Please do not share it with anyone.</p>
              </div>`
      });

      return ReS(res, { message: "OTP has been sent to your email." }, 200);
    }

    return ReE(res, { message: "User not found ." }, 400);

  } catch (error) {
    console.log(error);
    return ReE(res, { message: "Something Went Wrong", err: error }, 500);
  }
};
const verifyOtp = async function (req, res) {
  try {
    const { email, otp } = req.body;

    const existData = await B2bUser.findOne({ where: { email } });
    if (!existData) {
      return ReE(res, { message: "Email not registered." }, 404);
    }

    if (existData.email_verify !== otp) {
      return ReE(res, { message: "Invalid OTP." }, 400);
    }
    return ReS(res, { message: "Email verified successfully." }, 200);

  } catch (error) {
    return ReE(res, { message: "Something went wrong", err: error }, 500);
  }
};
const changePassword = async (req, res) => {
  const { email,password } = req.body;
  const existData = await B2bUser.findOne({ where: { email } });
  if (existData) {
    existData.password = password;
    await existData.save();
    return ReS(res, { message: "B2b user password has been updated successfully." }, 200);
  }
};


module.exports = {
  login,
  Register,
  VerifyEmail,
  VerifyMobile,
  UpdatePassword,
  otpVerification,
  verifyOtp,
  changePassword
};
