const express = require("express");
const b2bRouter = express.Router();

const passport = require("passport");
require("@middleware/passport")(passport);

const errorHandler = require('@middleware/errorHandler').errorHandler;
const adminMidd = require('@middleware/admin.middleware');
const AuthController = require("@controllers/b2b/auth.controller");
const B2bDashboardController = require("@controllers/b2b/b2bDashboard.controller");


// ========== Auth Routes ==========
b2bRouter.post("/login", AuthController.login);
b2bRouter.post("/register", AuthController.Register);
b2bRouter.post("/email-verify", AuthController.VerifyEmail);
b2bRouter.post("/mobile-verify", AuthController.VerifyMobile);
b2bRouter.post("/otp-verification", AuthController.otpVerification);
b2bRouter.post("/verify-otp", AuthController.verifyOtp);
b2bRouter.post("/change-password",  AuthController.changePassword);
b2bRouter.post("/update-password", passport.authenticate("jwt", { session: false }), adminMidd.b2bUser, AuthController.UpdatePassword);

// b2bRouter.get("/download-dump", AuthController.downloadSql);

// ========== B2bDashboardController Routes ==========
// b2bRouter.post("/dashboard/fetch", passport.authenticate("jwt", { session: false }), adminMidd.b2bUser, B2bDashboardController.fetch);  
b2bRouter.post("/dashboard/fetch",  B2bDashboardController.fetch);  



// ========== Error Handler ==========
b2bRouter.use(errorHandler);

module.exports = b2bRouter;
