const express = require("express");
const adminRouter = express.Router();

const passport = require("passport");
require("@middleware/passport")(passport);

const errorHandler = require('@middleware/errorHandler').errorHandler;
const adminMidd = require('@middleware/admin.middleware');
const AuthController = require("@controllers/admin/auth.controller");
const AdminController = require("@controllers/admin/admin.controller");
const HomeTopSliderController = require("@controllers/admin/homeTopSlider.controller");
const BlockHomeController = require("@controllers/admin/blockHome.controllerr");
const BlockAvailableController = require("@controllers/admin/blockAvailable.controller");
const AboutUsController = require("@controllers/admin/aboutUs.controller");
const ParallaxHomeController = require("@controllers/admin/parallaxHome.controllerr");
const OurPackageController = require("@controllers/admin/ourPackage.controller");
const TransportationController = require("@controllers/admin/transportation.controller");
const WorkVisaController = require("@controllers/admin/workVisa.controller");
const ContactUsController = require("@controllers/admin/contactUs.controller");
const HotelController = require("@root/controllers/admin/hotel.controller");
const AddYourAgentController = require("@controllers/admin/addYourAgent.controllerr");
const VisitorController = require("@controllers/admin/visitor.controllerr");
const DashboardController = require("@controllers/admin/dashboard.controllerr");
const PackageDetailsController = require("@controllers/admin/packageDetails.controller");
const VisaController = require("@controllers/admin/visa.controllerr");
const VisaTypeController = require("@controllers/admin/visaType.controller");
const VisaDocumentController = require("@controllers/admin/visaDocument.controller");
const BlockAvaileblePdfController = require("@controllers/admin/blockAvaileblePdf.controllerr");
const NotificationPopupController = require("@controllers/admin/notifationPopUp.controllerr");
const B2bController = require("@controllers/admin/b2b.controller");
const B2bMutamerListController = require("@controllers/admin/b2bMutamerList.controller");
const B2bDriverController = require("@controllers/b2b/b2bDriver.controller");
const B2bHotelController = require("@controllers/b2b/b2bHotel.controller");

// ========== Auth Routes ==========
adminRouter.post("/login", AuthController.login);
adminRouter.post("/register", AuthController.Register);
adminRouter.get("/download-dump", AuthController.downloadSql);


// ========== HomeTopSliderController Routes==========
adminRouter.post("/hometopslider/fetch", HomeTopSliderController.fetch);
adminRouter.post("/hometopslider/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, HomeTopSliderController.create);
adminRouter.post("/hometopslider/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, HomeTopSliderController.fetchSingle);
adminRouter.post("/hometopslider/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, HomeTopSliderController.update);
adminRouter.post("/hometopslider/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, HomeTopSliderController.deleted);

// ========== BlockHomeController Routes==========
adminRouter.post("/blockhome/fetch", BlockHomeController.fetch);
adminRouter.post("/blockhome/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockHomeController.create);
adminRouter.post("/blockhome/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockHomeController.fetchSingle);
adminRouter.post("/blockhome/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockHomeController.update);
adminRouter.post("/blockhome/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockHomeController.deleted);

// ========== BlockAvailableController Routes==========
adminRouter.post("/blockavailable/fetch", BlockAvailableController.fetch);
adminRouter.post("/blockavailable/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockAvailableController.create);
adminRouter.post("/blockavailable/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockAvailableController.fetchSingle);
adminRouter.post("/blockavailable/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockAvailableController.update);
adminRouter.post("/blockavailable/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockAvailableController.deleted);

// ========== AboutUsController Routes==========
adminRouter.post("/aboutus/fetch", AboutUsController.fetch);
adminRouter.post("/aboutus/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, AboutUsController.create);
adminRouter.post("/aboutus/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, AboutUsController.fetchSingle);
adminRouter.post("/aboutus/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, AboutUsController.update);
adminRouter.post("/aboutus/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, AboutUsController.deleted);

// ========== ParallaxHomeController Routes==========
adminRouter.post("/parallaxhome/fetch", ParallaxHomeController.fetch);
adminRouter.post("/parallaxhome/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, ParallaxHomeController.create);
adminRouter.post("/parallaxhome/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, ParallaxHomeController.fetchSingle);
adminRouter.post("/parallaxhome/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, ParallaxHomeController.update);
adminRouter.post("/parallaxhome/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, ParallaxHomeController.deleted);

// ========== OurPackageController Routes==========
adminRouter.post("/ourpackage/fetch", OurPackageController.fetch);
adminRouter.post("/ourpackage/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, OurPackageController.create);
adminRouter.post("/ourpackage/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, OurPackageController.fetchSingle);
adminRouter.post("/ourpackage/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, OurPackageController.update);
adminRouter.post("/ourpackage/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, OurPackageController.deleted);

// ========== TransportationController Routes==========
adminRouter.post("/transportation/fetch", TransportationController.fetch);
adminRouter.post("/transportation/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, TransportationController.create);
adminRouter.post("/transportation/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, TransportationController.fetchSingle);
adminRouter.post("/transportation/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, TransportationController.update);
adminRouter.post("/transportation/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, TransportationController.deleted);

// ========== WorkVisaController Routes==========
adminRouter.post("/workvisa/fetch", WorkVisaController.fetch);
adminRouter.post("/workvisa/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, WorkVisaController.create);
adminRouter.post("/workvisa/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, WorkVisaController.fetchSingle);
adminRouter.post("/workvisa/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, WorkVisaController.update);
adminRouter.post("/workvisa/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, WorkVisaController.deleted);

// ========== HotelController Routes==========
adminRouter.post("/hotel/fetch", HotelController.fetch);
adminRouter.post("/hotel/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, HotelController.create);
adminRouter.post("/hotel/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, HotelController.fetchSingle);
adminRouter.post("/hotel/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, HotelController.update);
adminRouter.post("/hotel/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, HotelController.deleted);   

// ========== AddYourAgentController Routes==========
adminRouter.post("/addyouragent/fetch", AddYourAgentController.fetch);
adminRouter.post("/addyouragent/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, AddYourAgentController.create);
adminRouter.post("/addyouragent/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, AddYourAgentController.fetchSingle); 
adminRouter.post("/addyouragent/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, AddYourAgentController.update);
adminRouter.post("/addyouragent/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, AddYourAgentController.deleted);

// ========== VisitorController Routes==========
adminRouter.post("/visitor/fetch", VisitorController.fetch);
adminRouter.get("/visitor/create", VisitorController.create);

// ========== DashboardController Routes==========
adminRouter.post("/dashboard/count", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, DashboardController.count);

// ========== ContactUsController Routes==========
adminRouter.post("/contact/fetch", ContactUsController.fetch);
adminRouter.post("/contact/create",  ContactUsController.create);

// ========== PackageDetailsController Routes==========
adminRouter.post("/packagedetails/fetch", PackageDetailsController.fetch);
adminRouter.post("/packagedetails/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, PackageDetailsController.create);
adminRouter.post("/packagedetails/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, PackageDetailsController.fetchSingle);
adminRouter.post("/packagedetails/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, PackageDetailsController.update);
adminRouter.post("/packagedetails/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, PackageDetailsController.deleted);    

// ========== VisaController Routes==========
adminRouter.post("/visa/fetch", VisaController.fetch);
adminRouter.post("/visa/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaController.create);
adminRouter.post("/visa/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaController.fetchSingle);
adminRouter.post("/visa/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaController.update);
adminRouter.post("/visa/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaController.deleted);
adminRouter.post("/visa/fetch-by-country", VisaController.fetchByCountry);


// ========== VisaTypeController Routes==========
adminRouter.post("/visatype/fetch", VisaTypeController.fetch);
adminRouter.post("/visatype/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaTypeController.create);
adminRouter.post("/visatype/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaTypeController.fetchSingle);
adminRouter.post("/visatype/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaTypeController.update);
adminRouter.post("/visatype/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaTypeController.deleted);

// ========== VisaDocumentController Routes==========
adminRouter.post("/visadocument/fetch", VisaDocumentController.fetch);
adminRouter.post("/visadocument/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaDocumentController.create);
adminRouter.post("/visadocument/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaDocumentController.fetchSingle);
adminRouter.post("/visadocument/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaDocumentController.update);
adminRouter.post("/visadocument/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, VisaDocumentController.deleted);

// ========== BlockAvaileblePdfController Routes==========
adminRouter.post("/blockavaileblepdf/fetch", BlockAvaileblePdfController.fetch);
adminRouter.post("/blockavaileblepdf/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockAvaileblePdfController.create);
adminRouter.post("/blockavaileblepdf/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockAvaileblePdfController.fetchSingle);
adminRouter.post("/blockavaileblepdf/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockAvaileblePdfController.update);
adminRouter.post("/blockavaileblepdf/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, BlockAvaileblePdfController.deleted);

// ========== NotificationPopupController Routes==========
adminRouter.post("/notificationpopup/fetch", NotificationPopupController.fetch);
adminRouter.post("/notificationpopup/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, NotificationPopupController.create);
adminRouter.post("/notificationpopup/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, NotificationPopupController.fetchSingle);
adminRouter.post("/notificationpopup/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, NotificationPopupController.update);
adminRouter.post("/notificationpopup/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, NotificationPopupController.deleted);

// ========== B2bController Routes==========
// adminRouter.post("/b2bAdmin/fetch", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bController.fetch);
adminRouter.post("/b2bAdmin/fetch",passport.authenticate("jwt", { session: false }),adminMidd.adminUser,   B2bController.fetch);
adminRouter.post("/b2bAdmin/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bController.update);

// ========== B2bMutamerListController Routes==========
adminRouter.post("/b2bMutamerList/upload-excel", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bMutamerListController.uploadExcelToDatabase);

// ========== B2bDriverController Routes==========
adminRouter.post("/b2bDriver/fetch", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bDriverController.fetch);
adminRouter.post("/b2bDriver/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bDriverController.create);
adminRouter.post("/b2bDriver/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bDriverController.fetchSingle);
adminRouter.post("/b2bDriver/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bDriverController.update);
adminRouter.post("/b2bDriver/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bDriverController.deleted);

// ========== B2bHotelController Routes==========
adminRouter.post("/b2bHotel/fetch", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bHotelController.fetch);
adminRouter.post("/b2bHotel/create", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bHotelController.create);
adminRouter.post("/b2bHotel/fetch-single", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bHotelController.fetchSingle);
adminRouter.post("/b2bHotel/update", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bHotelController.update);
adminRouter.post("/b2bHotel/delete", passport.authenticate("jwt", { session: false }), adminMidd.adminUser, B2bHotelController.deleted);
// ========== Error Handler ==========
adminRouter.use(errorHandler);

module.exports = adminRouter;
