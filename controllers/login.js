const db = require("../models");
const jwt = require('jsonwebtoken');
const secretKey = 'my-secret-key';
const expiresIn = 1000000;
const { resNotFound } = require("../utility/response");

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) return res.status(201).json({ "message": "Please enter all the fields correctly!" });
        let user;
        let checkParticipant;
        let checkInstructor = await db.instructor.findOne({ where: { email } });
        if (!checkInstructor) {
            checkParticipant = await db.participant.findOne({ where: { email } });
            if (!checkParticipant) return resNotFound(res, "User Not Found!");
            user = checkParticipant;
        } else {
            user = checkInstructor;
        }
        if (!checkInstructor) {
            user.role = 'participant';
        } else if (checkInstructor?.isAdmin === true) {
            user.role = 'admin';
        } else if (checkInstructor?.isAdmin !== true) {
            user.role = 'instructor'
        }
        if (user.password !== password) return res.status(201).json({ "message": "Incorrect Password!" });
        const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: expiresIn });
        return res.status(200).json({ "token": token, "user": { userId: user.id, role: user.role }, "expiresOn": `${expiresIn / 1000} Seconds` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong!" });
    }
};

module.exports = { login };