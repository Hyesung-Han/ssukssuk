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

//----------------------------------
// middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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
app.use(uploadFilePath, express.static(path.join(__dirname + uploadFilePath)));
app.use("/community", require(`${__dirname}/routes/community`));
app.use("/user", require(`${__dirname}/routes/auth`));
app.use("/notice", require(`${__dirname}/routes/notice`));
app.use("/admin", require(`${__dirname}/routes/admin`));
app.use("/myfarm", require(`${__dirname}/routes/myfarm`));
app.use("/myfarm_survey", require(`${__dirname}/routes/myfarm_survey`));

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
