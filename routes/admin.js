const routes = require('express').Router();

const { checkUserRole } = require('../middlewares/checkUserRole');
const { verifyToken } = require('../middlewares/jwt');

routes.post('', verifyToken, checkUserRole(['admin']), adminController.addParticipant);
routes.post('/reports/instructor-impact', verifyToken, checkUserRole(['admin']), adminController.getInstructorImpact);
routes.post('/reports/department-efficiency', verifyToken, checkUserRole(['admin']), adminController.getDepartmentEfficiency);

module.exports = routes;