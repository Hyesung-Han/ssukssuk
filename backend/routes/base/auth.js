var express = require("express");
var {hashPassword,comparePassword} = require("../../utils/bcrypt");
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../../utils/jwt');
var app = express.Router();

// // 회원정보 조회
app.get("/myInfo", async (req, res) => {
  if (!req.body || !req.body.id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var selectParams = {
    id: req.body.id,
  };

  var selectQuery = req.mybatisMapper.getStatement(
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
}); // 회원가입 end

// ID 중복검사 (add 01.19 OYT)
app.get('/checkid', async (req, res) => {
    var selectParams = {
      user_id: req.body.id,
    };

  console.log(req.body.id);

  let idChkQuery = req.mybatisMapper.getStatement(
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
    res.status(403).send({ msg: "아이디 중복검사에 실패하였습니다.", error: error });
    return;
  }
  let checkid = new Object();
  checkid.tf =false;   
  if (data.length == 0) {
    checkid.tf = true
  }else{
    checkid.tf = false
  }
  res.json({
    msg: "id 중복검사",
    idchk: checkid.tf
  });
}); // ID 중복검사 end

// nickname 중복검사 (add 01.19 OYT)
app.get('/checknick', async (req, res) => {
  var selectParams = {
    user_nickName: req.body.user_nickName,
  };

console.log(req.body.user_nickName);

let nickChkQuery = req.mybatisMapper.getStatement(
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
  res.status(403).send({ msg: "닉네임 중복검사에 실패하였습니다.", error: error });
  return;
}
let checkNick = new Object();
checkNick.tf =false;   
if (data.length == 0) {
  checkNick.tf = true
}else{
  checkNick.tf = false
}
res.json({
  msg: "닉네임 중복검사",
  nickchk: checkNick.tf
});
}); // 닉네임 중복검사 end

// 회원 정보 수정(add 01.19 CSW)
app.patch("/updateinfo", async (req, res) => {
  if (!req.body || !req.body.user_id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }
  var updateParams = {
    id: req.body.user_id,
    nickName: req.body.user_nickName
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
    res.status(403).send({ msg: "nick name update에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "정보가 없습니다." });
    return;
  }
  res.json({ success: "nickname update success"});

});
// 회원 정보 수정 end

// 회원탈퇴 add (01.19 csw)
app.delete("/delete", async(req, res)=>{
  if (!req.body || !req.body.user_id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }
  var deleteParams = {
    id: req.body.user_id
  };

  var deleteQuery = req.mybatisMapper.getStatement(
    "BASE",
    "AUTH.DELETE.USERDELETE",
     deleteParams,
     { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE
    });
    console.log("user-delete success");
  } catch (error) {
    res.status(403).send({ msg: "delete에 실패하였습니다.", error: error });
    return;
  }
}); // 회원탈퇴 end
    

// 비밀번호 수정(add 01.19 CSW)
app.patch("/updatepw", async (req, res) => {
  if (!req.body || !req.body.user_id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var updateParams = {
    id: req.body.user_id,
    pw: req.body.user_pw,
  };

  var updateQuery = req.mybatisMapper.getStatement(
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
    res.status(403).send({ msg: "pw update에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "정보가 없습니다." });
    return;
  }
  res.json({ success: "pw update success"});

});
// 비밀번호 수정 end


module.exports = app;
