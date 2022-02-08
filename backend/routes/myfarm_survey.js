var express = require("express");
var { hashPassword, comparePassword } = require("../utils/bcrypt");
const jwt = require("jsonwebtoken");
const envJson = require(`${__dirname}/../env/env.json`);
const { verifyToken } = require("../utils/jwt");

// DB 연동
const path = require("path");
const mybatisMapper = require("mybatis-mapper");
// const version = process.env.VERSION ? process.env.VERSION : "base";
const sqlPath = path.join(__dirname, "..", ".", `/sql/`);

// mapper 설정
mybatisMapper.createMapper([`${sqlPath}/myfarm_survey.xml`]);

var app = express.Router();

// 내 설문 상세보기 add (02.03 hhs)
app.get("/detail/", async (req, res) => {
  var selectParams = {
    id: req.query.user_id,
    farm_no: req.query.farm_no,
    survey_no: req.query.survey_no,
  };
  var selectQuery = mybatisMapper.getStatement(
    "MYFARM_SURVEY",
    "MYFARM_SURVEY.SELECT.myfarm_surveydetail",
    selectParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res.status(403).send({ result: "fail", error: error });
    return;
  }
  if (data.length == 0) {
    res.status(403).send({ result: "fail" });
    return;
  }

  res.json({
    result: "success",
    data: data.map((x) => {
      return x;
    }),
  });
}); // 내 설문 상세 보기 end

// 내 설문 전체 목록 add (02.03 hhs)
app.get("/list", async function (req, res) {
  var selectParams = {
    id: req.query.user_id,
    no: req.query.farm_no,
  };
  var selectQuery = mybatisMapper.getStatement(
    "MYFARM_SURVEY",
    "MYFARM_SURVEY.SELECT.myfarm_surveylist",
    selectParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res.status(403).send({ result: "fail", error: error });
    return;
  }
  // 설문 없는 경우
  if (data.length == 0) {
    res.json({
      result: "success",
      data: {
        list_cnt: 0,
      },
    });
    return;
  }

  // 설문 목록 꺼내오기
  res.json({
    result: "success",
    data: data.map((x) => {
      return x;
    }),
  });
}); // 내 농장 전체 목록 end

// 내 설문 그래프 나타내기 add (02.03 hhs)
app.get("/graph", async function (req, res) {
  var selectParams = {
    id: req.query.user_id,
    no: req.query.farm_no,
  };
  var selectQuery = mybatisMapper.getStatement(
    "MYFARM_SURVEY",
    "MYFARM_SURVEY.SELECT.myfarm_surveygraph",
    selectParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res.status(403).send({ result: "fail", error: error });
    return;
  }
  // 설문 없는 경우
  if (data.length == 0) {
    res.json({
      result: "success",
      data: {
        list_cnt: 0,
      },
    });
    return;
  }

  // 설문 목록 꺼내오기
  res.json({
    result: "success",
    data: data.map((x) => {
      return x;
    }),
  });
}); // 내 설문 그래프 나타내기 end

// 내 농장 상태 나타내기 add (02.04 hhs)
app.get("/status", async function (req, res) {
  var selectParams = {
    id: req.query.user_id,
    no: req.query.farm_no,
  };
  var selectQuery = mybatisMapper.getStatement(
    "MYFARM_SURVEY",
    "MYFARM_SURVEY.SELECT.myfarm_sensor",
    selectParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res.status(403).send({ result: "fail", error: error });
    return;
  }
  // 센서 값 없는 경우
  if (data.length == 0) {
    res.json({
      result: "success",
      data: {
        list_cnt: 0,
      },
    });
    return;
  }

  // 센서 목록 꺼내오기
  res.json({
    result: "success",
    data: data.map((x) => {
      return x;
    }),
  });
}); // 내 농장 상태 나타내기 end

module.exports = app;
