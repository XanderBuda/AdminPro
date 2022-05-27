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

const updateHospital = async (req, res = response) => {

    try {
        const id = req.params.id;
        const uid = req.uid;

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por el ID',
            });
        }

        const hospitalUpdate = {
            ...req.body,
            user: uid
        };

        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, hospitalUpdate, { new: true });

        res.json({
            ok: true,
            hospital: hospitalUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
        })

    }


}

const deleteHospital = async (req, res = response) => {
    try {
        const id = req.params.id;

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por el ID',
            });
        }

       await Hospital.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
        })

    }




}

module.exports = {
    getHospitals,
    saveHospital,
    updateHospital,
    deleteHospital
}