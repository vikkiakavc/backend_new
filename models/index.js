'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const db = {};

const sequelize = new Sequelize("training-portal", "root", "", {
  host: "127.0.0.1",
  port: "3306",
  dialect: "mysql",
});

sequelize.authenticate().then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.log(err);
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.course = require('./course')(sequelize, DataTypes);
db.feedback = require('./feedback')(sequelize, DataTypes);
db.instructor = require('./instructor')(sequelize, DataTypes);
db.participant = require('./participant')(sequelize, DataTypes);
db.session = require('./session')(sequelize, DataTypes);
db.instructorCourses = require('./instructorCourses')(sequelize, DataTypes);
db.participantCourses = require('./participantCourses')(sequelize, DataTypes);
db.sessionParticipants = require('./sessionParticipants')(sequelize, DataTypes);


// Participant and Courses Many-to-Many
db.participant.belongsToMany(db.course, { foreignKey: "participant_id", through: db.participantCourses });
db.course.belongsToMany(db.participant, { foreignKey: "course_id", through: db.participantCourses });

// Instructor and Courses Many-to-Many
db.instructor.belongsToMany(db.course, { foreignKey: "instructor_id", through: db.instructorCourses });
db.course.belongsToMany(db.instructor, { foreignKey: "course_id", through: db.instructorCourses });

// Sessions and Participants Many-to-Many for attendance tracking
db.session.belongsToMany(db.participant, { foreignKey: "session_id", through: db.sessionParticipants });
db.participant.belongsToMany(db.session, { foreignKey: "participant_id", through: db.sessionParticipants });

db.session.belongsTo(db.course, { foreignKey: "course_id" }); // Each session belongs to one course
db.course.hasMany(db.session, { foreignKey: "course_id" }); // A course can have multiple sessions

db.session.belongsTo(db.instructor, { foreignKey: "instructor_id" }); // Each session is led by one instructor
db.instructor.hasMany(db.session, { foreignKey: "instructor_id" }); // An instructor can lead multiple sessions

db.feedback.belongsTo(db.session, { foreignKey: "session_id" }); // Each piece of feedback is for a session
db.session.hasMany(db.feedback, { foreignKey: "session_id" }); // A session can have multiple feedback entries

db.feedback.belongsTo(db.participant, { foreignKey: "participant_id" }); // Feedback is given by a participant
db.participant.hasMany(db.feedback, { foreignKey: "participant_id" }); // A participant can give multiple feedbacks


module.exports = db;
