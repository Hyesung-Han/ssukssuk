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
    no: req.body.notice_no,
    title: req.body.notice_title,
    author: req.body.notice_author,
    date: req.body.notice_date,
    content: req.body.notice_content,
    hit: req.body.notice_hit,
    code: req.body.notice_code,
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
app.patch("/updatenotice", async (req, res) => {
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
