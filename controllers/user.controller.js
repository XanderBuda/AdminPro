const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res = response) => {

    try {

        const start = Number(req.query.start) || 0;
        const limit = Number(req.query.limit) || 5;

        const [users, total] = await Promise.all([
            User.find({}, 'name email role google img')
                .skip(start)
                .limit(limit),
            User.countDocuments()
        ]);


        res.json({
            ok: true,
            users,
            uid: req.uid,
            total
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los usuarios',
        })
    }

}

const saveUser = async (req, res = response) => {
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

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generar TOKEN - JWT
        const token = await generateJWT(user.id);


        res.json({
            ok: true,
            user,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
            err
        });

    }
}

const updateUser = async (req, res = response) => {
    try {

        // TODO: Validar token y comprobar si el usuario es correcto

        const uid = req.params.id

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro ningun usuario con ese id'
            });
        }
        const { google, password, email, ...fields } = req.body;

        if (userDB.email !== email) {
            const existEmail = await User.findOne({ email: req.body.email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya esta registrado'
                });
            }
        }
        fields.email = email;
        const userUpdated = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            userUpdated
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
            err
        });
    }

}

const deleteUser = async (req, res = response) => {
    try {
        const uid = req.params.id;
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro ningun usuario con ese id'
            })
        }

        await User.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado',
        })


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
            err
        });
    }
}

module.exports = { getUsers, saveUser, updateUser, deleteUser };