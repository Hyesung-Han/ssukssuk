const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async(password)=>{
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        return new Error(error);
    }
}

//암호화한 비밀번호 대조
const comparePassword = async(password,hashedPassword)=>{
    try {
        return await bcrypt.compare(password,hashedPassword);
    } catch (error) {
        console.log(error);
        return new Error(error);
    }
}

module.exports = {hashPassword,comparePassword}