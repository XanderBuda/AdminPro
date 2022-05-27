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

const updateDoctor = async (req, res = response) => {

    try {
        const id = req.params.id;
        const uid = req.uid;


        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor no encontrado por el ID'
            })
        }

        const updatedDoctor = {
            ...req.body,
            user: uid
        }

        const doctorUpdated = await Doctor.findByIdAndUpdate(id, updatedDoctor, { new: true });

        res.json({
            ok: true,
            doctor: doctorUpdated
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el doctor',
        })

    }

}

const deleteDoctor = async (req, res = response) => {

    try {
        const id = req.params.id;

        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor no encontrado por el ID'
            })
        }

        await Doctor.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Se ha borrado el doctor'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el doctor',
        })

    }

}

module.exports = {
    getDoctors,
    saveDoctor,
    updateDoctor,
    deleteDoctor
}