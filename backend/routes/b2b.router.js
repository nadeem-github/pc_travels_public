const express = require("express");
const b2bRouter = express.Router();

const passport = require("passport");
require("@middleware/passport")(passport);

const errorHandler = require('@middleware/errorHandler').errorHandler;
const adminMidd = require('@middleware/admin.middleware');
const AuthController = require("@controllers/b2b/auth.controller");


// ========== Auth Routes ==========
b2bRouter.post("/login", AuthController.login);
b2bRouter.post("/register", AuthController.Register);
b2bRouter.post("/email-verify", AuthController.VerifyEmail);
b2bRouter.post("/mobile-verify", AuthController.VerifyMobile);
b2bRouter.post("/update-password", passport.authenticate("jwt", { session: false }), adminMidd.b2bUser, AuthController.UpdatePassword);

// b2bRouter.get("/download-dump", AuthController.downloadSql);


// ========== Error Handler ==========
b2bRouter.use(errorHandler);

module.exports = b2bRouter;
