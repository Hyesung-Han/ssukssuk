var express = require("express");
var { hashPassword, comparePassword } = require("../utils/bcrypt");
const jwt = require("jsonwebtoken");
const envJson = require(`${__dirname}/../env/env.json`);
const { verifyToken } = require("../utils/jwt");

// DB 연동
const path = require("path");
const mybatisMapper = require("mybatis-mapper");
const sqlPath = path.join(__dirname, "..", ".", `/sql/`);

// mapper 설정
mybatisMapper.createMapper([`${sqlPath}/admin.xml`]);

var app = express.Router();

// 회원 리스트 add (02.03 OYT)
app.get("/list", async (req, res) => {
  
  // const page_no = ((req.query.page_no - 1) * req.query.length);

  if (!req.query || !req.query.id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var selectParams = {
    id: req.query.id,
  };

  var selectQuery = mybatisMapper.getStatement(
    "ADMIN",
    "ADMIN.SELECT.chkAdmin",
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
    res.status(403).send({ result : "fail", error: error });
    return;
  }

  if (data.length == 0 || data[0].user_code != "U04") {
      res.json({ result : "fail", msg: "잘못된 접근입니다." });
  }else{
      var searchParams = {
          id: req.query.id,
          keyword: req.query.keyword,
          // length: req.query.length,
          // start : page_no
        };

      selectQuery = mybatisMapper.getStatement(
      "ADMIN",
      "ADMIN.SELECT.userList",
      searchParams,
      { language: "sql", indent: "  " }
      );

      let data2 = [];
      try {
        data2 = await req.sequelize.query(selectQuery, {
          type: req.sequelize.QueryTypes.SELECT,
        });
        console.log("TCL: data", data2);
      } catch (error) {
        res.status(403).send({ result : "fail", error: error });
        return;
      }

      res.json({
          result : "success",
          user: data2.map((x) => {
            return x;
          }),
        });
  }
}); // 회원 리스트 end


// 회원 권한 리스트 add (02.03 OYT)
app.get("/userCodeList", async (req, res) => {

  var selectQuery = mybatisMapper.getStatement(
    "ADMIN",
    "ADMIN.SELECT.CodeList",
    null,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res.status(403).send({ result : "fail", error: error });
    return;
  }

  res.json({
      result : "success",
      code: data.map((x) => {
        return x;
      }),
    });
  
}); // 회원 권한 리스트 end

// 회원 권한 수정 add ( 02.03 OYT)
app.put("/update", async function (req, res) {

  var updateParams = {
    id: req.body.user_id,
    code: req.body.user_code,
  };

  var updateQuery = mybatisMapper.getStatement(
    "ADMIN",
    "ADMIN.UPDATE.updateCode",
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
    res
      .status(403)
      .send({ msg: "update에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "update success" });
}); // 회원 권한 수정 end

// 회원 강퇴 add (02.03 OYT)
app.delete("/delete/:user_id", async function (req, res) {
  if (!req.params || !req.params.user_id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  };

  var deleteParams = {
    id: req.params.user_id,
  };

  var deleteQuery = mybatisMapper.getStatement(
    "ADMIN",
    "ADMIN.DELETE.userDelete",
    deleteParams,
    { language: "sql", indent: "  " }
  );

  try {
    data = await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE,
    });
    console.log("delete success");
  } catch (error) {
    res.status(403).send({ msg: "delete에 실패하였습니다.", error: error });
    return;
  }
  res.json({ success: "delete success" });
}); // 회원 강퇴 end
  module.exports = app;
