const express = require('express');
const router = express.Router();

const todoController = require('../controller/todoController');

router.post('/', todoController.create);
router.get('/', todoController.read);
router.put('/', todoController.update);
router.delete('/', todoController.delete);

module.exports = router;