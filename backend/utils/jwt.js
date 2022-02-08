// jwt
const jwt = require('jsonwebtoken');
const envJson = require(`${__dirname}/../env/env.json`);

const verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, envJson.JWT_SECRET)
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(419).json({
                resultCode: 419,
                meesage: "토큰 만료"
            });
        }

        return res.status(401).json({
            resultCode: 401,
            message: "토큰이 유효하지 않습니다."
        })
    }   
}

module.exports = {verifyToken}