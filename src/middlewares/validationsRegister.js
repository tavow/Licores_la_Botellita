const path = require('path');
const { body } = require('express-validator');
const fs = require('fs');

const validationsRegister = [
    body('nombre').notEmpty().withMessage('Debes ingresar un nombre').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe contener al menos 2 caracteres'),
    body('apellido').notEmpty().withMessage('Debes ingresar un apellido').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe contener al menos 2 caracteres'),
    body('correo').notEmpty().withMessage('Debes ingresar un correo').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres'),
        // .isUppercase().withMessage('Debe contener una Mayúscula').isAlphanumeric().withMessage('Debe contener al menos un número'),
    body('re_password').notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres'),
    body('telefono').notEmpty().withMessage('Debes ingresar un telefono'),
    // .isUppercase().withMessage('Debe contener una Mayúscula').isAlphanumeric().withMessage('Debe contener al menos un número'),
    body('img').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

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

module.exports = validationsRegister;