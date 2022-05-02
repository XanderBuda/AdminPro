const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const jwtValidation = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no encontrado'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();


    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }


}

module.exports = {
    jwtValidation
}