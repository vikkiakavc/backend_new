const jwt = require('jsonwebtoken');
const db = require("../models");
const secretKey = 'my-secret-key';
const { resNotFound, resErrorOccured } = require('../utility/response');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return resNotFound(res, "Please Provide the token!");
        jwt.verify(token, secretKey, async (err, user) => {
            if (err) return resErrorOccured(res, err);
            let userPayload = jwt.decode(token);
            let userData;
            if (userPayload.role === 'admin' || userPayload.role === 'instructor') {
                userData = await db.instructor.findOne({ where: { email: userPayload.email } });
            } else {
                userData = await db.participant.findOne({ where: { email: userPayload.email } });
            }
            if (userPayload.email === userData.email) {
                req.user = userPayload;
                next();
            }
            else return res.status(401).json({ statusCode: 401, statusMessage: "You don't have access to this API!", error: "invalid-access" });
        });
    } catch (error) {
        return resErrorOccured(res, "Invalid Token");
    }
};

module.exports = { verifyToken };