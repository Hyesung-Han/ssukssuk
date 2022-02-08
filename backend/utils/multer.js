const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const path = require("path");
aws.config.loadFromPath(`${__dirname}/../env/env.json`);
const s3 = new aws.S3();
const fileFilter = (req, file, cb) => {
  // 확장자 필터링
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // 해당 mimetype만 받겠다는 의미
  } else {
    // 다른 mimetype은 저장되지 않음
    req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
    cb(null, false);
  }
};

const upload = multer({
  storage: multerS3({
    //폴더위치 지정
    s3: s3,
    bucket: "ssukimg",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 1000).toString() +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
        );
    },
    contentType: function (req, file, cb) {
      cb(null,file.mimetype);
    },
  }),
  fileFilter : fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = { upload };
