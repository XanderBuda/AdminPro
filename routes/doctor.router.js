/**
 *  Hospitals
 *  Router: /api/doctors
 */
const { Router } = require('express');

const { getDoctors, saveDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor.controller');

const router = Router();

router.get('/',
    getDoctors
);

router.post('/',
    saveDoctor
);

router.put('/:id',
    updateDoctor

);

router.delete('/:id',
    deleteDoctor
);


module.exports = router;