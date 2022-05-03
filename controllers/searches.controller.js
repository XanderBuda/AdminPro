const { response } = require('express');

const User = require('../models/user.model');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');

const getAll = async (req, res = response) => {

    try {
        const { search } = req.params;

        const regex = new RegExp(search, 'i');

        const [users, doctors, hospitals] = await Promise.all([
            User.find({ name: regex }),
            Doctor.find({ name: regex }),
            Hospital.find({ name: regex }),
        ]);

        if (!search) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningun parametro a buscar'
            });
        }

        res.json({
            ok: true,
            users,
            doctors,
            hospitals
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
            error
        });
    }

}

const getAllOfACollection = async (req, res = response) => {

    try {
        const { search, table } = req.params;

        const regex = new RegExp(search, 'i');

        let data = [];

        switch (table) {
            case 'users':
                data = await User.find({ name: regex })
                break;
            case 'hospitals':
                data = await Hospital.find({ name: regex })
                                    .populate('user', 'name email');
                break;
            case 'doctors':
                data = await Doctor.find({ name: regex })
                                    .populate('user', 'name email')
                                    .populate('hospital', 'name');
                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La table debe ser una de las siguientes: users, hospitals ó doctors'
                })
        }

        res.json({
            ok: true,
            results: data
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
            error
        });
    }

}

module.exports = {
    getAll,
    getAllOfACollection
}