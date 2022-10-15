const path = require('path');
const { body } = require('express-validator');
const fs = require('fs');

const productValidator = [
    body('nombre').notEmpty().withMessage('Debes ingresar un nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe contener al menos 5 caracteres'),
    body('precio').notEmpty().withMessage('Debes ingresar un precio'),
    body('descuento').notEmpty().withMessage('Debes ingresar un descuento'),
    body('categoria').notEmpty().withMessage('Debes seleccionar una categoria'),
    body('descripcion').notEmpty().withMessage('Debes ingresar una descripcion').bail()
        .isLength({ min: 20 }).withMessage('La descripcion debe contener al menos 20 caracteres'),
    body('img').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        // let ruta = '../../public/img/' + tipo;
        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                fs.unlinkSync(path.join(__dirname, '../../public/img/', req.file.filename));
                throw new Error("Las extensiones de archivos permitidos son " + acceptedExtensions.join(", "));
            }
            return true;
        }
        return true;
    })
]

module.exports = productValidator;