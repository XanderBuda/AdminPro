const { Router } = require('express');

const router = Router();

const { fieldValidation } = require('../middlewares/field-validator');
const { check } = require('express-validator');
const { login } = require('../controllers/login.controller');

router.post('/',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        fieldValidation
    ],
    login
);

module.exports = router;