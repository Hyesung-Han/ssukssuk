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
app.get("/list", async function (req, res) {
  var selectParams = {
    type: req.query.notice_code,
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
    res
      .status(403)
      .send({ msg: "글목록 불러오기에 실패하였습니다.", error: error });
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
}); // 공지사항 글 전체 목록 end

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

// 공지사항 글 검색(제목+글 내용) add (01.24 hhs)
app.get("/search", async function (req, res) {
  var selectParams = {
    keyword: req.query.keyword,
  };
  var selectQuery = mybatisMapper.getStatement(
    "NOTICE",
    "NOTICE.SELECT.noticesearch",
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
      .send({ msg: "글목록 불러오기에 실패하였습니다.", error: error });
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
}); // 공지사항 글 전체 목록 end

// 공지사항 댓글 작성 add (01.25 hhs)
app.post("/comment/write", async (req, res) => {
  var insertParams = {
    comment_no: req.body.comment_no,
    user_nickName: req.body.comment_user_nickName,
    notice_no: req.body.notice_no,
    text: req.body.comment_text,
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
    res
      .status(403)
      .send({ msg: "notice comment insert에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "입력된 정보가 없습니다." });
    return;
  }
  res.json({
    success: "공지사항 댓글작성 성공!",
    url: req.url,
    body: req.body,
  });
}); // 공지사항 댓글 작성 end

// 공지사항 댓글 수정 add (01.25 hhs)
app.patch("/comment/update", async (req, res) => {
  if (!req.body) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
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
    res
      .status(403)
      .send({ msg: "comment update에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "정보가 없습니다." });
    return;
  }
  res.json({ success: "notice comment update success" });
});
// 공지사항 댓글 수정 end

// 공지사항 댓글삭제 add (01.25 hhs)
app.delete("/comment/delete/:no", async (req, res) => {
  if (!req.params || !req.params.no) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
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
    res.status(403).send({ msg: "delete에 실패하였습니다.", error: error });
    return;
  }
  return res.json({ success: "notice comment delete success" });
}); // 공지사항 댓글 삭제 end

module.exports = app;
