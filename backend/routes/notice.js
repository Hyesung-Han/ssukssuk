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
mybatisMapper.createMapper([`${sqlPath}/notice.xml`]);

var app = express.Router();

// 공지사항 글 상세보기 add (01.24 hhs)
app.get("/detail/:no", async (req, res) => {
  if (!req.params || !req.params.no) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var selectParams = {
    no: req.params.no,
  };

  var selectQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.SELECT.noticedetail",
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
}); // 공지사항 글 상세보기 end

// 공지사항 글 전체 목록 add (01.24 hhs)
app.get("/list", async (req, res) => {
  var selectQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.SELECT.noticelist",
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
}); // 공지사항 글 전체 목록 end

// 공지사항 글 작성 add (01.24 hhs)
app.post("/write", async (req, res) => {
  var insertParams = {
    title: req.body.notice_title,
    author: req.body.notice_author,
    date: req.body.notice_date,
    content: req.body.notice_content,
    code: req.body.notice_code,
    user_id: req.body.notice_user_id,
  };

  let insertQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.INSERT.noticewrite",
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
      .send({ msg: "notice insert에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "입력된 정보가 없습니다." });
    return;
  }
  res.json({ success: "공지사항 글작성 성공!", url: req.url, body: req.body });
}); // 공지사항 글 작성 end

// 공지사항 글 수정 add (01.24 hhs)
app.patch("/update", async (req, res) => {
  if (!req.body) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }
  var updateParams = {
    no: req.body.notice_no,
    title: req.body.notice_title,
    content: req.body.notice_content,
  };

  var updateQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.UPDATE.NOTICEUPDATE",
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
      .send({ msg: "notice update에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "정보가 없습니다." });
    return;
  }
  res.json({ success: "notice update success" });
});
// 공지사항 글 수정 end

// 공지사항 삭제 add (01.24 hhs)
app.delete("/delete/:no", async (req, res) => {
  if (!req.params || !req.params.no) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }
  var deleteParams = {
    no: req.params.no,
  };

  var deleteQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.DELETE.NOTICEDELETE",
    deleteParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE,
    });
    console.log("notice-delete success");
  } catch (error) {
    res.status(403).send({ msg: "delete에 실패하였습니다.", error: error });
    return;
  }
  return res.json({ success: "notice delete success" });
}); // 공지사항 삭제 end

module.exports = app;
