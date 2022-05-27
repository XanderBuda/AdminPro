const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');


const login = async (req, res = response) => {
    try {

        const { email, password } = req.body;
        // Validar correo
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Login incorrecto',
            });
        }

        // Validar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(403).json({
                ok: false,
                msg: 'Contraseña incorrecta',
            });
        }

        // Crear TOKEN - JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            msg: 'Login correcto',
            token
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
        })
    }

}

const renewToken = async (req, res = response) => {

    try {
        const uid = req.uid;

        const token = await generateJWT(uid);

        res.json({
            ok: true,
            msg: 'Token renovado',
            token
        })

    } catch (err) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido',
        })

    }



}


module.exports = {
    login,
    renewToken
};