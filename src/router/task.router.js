const express = require('express');
const { checkAuth } = require('../middleware/checkAuth');
const router = express.Router();
router.use(checkAuth);

router.get('/:id', TaskService.getById);
router.get('/', TaskService.getAll);
router.post('/', TaskService.create);
router.patch('/:id', TaskService.updateById);
router.delete('/:id', TaskService.deleteById);

module.exports = router;
