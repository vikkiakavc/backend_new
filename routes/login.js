const routes = require('express').Router();
const loginController = require('../controllers/login');

routes.post('/login', loginController.login);

module.exports = routes;