const express = require("express");
const { route } = require("../app");
const PersonController = require('../controllers/User');
const router = express.Router();

router.get('/', PersonController.findAll);
router.get('/:id', PersonController.findOne);
router.post('/', PersonController.create);
router.patch('/:id', PersonController.update);
router.delete('/:id', PersonController.destroy);

module.exports = router;