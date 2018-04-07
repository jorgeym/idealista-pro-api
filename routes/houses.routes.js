const express = require('express');
const router = express.Router();
const uploadConfig = require('../configs/multer.config');
const housesController = require('../controllers/houses.controller');
const housesMiddleware = require('../middleware/houses.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', /*secureMiddleware.isAuthenticated,*/ housesController.list);
router.get('/:id', /*secureMiddleware.isAuthenticated,*/ housesMiddleware.checkValidId, housesController.get);
router.post('/', /*secureMiddleware.isAuthenticated,*/ uploadConfig.single('image'), housesController.create);
router.put('/:id', /*secureMiddleware.isAuthenticated,*/ uploadConfig.single('image'), housesController.edit);
router.delete('/:id', /*secureMiddleware.isAuthenticated,*/ housesMiddleware.checkValidId, housesController.delete);

module.exports = router;
