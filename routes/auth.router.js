const { Router } = require('express');

const router = Router();

const { fieldValidation } = require('../middlewares/field-validator');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/auth.controller');
const { jwtValidation } = require('../middlewares/jwt-validator');

router.post('/',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        fieldValidation
    ],
    login
);

router.get('/renew',
    [jwtValidation],
    renewToken
);

module.exports = router;