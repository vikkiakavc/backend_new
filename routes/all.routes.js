const routes = require('express').Router();
// const login = require('./login');
const admin = require('./admin');
// const courses = require('./courses');
// const sessions = require('./session');
// const instructor = require('./instructor');
// const feedback = require('./feedback');

routes.use('/auth', login);
// routes.use('/participant', admin);
// routes.use('/courses', courses);
// routes.use('/sessions', sessions);
// routes.use('/instructors', instructor);
// routes.use('/feedback', feedback);
routes.use('/admin', admin);

module.exports = routes;