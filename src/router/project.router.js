const express = require('express');
const ProjectService = require('../service/project');

const router = express.Router();

router.get('/:id', ProjectService.getById);
router.get('/', ProjectService.getAll);
router.post('/', ProjectService.create);
router.patch('/:id', ProjectService.updateById);
router.delete('/:id', ProjectService.deleteById);

module.exports = router;
