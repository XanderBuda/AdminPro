/**
 *  Router: /api/users
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidation } = require('../middlewares/field-validator');
const { getUsers, saveUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { jwtValidation } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/', jwtValidation, getUsers);
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        fieldValidation
    ]
    ,
    saveUser
);
router.put('/:id',
    [
        jwtValidation,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        fieldValidation
    ]
    ,
    updateUser
);

router.delete('/:id',
    jwtValidation,
    deleteUser);

module.exports = router;