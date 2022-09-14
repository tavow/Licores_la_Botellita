const express = require('express');
const router = express.Router();
const mainController = require("../controllers/mainController.js");

router.get('/', mainController.index);
router.get('/servicios', mainController.servicio);
router.get('/recetas', mainController.receta);
router.get('/recetas/:idReceta', mainController.edit);

module.exports = router;