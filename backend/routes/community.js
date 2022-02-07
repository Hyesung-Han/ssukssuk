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
  const page_no = (req.query.page_no - 1) * 10;

  var selectParams = {
    type: req.query.community_code,
    keyword: req.query.keyword,
    length: 10,
    start: page_no,
  };
  var selectQuery = mybatisMapper.getStatement(
    "COMMUNITY",
    "COMMUNITY.SELECT.list",
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

  // 글이 없는 경우
  if (data.length == 0) {
    res.json({
      result: "success",
      data: [{}],
    });
    return;
  }

  // 글 목록 꺼내오기
  res.json({
    msg: "글 목록",
    data: data.map((x) => {
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
    user_id: req.body.community_user_id,
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
    res.status(403).send({ msg: "글작성에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "입력된 정보가 없습니다." });
    return;
  }

  res.json({ success: "글작성 성공!", url: req.url, body: req.body });
}); // 글 작성 end

// 글 수정 (add 01.24 OYT)
app.patch("/update", async function (req, res) {

  var updateParams = {
    title: req.body.community_title,
    content: req.body.community_content,
    no: req.body.community_no,
    // user_id: req.body.community_user_id,
  };

  var updateQuery = mybatisMapper.getStatement(
    "COMMUNITY",
    "COMMUNITY.UPDATE.updateArticle",
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
      .send({ msg: "content update에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "community update success" });
}); // 글 수정 end

// 글 상세 보기 (fix 02.03 OYT)
app.get("/detail/:community_no", async function (req, res) {
  var selectParams = {
    no: req.params.community_no,
  };

  var updateQuery = mybatisMapper.getStatement(
    "COMMUNITY",
    "COMMUNITY.UPDATE.hitcount",
    selectParams,
    { language: "sql", indent: "  " }
  );

  var selectQuery = mybatisMapper.getStatement(
    "COMMUNITY",
    "COMMUNITY.SELECT.Detail",
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
    res
      .status(403)
      .send({ msg: "글 정보 불러오기에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.status(403).send({ msg: "잘못된 접근입니다." });
    return;
  }

  // 글 내용 꺼내오기
  res.json({
    msg: data[0].community_no + "의 글 정보",
    data: data[0],
  });
}); // 글 상세보기 end

// 글 삭제 (add 01.24 OYT)
app.delete("/delete/:community_no", async function (req, res) {
  if (!req.params || !req.params.community_no) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var deleteParams = {
    no: req.params.community_no,
  };

  var deleteQuery = mybatisMapper.getStatement(
    "COMMUNITY",
    "COMMUNITY.DELETE.article",
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
}); // 글 삭제 end

// 커뮤니티 글 개수 add (01.26 OYT)
app.get("/listcount", async function (req, res) {
  var selectParams = {
    type: req.query.community_code,
    keyword: req.query.keyword,
  };
  var selectQuery = mybatisMapper.getStatement(
    "COMMUNITY",
    "COMMUNITY.SELECT.communitylistcount",
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

  // 글이 없는 경우
  if (data.length == 0) {
    res.json({
      result: "success",
      data: [{ list_cnt: 0 }],
    });
    return;
  }

  // 글 개수 꺼내오기
  res.json({
    result: "success",
    data: data.map((x) => {
      return x;
    }),
  });
}); // 커뮤니티 글 개수 end

// 커뮤니티 댓글 작성 add (01.25 OYT)
app.post("/comment/write", async (req, res) => {
  var insertParams = {
    user_nickName: req.body.comment_user_nickName,
    community_no: req.body.article_no,
    text: req.body.comment_text,
    user_id: req.body.comment_user_id,
  };

  let insertQuery = mybatisMapper.getStatement(
    "COMMUNITY",
    "COMMUNITY.INSERT.commentwrite",
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
}); // 커뮤니티 댓글 작성 end

// 커뮤니티 댓글 수정 add (01.25 OYT)
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
    "COMMUNITY",
    "COMMUNITY.UPDATE.COMMENTUPDATE",
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
// 커뮤니티 댓글 수정 end

// 커뮤니티 댓글 삭제 add (01.25 OYT)
app.delete("/comment/delete/:no", async (req, res) => {
  if (!req.params || !req.params.no) {
    res.status(403).send({ result: "fail" });
    return;
  }
  var deleteParams = {
    no: req.params.no,
  };

  var deleteQuery = mybatisMapper.getStatement(
    "COMMUNITY",
    "COMMUNITY.DELETE.COMMENTDELETE",
    deleteParams,
    { language: "sql", indent: "  " }
  );

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
}); // 커뮤니티 댓글 삭제 end

// 커뮤니티 댓글 전체 목록 fix (01.28 OYT)
app.get("/comment/list", async function (req, res) {
  var selectParams = {
    no: req.query.article_no,
  };
  var selectQuery = mybatisMapper.getStatement(
    "COMMUNITY",
    "COMMUNITY.SELECT.commentlist",
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
}); // 커뮤니티 댓글 전체 목록 end

module.exports = app;
