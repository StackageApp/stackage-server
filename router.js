const router = require('express').Router();
const userController = require('./controllers');

// add routes
router.post('/users/:uid', userController.addNewUser);
router.get('/users/:uid', userController.getUserData);
router.patch('/users/:uid', userController.editUserData);

module.exports = router;