const User = require('../models/user');
const { validationResult } = require('express-validator');

const getUsers = async (req, res) => {
    const users = await User.find({}, 'name email role google img');

    res.json({
        ok: true,
        users
    });
}

const saveUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const existEmail = await User.findOne({ email });

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const user = new User(req.body);
        await user.save();

        res.json({
            ok: true,
            user
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
            err
        });

    }

}

module.exports = { getUsers, saveUser };