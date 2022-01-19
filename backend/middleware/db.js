const path = require("path");
const Sequelize = require("sequelize");
const mybatisMapper = require("mybatis-mapper");
const envType = process.env.ENV ? process.env.ENV : "dev";
const version = process.env.VERSION ? process.env.VERSION : "base";
// DB connection 정보
const sequelize = new Sequelize("jeans", "sowon", "sowonwow1@", {
  host: "127.0.0.1",
  dialect: "mysql",
});
const sqlPath = path.join(__dirname, "..", ".", `/sql/${version}/`);

mybatisMapper.createMapper([`${sqlPath}/base.xml`]);

var init = async function (req, res, next) {
  req.envType = envType;
  req.sequelize = sequelize;
  req.mybatisMapper = mybatisMapper;

  next();
};

module.exports = init;
