var express = require("express");
var { hashPassword, comparePassword } = require("../utils/bcrypt");
const jwt = require("jsonwebtoken");
const envJson = require(`${__dirname}/../env/env.json`);
const { verifyToken } = require("../utils/jwt");
const nodemailer = require("nodemailer"); 
const ejs = require('ejs');


// DB 연동
const path = require("path");
const mybatisMapper = require("mybatis-mapper");
// const version = process.env.VERSION ? process.env.VERSION : "base";
const sqlPath = path.join(__dirname, "..", ".", `/sql/`);

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
    res.status(403).send({ result : "fail", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "정보가 없습니다." });
    return;
  }

  res.json({
    result : "success",
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
      .send({ result : "fail", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ result : "fail" });
    return;
  }
  res.json({  result : "success" , url: req.url, body: req.body });
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
      .send({ result : "fail", error: error });
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
    result : "success",
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
      .send({ result : "fail", error: error });
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
    result : "success",
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
      .send({ result : "fail", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ result : "fail" });
    return;
  }
  res.json({ result : "success" });
});
// 회원 정보 수정 end

// 회원탈퇴 fix (01.27 OYT)
app.delete("/delete", async (req, res) => {
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


  const result = await comparePassword(req.body.user_pw, data[0].user_pw);
  var deleteParams = {
    id: req.body.user_id,
    pw: data[0].user_pw,
  };
  if (result) {

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
      res.status(403).send({ result : "fail", error: error });
      return;
    }
    res.json({ result : "success" });

  } else {
    res.json({ result : "fail", error: "pw 일치하지 않음" });
  }
}); // 회원탈퇴 end


// 비밀번호 수정(fix 01.21 OYT)
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
  const hashedPassword = await hashPassword(req.body.user_new_pw);
  var updateParams = {
    id: req.body.user_id,
    pw: req.body.user_pw,
    new_pw: hashedPassword,
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
        .send({ result : "fail", error: error });
      return;
    }

    if (data.length == 0) {
      res.status(403).send({ msg: "정보가 없습니다." });
      return;
    }
    res.json({ result : "success" });
  } else {
    res.json({ result : "fail", error: "pw 일치하지 않음" });
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
        status: "login",
        token,
        user_id: data[0].user_id,
        user_nickName: data[0].user_nickName,
        user_code: data[0].user_code,
        code_name: data[0].code_name
      });
    } else {
      return res
        .status(200)
        .json({ code: 200, status: "fail", msg: "로그인 정보를 확인하세요" });
    }
  }
});

//비밀번호 비교 end
// 회원 로그인 end

const emailAuthNum = new Object();

//회원가입 시 email 인증 ( 2022.02.07 CSW)
app.post("/regi-email", async (req, res) => {
  if (!req.body || !req.body.user_email) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }
  //console.log(req.body.user_email);
  var selectParams = {
    user_email: req.body.user_email,
  };

  let selectQuery = mybatisMapper.getStatement(
    "USER",
    "AUTH.SELECT.emailchk",
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
    res
      .status(403)
      .send({ msg: "이메일 확인 중 문제가 발생했습니다.", error: error });
    return;
  }
  if (data.length == 0) {
    let emailto = req.body.user_email;
    let authNum = Math.random().toString().substr(2,6);
    emailAuthNum.emailto = emailto;
    emailAuthNum.authNum = authNum;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        //host: 'smtp.gmail.com',
        port:465,
        secure: true,
        auth: {
            user: envJson.NODEMAILER_USER,
            pass: envJson.NODEMAILER_PASS,
        },
    });
    const mailOptions = {
        from: envJson.NODEMAILER_USER,
        to: emailto,
        subject: "회원가입을 위한 인증번호를 입력해주세요.",
        html: `<div style="text-align: center;">
        <h3>인증번호 입니다.</h3><br/>
        <p>${authNum}</p></div>`
          ,
    };
  
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
        if(error){
          console. log("nodemailer error: "+ error);
        }else{
          return res.status(200).json({
            code: 200,
            msg: "회원가입 이메일 인증번호 전송 성공",
            status: "regi-email",
            content: info.response
          });
        }
        transporter.close();

    });
  }else{
    return res.json({
      code: 200,
      result : "fail",
      msg: "이미 존재하는 이메일 입니다."
    });
  }
}); // 회원가입 시 email 인증 end

// email 인증 확인 (add 02.10 OYT)
app.get("/regi-email", async (req, res) => {
  if (!req.query || !req.query.authNum) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }
  try {
    if(emailAuthNum.authNum == req.query.authNum && emailAuthNum.emailto == req.query.user_email){
      return res.json({
        code: 200,
        result : "success",
      });
    }else{
      return res.json({
        code: 200,
        result : "fail",
      });
    }
  } catch (error) {
    res.status(403).send({ result : "fail", error: error });
    return;
  }
}); // email 인증 확인 end




module.exports = app;
