const jwt = require('jsonwebtoken');
const secret = "shhhhhhhhhhhhhh";

const generateToken = (payload) => {
    const token = jwt.sign(payload, secret);
    return token;
}

const verifyToken = (token) => {
    const data = jwt.verify(token, secret);
    return data;
}

module.exports = {generateToken, verifyToken}