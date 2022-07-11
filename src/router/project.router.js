const express = require('express');
const { checkAuth } = require('../middleware/checkAuth');
const router = express.Router();
router.use(checkAuth);

router.get('/:id', ProjectService.getById);
router.get('/', ProjectService.getAll);
router.post('/', ProjectService.create);
router.patch('/:id', ProjectService.updateById);
router.delete('/:id', ProjectService.deleteById);

module.exports = router;
