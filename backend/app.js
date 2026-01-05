require('module-alias/register');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require("path");

const config = require("@services/app.service");
const adminRouter = require("@routes/admin.router");
const b2bRouter = require('@routes/b2b.router');

const app = express();

// ========== Middlewares ==========
// File Upload
app.use( fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  }));

// View Engine (EJS for HTML rendering)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('trust proxy', true); 

// JSON parsing
app.use(express.json({ limit: '25mb' }));

// Body Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(cors());

// Static File Serving (for file uploads/images)
app.use('/storage', express.static(path.join(__dirname, 'storage')));

// ========== Routes ==========
app.use("/api/admin", adminRouter);
app.use("/api/admin/b2b", b2bRouter);

// Health check / default route
app.get("/", (_req, res) => {
  res.json({ message: "Server is running..." });
});

// ========== Start Server ==========
const PORT = process.env.PORT || config.port || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
