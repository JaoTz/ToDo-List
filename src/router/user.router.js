const express = require('express');
const UserService = require('../service/user');

const router = express.Router();

router.get('/:username', UserService.getByUsername);
router.post('/', UserService.create);

module.exports = router;
