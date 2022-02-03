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
mybatisMapper.createMapper([`${sqlPath}/myfarm.xml`]);

var app = express.Router();

// 내 농장 상세보기 add (02.03 hhs)
app.get("/detail/:no", async (req, res) => {
  if (!req.params || !req.params.no) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var selectParams = {
    no: req.params.no,
  };

  var selectQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.SELECT.myfarmdetail",
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
}); // 내 농장 상세보기 end

// 내 농장 전체 목록 add (02.03 hhs)
app.get("/list", async function (req, res) {
  var selectParams = {
    keyword: req.query.keyword,
  };
  var selectQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.SELECT.myfarmlist",
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
  // 농장이 없는 경우
  if (data.length == 0) {
    res.json({
      result: "success",
      data: {
        list_cnt: 0,
      },
    });
    return;
  }

  // 농장 목록 꺼내오기
  res.json({
    result: "success",
    data: data.map((x) => {
      return x;
    }),
  });
}); // 내 농장 전체 목록 end

// 내 농장 정보 수정 add (02.03 hhs)
app.patch("/update", async (req, res) => {
  if (!req.body) {
    res.status(403).send({ result: "fail" });
    return;
  }
  var updateParams = {
    no: req.body.farm_no,
    name: req.body.farm_name,
    text: req.body.farm_text,
  };

  var updateQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.UPDATE.myfarmupdate",
    updateParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(updateQuery, {
      type: req.sequelize.QueryTypes.UPDATE,
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
  res.json({ result: "success" });
});
// 내 농장 정보 수정 end

// 내 농장 정보 삭제 add (02.03 hhs)
app.delete("/delete/:no", async (req, res) => {
  if (!req.params || !req.params.no) {
    res.status(403).send({ result: "fail" });
    return;
  }
  var deleteParams = {
    no: req.params.no,
  };

  var deleteQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.DELETE.myfarmdelete",
    deleteParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE,
    });
    console.log("myfarm-delete success");
  } catch (error) {
    res.status(403).send({ result: "fail", error: error });
    return;
  }
  return res.json({ result: "success" });
}); // 내 농장 정보 삭제 end

module.exports = app;
