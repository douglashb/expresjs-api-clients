const { Router } = require('express');
const UserController = require('../controllers/user-controller');
const UserPostRequest = require('../requests/user-post-request');

const router = Router();

router.post('/users', ...UserPostRequest, UserController.create);
router.get('/users', UserController.show);
router.post('/users/login', UserController.login);

module.exports = router;
