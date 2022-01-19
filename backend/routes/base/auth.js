var express = require("express");
var {hashPassword,comparePassword} = require("../../utils/bcrypt");
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../../utils/jwt');
var app = express.Router();

// 회원정보 조회
app.get("/:id", async (req, res) => {
  if (!req.params || !req.params.id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var selectParams = {
    id: req.params.id,
  };

  var selectQuery = req.mybatisMapper.getStatement(
    "USER",
    "AUTH.SELECT.TB_VU.001",
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
    res.status(403).send({ msg: "rdb select에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "정보가 없습니다." });
    return;
  }

  res.json({
    msg: "RDB에서 정보 꺼내오기",
    user: data.map((x) => {
      x.vu_password = "";
      return x;
    })[0],
  });
}); // 회원 정보 조회 end

// 회원가입 (add 01.19 OYT )
app.post("/regi", async (req, res) => {

  const hashedPassword = await hashPassword(req.body.user_pw);

  var insertParams = {
    id: req.body.user_id,
    pw: hashedPassword,
    name: req.body.user_name,
    nickName: req.body.user_nickName,
    email: req.body.user_email,
    code: req.body.user_code,
  };
  
  let insertQuery = req.mybatisMapper.getStatement(
    "USER",
    "AUTH.INSERT.userRegi",
    insertParams,
    { language: "sql", indent: "  " }
  );
  console.log(insertQuery);
  let data = [];
  try {
    data = await req.sequelize.query(insertQuery, {
      type: req.sequelize.QueryTypes.INSERT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res.status(403).send({ msg: "user insert에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "입력된 정보가 없습니다." });
    return;
  }
  res.json({ success: "회원가입 성공!", url: req.url, body: req.body });
});

// 회원 정보 수정(add 01.19 CSW)
app.patch("/:id", verifyToken, async (req, res) => {
  if (!req.params || !req.params.id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var updateParams = {
    id: req.params.id,
  };

  var updateQuery = req.mybatisMapper.getStatement(
    "USER",
    "AUTH.UPDATE.USERUPDATE",
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
    res.status(403).send({ msg: "update에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "정보가 없습니다." });
    return;
  }
  res.json({
    msg: "RDB에서 정보 꺼내오기",
    user: data.map((x) => {
      x.vu_password = "";
      return x;
    })[0],
  });

});
// 회원 정보 수정 end


module.exports = app;
