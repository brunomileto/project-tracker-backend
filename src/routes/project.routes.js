const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../middlewares/session.middleware.js')
const ProjectRoutes = require('../controllers/project.controller.js');

router.use(ensureAuthenticated);

router.post('/projects/create', ProjectRoutes.createProject);
router.get('/projects/getAll', ProjectRoutes.getAllProjects);
router.post('/projects/update', ProjectRoutes.updateProject);
router.get('/projects/get/:projectUid', ProjectRoutes.getProject);

module.exports = {
  routes: router,
};