/**
 *  Hospitals
 *  Router: /api/hospitals
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { jwtValidation } = require('../middlewares/jwt-validator');
const { fieldValidation } = require('../middlewares/field-validator')
const { getHospitals, saveHospital, updateHospital, deleteHospital } = require('../controllers/hospital.controller');

const router = Router();

router.get('/',
    getHospitals
);

router.post('/',
    [
        jwtValidation,
        check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
        fieldValidation
    ],
    saveHospital
);

router.put('/:id',
    [
        jwtValidation,
        check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
        fieldValidation
    ],
    updateHospital
);

router.delete('/:id',
    [
        jwtValidation,
    ],
    deleteHospital
);


module.exports = router;