const Sequelize = require("sequelize");
const envType = process.env.ENV ? process.env.ENV : "dev";

// DB connection 정보
const sequelize = new Sequelize("jeans", "ssukssuk", "cjdcnsdmsqkfhwlrma", {
  host: "i6a103.p.ssafy.io",
  dialect: "mysql",
});

var init = async function (req, res, next) {
  req.envType = envType;
  req.sequelize = sequelize;

  next();
};

module.exports = init;
