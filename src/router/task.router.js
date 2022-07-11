const express = require('express');
const TaskService = require('../service/task');

const router = express.Router();

router.get('/:id', TaskService.getById);
router.get('/', TaskService.getAll);
router.post('/', TaskService.create);
router.patch('/:id', TaskService.updateById);
router.delete('/:id', TaskService.deleteById);

module.exports = router;
