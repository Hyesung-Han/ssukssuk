//----------------------------------
// lib
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
const multer = require('multer'); // form-data 파싱을 위한..
const form_data = multer(); // form-data 파싱을 위한..
const { swaggerUi, specs } = require('./swagger');

// --------------------------------------------
// env
const envJson = require(`${__dirname}/env/env.json`);
const uploadFilePath = envJson.uploadFilePath;
const port = envJson.port ? envJson.port : 3001;

//----------------------------------
// middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
app.use(form_data.array()); // form-data 파싱을 위한..

// db
app.use(require(`${__dirname}/middleware/db`));


//----------------------------------
// routes
app.use(uploadFilePath, express.static(path.join(__dirname + uploadFilePath)));
app.use("/base", require(`${__dirname}/routes/base/base`));
app.use("/user", require(`${__dirname}/routes/base/auth`));

app.get("/", function (req, res) {
  res.send("Hello node.js");
});

//----------------------------------
//
app.listen(port, () => {
  console.log(`{init : ${port}}`);
});
