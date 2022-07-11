const express = require('express');
const AuthService = require('../service/auth');

const router = express.Router();

router.post('/login', AuthService.login);
router.get('/logout', AuthService.logout);

module.exports = router;
