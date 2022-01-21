var express = require("express");
var { hashPassword, comparePassword } = require("../../utils/bcrypt");
const jwt = require("jsonwebtoken");
const envJson = require(`${__dirname}/../../env/env.json`);
const { verifyToken } = require("../../utils/jwt");

// DB 연동
const path = require("path");
const mybatisMapper = require("mybatis-mapper");
const version = process.env.VERSION ? process.env.VERSION : "base";
const sqlPath = path.join(__dirname, "..", ".", `../sql/${version}/`);

// mapper 설정
mybatisMapper.createMapper([`${sqlPath}/base.xml`]);

var app = express.Router();

// 회원정보 조회
app.get("/myInfo/:id", async (req, res) => {
  if (!req.params || !req.params.id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var selectParams = {
    id: req.params.id,
  };

  var selectQuery = mybatisMapper.getStatement(
    "USER",
    "AUTH.SELECT.userInfo",
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
      return x;
    }),
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

  let insertQuery = mybatisMapper.getStatement(
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
    res
      .status(403)
      .send({ msg: "user insert에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "입력된 정보가 없습니다." });
    return;
  }
  res.json({ success: "회원가입 성공!", url: req.url, body: req.body });
}); // 회원가입 end

// ID 중복검사 (add 01.19 OYT)
app.get("/checkid/:id", async (req, res) => {
  var selectParams = {
    user_id: req.params.id,
  };

  console.log(req.params.id);

  let idChkQuery = mybatisMapper.getStatement(
    "USER",
    "AUTH.SELECT.userIdChk",
    selectParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(idChkQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res
      .status(403)
      .send({ msg: "아이디 중복검사에 실패하였습니다.", error: error });
    return;
  }
  let checkid = new Object();
  checkid.tf = false;
  if (data.length == 0) {
    checkid.tf = true;
  } else {
    checkid.tf = false;
  }
  return res.json({
    msg: "id 중복검사",
    code: 200,
    idchk: checkid.tf,
  });
}); // ID 중복검사 end

// nickname 중복검사 (add 01.19 OYT)
app.get("/checknick/:nickName", async (req, res) => {
  var selectParams = {
    user_nickName: req.params.nickName,
  };

  console.log(req.params.nickName);

  let nickChkQuery = mybatisMapper.getStatement(
    "USER",
    "AUTH.SELECT.userNickChk",
    selectParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(nickChkQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res
      .status(403)
      .send({ msg: "닉네임 중복검사에 실패하였습니다.", error: error });
    return;
  }
  let checkNick = new Object();
  checkNick.tf = false;
  if (data.length == 0) {
    checkNick.tf = true;
  } else {
    checkNick.tf = false;
  }
  return res.json({
    msg: "닉네임 중복검사",
    code: 200,
    nickchk: checkNick.tf,
  });
}); // 닉네임 중복검사 end

// 회원 정보 수정(add 01.19 CSW)
app.patch("/updateinfo", verifyToken, async (req, res) => {
  if (!req.body || !req.body.user_id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }
  var updateParams = {
    id: req.body.user_id,
    nickName: req.body.user_nickName,
  };

  var updateQuery = mybatisMapper.getStatement(
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
    res
      .status(403)
      .send({ msg: "nick name update에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "정보가 없습니다." });
    return;
  }
  res.json({ success: "nickname update success" });
});
// 회원 정보 수정 end

// 회원탈퇴 add (01.19 csw)
app.delete("/delete/:id", async (req, res) => {
  if (!req.params || !req.params.id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }
  var deleteParams = {
    id: req.params.id,
  };2

  var deleteQuery = mybatisMapper.getStatement(
    "USER",
    "AUTH.DELETE.USERDELETE",
    deleteParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE,
    });
    console.log("user-delete success");
  } catch (error) {
    res.status(403).send({ msg: "delete에 실패하였습니다.", error: error });
    return;
  }
  return res.json({ success: "nickname update success" });
}); // 회원탈퇴 end

// 비밀번호 수정(add 01.19 CSW)
app.patch("/updatepw", verifyToken, async (req, res) => {
  if (!req.body || !req.body.user_id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }
  //존재하는 회원인지 확인
  if (!req.body || !req.body.user_id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var selectParams = {
    id: req.body.user_id,
  };

  let selectQuery = mybatisMapper.getStatement(
    "USER",
    "AUTH.SELECT.userexist",
    selectParams,
    { language: "sql", indent: "  " }
  );
  console.log(selectQuery);
  let data = [];
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res.status(403).send({ msg: "존재하지 않는 유저입니다.", error: error });
    return;
  }
  //존재하는 유저인지 확인 end

  var updateParams = {
    id: req.body.user_id,
    pw: req.body.user_pw,
    new_pw: req.body.user_new_pw,
  };

  const result = await comparePassword(updateParams.pw, data[0].user_pw);

  if (result) {
    var updateQuery = mybatisMapper.getStatement(
      "USER",
      "AUTH.UPDATE.USERPWUPDATE",
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
        .send({ msg: "pw update에 실패하였습니다.", error: error });
      return;
    }

    if (data.length == 0) {
      res.status(403).send({ msg: "정보가 없습니다." });
      return;
    }
    res.json({ success: "pw update success" });
  } else {
    res.json({ error: "pw 일치하지 않음" });
  }
});
// 비밀번호 수정 end

// 회원 로그인 (fix 01.20 OYT)
app.post("/login", async (req, res) => {
  //존재하는 회원인지 확인
  if (!req.body || !req.body.user_id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var selectParams = {
    id: req.body.user_id,
  };

  let selectQuery = mybatisMapper.getStatement(
    "USER",
    "AUTH.SELECT.userexist",
    selectParams,
    { language: "sql", indent: "  " }
  );
  console.log(selectQuery);
  let data = [];
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res
      .status(403)
      .send({ msg: "로그인 중 문제가 발생했습니다.", error: error });
    return;
  }
  //존재하는 유저인지 확인 end
  if (data.length == 0) {
    return res.status(200).json({ code: 200, msg: "로그인 정보를 확인하세요" });
  } else {
    //비밀번호 비교
    const result = await comparePassword(req.body.user_pw, data[0].user_pw);

    if (result) {
      const token = jwt.sign(
        {
          id: data[0].user_id,
        },
        envJson.JWT_SECRET,
        { expiresIn: "24h" }
      );
      console.log(token);
      return res.status(200).json({
        code: 200,
        msg: "로그인 성공",
        token: token,
        id: data[0].user_id,
        name: data[0].user_nickName,
      });
    } else {
      return res
        .status(200)
        .json({ code: 200, msg: "로그인 정보를 확인하세요" });
    }
  }
});

//비밀번호 비교 end
// 회원 로그인 end

module.exports = app;
