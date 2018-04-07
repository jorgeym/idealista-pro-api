const express = require('express');
const router = express.Router();
const secureMiddleware = require('../middleware/secure.middleware'); //duda
const sessionController = require('../controllers/session.controller');

router.post('/', sessionController.create);
router.post('/', sessionController.login);
router.delete('/', sessionController.destroy);

module.exports = router;
