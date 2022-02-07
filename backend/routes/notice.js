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

// 공지사항 글 상세보기 fix (02.03 OYT)
app.get("/detail/:no", async (req, res) => {
  if (!req.params || !req.params.no) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var selectParams = {
    no: req.params.no,
  };

  var updateQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.UPDATE.hitcount",
    selectParams,
    { language: "sql", indent: "  " }
  );

  var selectQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.SELECT.noticedetail",
    selectParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  // 조회수 업데이트
  try {
    data = await req.sequelize.query(updateQuery, {
      type: req.sequelize.QueryTypes.UPDATE,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res
      .status(403)
      .send({ msg: "조회수 업데이트에 실패하였습니다.", error: error });
    return;
  }

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
    data: data[0],
  });
}); // 공지사항 글 상세보기 end

// 공지사항 글 전체 목록 add (01.24 hhs)
app.get("/list", async function (req, res) {
  const page_no = (req.query.page_no - 1) * 10;
  var selectParams = {
    type: req.query.notice_code,
    keyword: req.query.keyword,
    length: 10,
    start: page_no,
  };
  var selectQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.SELECT.noticelist",
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
  //글이 없는 경우
  if (data.length == 0) {
    res.json({
      result: "success",
      data: {
        list_cnt: 0,
      },
    });
    return;
  }

  // 글 목록 꺼내오기
  res.json({
    result: "success",
    data: data.map((x) => {
      return x;
    }),
  });
}); // 공지사항 글 전체 목록 end

// 공지사항 글 전체 개수 add (01.26 hhs)
app.get("/listcount", async function (req, res) {
  var selectParams = {
    type: req.query.notice_code,
    keyword: req.query.keyword,
  };
  var selectQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.SELECT.noticelistcount",
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
  //글이 없는 경우
  if (data.length == 0) {
    res.json({
      result: "success",
      data: {
        list_cnt: 0,
      },
    });
    return;
  }

  // 글 목록 꺼내오기
  res.json({
    result: "success",
    data: data.map((x) => {
      return x;
    }),
  });
}); // 공지사항 글 전체 개수 end

// 공지사항 글 작성 add (01.24 hhs)
app.post("/write", async (req, res) => {
  var insertParams = {
    title: req.body.notice_title,
    author: req.body.notice_author,
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
    res.status(403).send({ result: "fail", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ result: "fail" });
    return;
  }
  res.json({ result: "success", url: req.url, body: req.body });
}); // 공지사항 글 작성 end

// 공지사항 글 수정 add (01.24 hhs)
app.patch("/update", async (req, res) => {
  if (!req.body) {
    res.status(403).send({ result: "fail" });
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
    res.status(403).send({ result: "fail", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ result: "fail" });
    return;
  }
  res.json({ result: "success" });
});
// 공지사항 글 수정 end

// 공지사항 삭제 add (01.24 hhs)
app.delete("/delete/:no", async (req, res) => {
  if (!req.params || !req.params.no) {
    res.status(403).send({ result: "fail" });
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
    res.status(403).send({ result: "fail", error: error });
    return;
  }
  return res.json({ result: "success" });
}); // 공지사항 삭제 end

// 공지사항 댓글 작성 add (01.25 hhs)
app.post("/comment/write", async (req, res) => {
  var insertParams = {
    user_nickName: req.body.comment_user_nickName,
    notice_no: req.body.article_no,
    text: req.body.comment_text,
    user_id: req.body.comment_user_id,
  };

  let insertQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.INSERT.commentwrite",
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
    res.status(403).send({ result: "fail", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ result: "fail" });
    return;
  }
  res.json({
    result: "success",
    url: req.url,
    body: req.body,
  });
}); // 공지사항 댓글 작성 end

// 공지사항 댓글 수정 add (01.25 hhs)
app.patch("/comment/update", async (req, res) => {
  if (!req.body) {
    res.status(403).send({ result: "fail" });
    return;
  }
  var updateParams = {
    no: req.body.comment_no,
    text: req.body.comment_text,
  };

  var updateQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.UPDATE.COMMENTUPDATE",
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
// 공지사항 댓글 수정 end

// 공지사항 댓글삭제 add (01.25 hhs)
app.delete("/comment/delete/:no", async (req, res) => {
  if (!req.params || !req.params.no) {
    res.status(403).send({ result: "fail" });
    return;
  }
  var deleteParams = {
    no: req.params.no,
  };

  var deleteQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.DELETE.COMMENTDELETE",
    deleteParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE,
    });
    console.log("comment delete success");
  } catch (error) {
    res.status(403).send({ result: "fail", error: error });
    return;
  }
  res.json({ result: "success" });
}); // 공지사항 댓글 삭제 ends

// 공지사항 댓글 전체 목록 fix (01.28 OYT)
app.get("/comment/list", async function (req, res) {
  var selectParams = {
    no: req.query.article_no,
  };
  var selectQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.SELECT.commentlist",
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
    res.json({
      result: "success",
      data: (data = {}),
    });
    return;
  } else {
    // 댓글 목록 꺼내오기
    res.json({
      result: "success",
      data: data.map((x) => {
        return x;
      }),
    });
  }
}); // 공지사항 댓글 전체 목록 end

module.exports = app;
