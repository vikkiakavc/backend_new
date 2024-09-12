const db = require("../models");
const { Op, fn, col } = require('sequelize');
const { resAlreadyExists, resServerError } = require("../utility/response");

const addParticipant = async (req, res) => {
    try {
        let { body } = req;
        const existingParticipant = await db.participant.count({
            where: {
                email: body.email,
            }
        });
        if (existingParticipant > 0) {
            return resAlreadyExists(res, "Participant Already Exists");
        }
        let participant = await db.participant.create(body);
        return res.status(200).json({ "participantId": participant.id, "message": "participant Created Successfully" });
    } catch (error) {
        return resServerError(res, error);
    }
};