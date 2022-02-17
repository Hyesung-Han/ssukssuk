//----------------------------------
// lib
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
// const multer = require("multer"); // form-data 파싱을 위한..
// const form_data = multer(); // form-data 파싱을 위한..
const { swaggerUi, specs } = require("./swagger");
const nodemailer = require('nodemailer');
// --------------------------------------------
// env
const envJson = require(`${__dirname}/env/env.json`);
const uploadFilePath = envJson.uploadFilePath;
const port = envJson.port ? envJson.port : 3001;

const router = express.Router();

//----------------------------------
// middleware
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// cors
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
// bodyParser

app.use(bodyParser.json()); // req.body 내용 파싱
app.use(bodyParser.urlencoded({ extended: true })); // req.body 내용 파싱
// app.use(form_data.array()); // form-data 파싱을 위한..

// db
app.use(require(`${__dirname}/middleware/db`));

//----------------------------------
// routes
router.use(uploadFilePath, express.static(path.join(__dirname + uploadFilePath)));
router.use("/community", require(`${__dirname}/routes/community`));
router.use("/user", require(`${__dirname}/routes/auth`));
router.use("/notice", require(`${__dirname}/routes/notice`));
router.use("/admin", require(`${__dirname}/routes/admin`));
router.use("/myfarm", require(`${__dirname}/routes/myfarm`));
router.use("/myfarm_survey", require(`${__dirname}/routes/myfarm_survey`));

app.use("/api", router);
app.use(function (err, req, res, next) {
  console.log("This is the invalid field ->", err.field);
  next(err);
});

app.get("/", function (req, res) {
  res.send("Hello node.js");
});

//----------------------------------
//
app.listen(port, () => {
  console.log(`{init : ${port}}`);
});
