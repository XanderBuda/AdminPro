const { response } = require('express');

const Hospital = require('../models/hospital.model');

const getHospitals = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getHospitals'
    });

}


const saveHospital = async (req, res = response) => {

    const hospital = new Hospital({
        user: req.uid,
        ...req.body
    });

    try {

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