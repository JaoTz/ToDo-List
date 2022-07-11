const express = require('express');
const UserService = require('../service/user');
const { checkAuth } = require('../middleware/checkAuth');
const router = express.Router();
router.use(checkAuth);
router.get('/:username', UserService.getByUsername);
router.post('/', UserService.create);

module.exports = router;
