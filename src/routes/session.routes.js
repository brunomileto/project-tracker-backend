const express = require('express');
const SessionRoutes = require('../controllers/session.controller.js');
//const UserMiddlewares = require('../middlewares/session.middleware.js');
const router = express.Router();

router.post('/authenticate', SessionRoutes.authenticate);

module.exports = {
  routes:router,
};