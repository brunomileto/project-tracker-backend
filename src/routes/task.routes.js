const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../middlewares/session.middleware.js')
const TaskRoutes = require('../controllers/task.controller.js');

router.use(ensureAuthenticated);

router.post('/tasks/create/:projectUid', TaskRoutes.createTask);
router.post('/tasks/update/:taskUid', TaskRoutes.updateTask);
router.get('/tasks/getAll/:projectUid', TaskRoutes.getAllTasks);
router.get('/tasks/get/:taskUid', TaskRoutes.getTask);

module.exports = {
  routes: router,
};