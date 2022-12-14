const { body } = require("express-validator");

const validationsLogin = [
    body('correo').notEmpty().withMessage('Ingresa tu usuario').bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('password').notEmpty().withMessage('Ingresa tu contraseña'),
]

module.exports = validationsLogin;