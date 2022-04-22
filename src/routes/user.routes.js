const express = require('express');
const UserRoutes = require('../controllers/user.controller.js');
const UserMiddlewares = require('../middlewares/user.middleware.js');
const {ensureAuthenticated} = require('../middlewares/session.middleware.js')
const router = express.Router();

router.post('/users/create', UserRoutes.createUser);
router.get('/users/get/', ensureAuthenticated, UserRoutes.getUser);
router.post('/users/update/:uid', ensureAuthenticated,UserRoutes.updateUser);


module.exports = {
  routes:router,
};