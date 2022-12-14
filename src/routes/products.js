const express = require('express');
const router = express.Router();
const productsController = require("../controllers/productsController.js")
const upload = require('../middlewares/multer');

// La Botellita
router.get('/', productsController.leer);
router.get('/listar', productsController.listar);

router.get('/ron', productsController.ron);
router.get('/vinos', productsController.vino);
router.get('/whisky', productsController.whisky);
router.get('/tequila', productsController.tequila);
router.get('/coctel', productsController.coctel);
router.get('/crear', productsController.crear); 
router.get('/:idProducto', productsController.detalle);

router.post('/', upload.any(), productsController.store); 

router.get('/edit/:id', productsController.edit); 
router.patch('/edit/:id', upload.any(),productsController.update); 

router.post('/delete/:id',productsController.destroy);

module.exports = router;