/**
 *  Hospitals
 *  Router: /api/doctors
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { getDoctors, saveDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor.controller');
const { jwtValidation } = require('../middlewares/jwt-validator');
const { fieldValidation } = require('../middlewares/field-validator');

const router = Router();

router.get('/',
    getDoctors
);

router.post(
    '/',
    [
        jwtValidation,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital debe ser un id').isMongoId(),
        fieldValidation
    ],
    saveDoctor
);

router.put('/:id',
    [
        jwtValidation,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital debe ser un id').isMongoId(),
        fieldValidation
    ],
    updateDoctor

);

router.delete('/:id',
    [
        jwtValidation,
    ],
    deleteDoctor
);


module.exports = router;