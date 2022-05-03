const { response } = require('express');

const Hospital = require('../models/hospital.model');

const getHospitals = async (req, res = response) => {

    try {

        const hospitals = await Hospital.find()
                                        .populate('user', 'name email');

        res.json({
            ok: true,
            hospitals
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los hospitales',
        })
    }


}


const saveHospital = async (req, res = response) => {

    const hospital = new Hospital({
        user: req.uid,
        ...req.body
    });

    try {
        const hospitalDB = await Hospital.findOne({ name: hospital.name });

        if (hospitalDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un hospital con ese nombre'
            });
        }

        await hospital.save();

        res.json({
            ok: true,
            hospital
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
        })
    }



}

const updateHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'updateHospital'
    });

}

const deleteHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteHospital'
    });

}

module.exports = {
    getHospitals,
    saveHospital,
    updateHospital,
    deleteHospital
}