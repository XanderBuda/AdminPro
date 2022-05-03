const { response } = require('express');

const Doctor = require('../models/doctor.model')

const getDoctors = async (req, res = response) => {

    try {

        const doctors = await Doctor.find()
                                    .populate('user', 'name email')
                                    .populate('hospital', 'name');

        res.json({
            ok: true,
            doctors
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los medicos',
        })
    }

    

}

const saveDoctor = async (req, res = response) => {

    const doctor = new Doctor({
        user: req.uid,
        ...req.body
    });

    try {
        const doctorDB = await doctor.save();

        res.json({
            ok: true,
            doctor: doctorDB,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar el doctor',
        })
    }

}

const updateDoctor = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'updateDoctor'
    });

}

const deleteDoctor = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteDoctor'
    });

}

module.exports = {
    getDoctors,
    saveDoctor,
    updateDoctor,
    deleteDoctor
}