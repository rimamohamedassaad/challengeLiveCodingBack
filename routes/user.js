const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.get('/', controller.getAll)
router.post('/login', controller.logIn)
router.post('/signup', controller.signup)

module.exports = router;