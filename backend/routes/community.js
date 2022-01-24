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
mybatisMapper.createMapper([`${sqlPath}/community.xml`]);

var app = express.Router();

// 글 목록 가져오기 (add 01.24 OYT)
app.get("/list", async function (req, res) {

  var selectQuery = mybatisMapper.getStatement(
    "COMMUNITY",
    "COMMUNITY.SELECT.list",
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
    res.status(403).send({ msg: "글목록 불러오기에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "작성된 글이 없습니다." });
    return;
  }

  // 글 목록 꺼내오기
  res.json({
    msg: "글 목록",
    user: data.map((x) => {
      return x;
    }),
  });
}); // 글 목록 end

// 글 작성 (add 01.24 OYT)
app.post("/regi", async function (req, res) {

  var insertParams = {
    title: req.body.community_title,
    author: req.body.community_author,
    content: req.body.community_content,
    code: req.body.community_code,
  };

  let insertQuery = mybatisMapper.getStatement(
    "COMMUNITY",
    "COMMUNITY.INSERT.regi",
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
      .send({ msg: "글작성에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "입력된 정보가 없습니다." });
    return;
  }

  res.json({ success: "글작성 성공!", url: req.url, body: req.body });
}); // 글 작성 end

// 글 수정 (add 01.24 OYT)
app.put("/update", function (req, res) {
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
}); // 글 수정 end

// 글 삭제 (add 01.24 OYT)
app.delete("/", function (req, res) {
  res.json({ success: "delete call succeed!", url: req.url });
}); // 글 삭제 end

module.exports = app;
