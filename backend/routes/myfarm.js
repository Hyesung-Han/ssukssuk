var express = require("express");
var fs = require("fs");
var { hashPassword, comparePassword } = require("../utils/bcrypt");
const jwt = require("jsonwebtoken");
const envJson = require(`${__dirname}/../env/env.json`);
const { verifyToken } = require("../utils/jwt");
const { upload} = require("../utils/multer");
const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: envJson.accessKeyId,   // user 만들면서 지급받은 키값
  secretAccessKey: envJson.secretAccessKey,
  region: 'ap-northeast-2'
})

const uploadFilePath = envJson.uploadFilePath;

// DB 연동
const path = require("path");
const mybatisMapper = require("mybatis-mapper");
// const version = process.env.VERSION ? process.env.VERSION : "base";
const sqlPath = path.join(__dirname, "..", ".", `/sql/`);

var imgPath = "https://ssukimg.s3.ap-northeast-2.amazonaws.com/img/";

// mapper 설정
mybatisMapper.createMapper([`${sqlPath}/myfarm.xml`]);

var app = express.Router();

// 내 농장 상세보기 add (02.03 hhs)
app.get("/detail", async (req, res) => {
  if (!req.query || !req.query.id) {
    res.status(403).send({ msg: "잘못된 파라미터입니다." });
    return;
  }

  var selectParams = {
    id: req.query.id,
    no: req.query.no,
  };

  var selectQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.SELECT.myfarmdetail",
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
    res.status(403).send({ result: "fail" });
    return;
  }

  res.json({
    result: "success",
    data: data.map((x) => {
      return x;
    }),
  });
}); // 내 농장 상세보기 end

// 내 농장 전체 목록 add (02.03 hhs)
app.get("/list", async function (req, res) {
  var selectParams = {
    keyword: req.query.keyword,
    id: req.query.id,
  };
  var selectQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.SELECT.myfarmlist",
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
  // 농장이 없는 경우
  if (data.length == 0) {
    res.json({
      result: "success",
      data: {
        list_cnt: 0,
      },
    });
    return;
  }

  // 농장 목록 꺼내오기
  res.json({
    result: "success",
    data: data.map((x) => {
      return x;
    }),
  });
}); // 내 농장 전체 목록 end

// 내 농장 정보 수정 add (02.03 hhs)
app.patch("/update", async (req, res) => {
  if (!req.body) {
    res.status(403).send({ result: "fail" });
    return;
  }
  var updateParams = {
    no: req.body.farm_no,
    name: req.body.farm_name,
    text: req.body.farm_text,
  };

  var updateQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.UPDATE.myfarmupdate",
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
// 내 농장 정보 수정 end

// 내 농장 정보 삭제 add (02.03 hhs)
app.delete("/delete/:no", async (req, res) => {
  if (!req.params || !req.params.no) {
    res.status(403).send({ result: "fail" });
    return;
  }
  var deleteParams = {
    no: req.params.no,
  };

  var deleteQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.DELETE.myfarmdelete",
    deleteParams,
    { language: "sql", indent: "  " }
  );

  let data = [];
  try {
    data = await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE,
    });
    console.log("myfarm-delete success");
  } catch (error) {
    res.status(403).send({ result: "fail", error: error });
    return;
  }
  return res.json({ result: "success" });
}); // 내 농장 정보 삭제 end

// 내 농장 이미지 업로드  fix (02.06 OYT)
app.post("/upload", upload.single("farm"), async (req, res) => {
  if (!req.body || !req.body.farm_no) {
    res.status(403).send({ result: "fail" });
    return;
  }

  // 기존 이미지 있는지 확인
  // 있다면 file_name 받아오기
  var selectParams = {
    farm_no: req.body.farm_no,
  };

  var selectQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.SELECT.image",
    selectParams,
    { language: "sql", indent: " " }
  );
  let imgChk = [];
  try {
    imgChk = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: imgChk", imgChk);
  } catch (error) {
    res.status(403).send({ result: "fail", error: error });
    return;
  }

  if (imgChk.length != 0) {
    s3.deleteObject({
      Bucket : 'ssukimg',
      Key: imgChk[0].file_name,
    }, function(err, data){
      if(err) console.log(err);
      else console.log(data);
    });

    var deleteParams = {
      farm_no: req.body.farm_no,
    };

    var deleteQuery = mybatisMapper.getStatement(
      "MYFARM",
      "MYFARM.DELETE.image",
      deleteParams,
      { language: "sql", indent: "  " }
    );

    let deleteData = [];
    try {
      deleteData = await req.sequelize.query(deleteQuery, {
        type: req.sequelize.QueryTypes.DELETE,
      });
      console.log("myfarm-image-delete success");
    } catch (error) {
      res.status(403).send({ result: "fail", error: error });
      return;
    }
  }

  const imgfile = req.file;

  var insertParams = {
    farm_no: req.body.farm_no,
    file_name: imgfile.key,
    file_path: (uploadFilePath + imgfile.key),
    file_type: imgfile.mimetype,
    file_size: imgfile.size,
  };

  let insertQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.INSERT.image",
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
    path: insertParams.file_path,
  });
}); // 내 농장 이미지 업로드 end

// 내 농장 이미지 삭제 add (02.06 OYT)
app.delete("/upload", async (req, res) => {
  if (!req.body || !req.body.farm_no) {
    res.status(403).send({ result: "fail1" });
    return;
  }

  // 기존 이미지 있는지 확인
  // 있다면 file_name 받아오기
  var selectParams = {
    farm_no: req.body.farm_no,
  };

  var selectQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.SELECT.image",
    selectParams,
    { language: "sql", indent: " " }
  );
  let imgChk = [];
  try {
    imgChk = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT,
    });
    console.log("TCL: imgChk", imgChk);
  } catch (error) {
    res.status(403).send({ result: "fail2", error: error });
    return;
  }

  if (imgChk.length != 0) {
    s3.deleteObject({
      Bucket : 'ssukimg',
      Key: imgChk[0].file_name,
    }, function(err, data){
      if(err) console.log(err);
      else console.log(data);
    });

    var deleteParams = {
      farm_no: req.body.farm_no,
    };

    var deleteQuery = mybatisMapper.getStatement(
      "MYFARM",
      "MYFARM.DELETE.image",
      deleteParams,
      { language: "sql", indent: "  " }
    );

    let deleteData = [];
    try {
      deleteData = await req.sequelize.query(deleteQuery, {
        type: req.sequelize.QueryTypes.DELETE,
      });
      console.log("myfarm-image-delete success");
    } catch (error) {
      res.status(403).send({ result: "fail3", error: error });
      return;
    }
    res.json({
      result: "success",
    });
  }
}); // 내 농장 이미지 삭제 end

// 내 농장 라이브 이미지 add(02.10 OYT)
app.post("/live",  async (req, res) => {
  if (!req.body || !req.body.farm_no) {
    res.status(403).send({ result: "fail" });
    return;
  }

  var insertParams = {
    farm_no: req.body.farm_no,
  };

  let insertQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.INSERT.live",
    insertParams,
    { language: "sql", indent: "  " }
  );
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

  var selectParams = {
    farm_no: req.body.farm_no,
  };

  var selectQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.SELECT.live",
    selectParams,
    { language: "sql", indent: " " }
  );
  let live = [];
  let cnt = 0;
  try {
    while(cnt < 10){
      live = await req.sequelize.query(selectQuery, {
        type: req.sequelize.QueryTypes.SELECT,
      });
      if(live[0].file_name != null) break;
      else {
        cnt++;
        await sleep(500);
      }
    }
    console.log("TCL: live", live);
  } catch (error) {
    res.json({status: 403, result: "fail", error: error });
    return;
  }

  if (live.length == 0) {
    res.json({status: 403, result: "fail"});
    return;
  }
  res.json({
    result: "success",
  });
}); // 내 농장 라이브 이미지 end

// 내 농장 live 이미지 삭제 add (02.10 OYT)
app.delete("/live", async (req, res) => {
  if (!req.body || !req.body.farm_no) {
    res.status(403).send({ result: "fail1" });
    return;
  }

  var deleteParams = {
    farm_no: req.body.farm_no,
  };

  var deleteQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.DELETE.live",
    deleteParams,
    { language: "sql", indent: "  " }
  );

  let deleteData = [];
  try {
    deleteData = await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE,
    });
    console.log("live-image-delete success");
  } catch (error) {
    res.status(403).send({ result: "fail3", error: error });
    return;
  }
  res.json({
    result: "success",
  });
  
}); // 내 농장 live 이미지 삭제 end

// 내 농장 기기 신청(add 02.14  OYT)
app.post("/device", async(req,res) =>{
  if(!req.body || !req.body.user_id){
    res.status(403).send({result : "fail", error:err});
    return;
  }

  var insertParams = {
    user_id: req.body.user_id,
    user_name: req.body.user_name,
    user_address: req.body.user_address,
    user_phone: req.body.user_phone
  }

  var selectParams = {
    user_id: req.body.user_id,
  }

  let selectQuery = mybatisMapper.getStatement(
    "MYFARM",
    "MYFARM.SELECT.device",
    selectParams,
    { language: "sql", indent: "  " }
  );
  let list = [];
  try {
    list = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.INSERT,
    });
    console.log("TCL: data", data);
  } catch (error) {
    res.status(403).send({ result: "fail", error: error });
    return;
  }

  if (list.length == 0) {
    let insertQuery = mybatisMapper.getStatement(
      "MYFARM",
      "MYFARM.INSERT.device",
      insertParams,
      { language: "sql", indent: "  " }
    );
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
    res.json({result : "success", url: req.url, body: req.body });
  }else{
    res.json({result : "fail", url: req.url, body: req.body });
  }
});

// 내 농장 기기신청 end

// sleep
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

module.exports = app;
