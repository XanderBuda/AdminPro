const { response } = require('express');

const getDoctors = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getDoctors'
    });
    
}

const saveDoctor = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'saveDoctor'
    });
    
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