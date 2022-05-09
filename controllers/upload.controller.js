const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { response } = require("express");

const { updateImage } = require('../helpers/update-image');


const fileUpload = async (req, res = response) => {
    const { type, id } = req.params;

    const validTypes = ['users', 'hospitals', 'doctors'];

    // Validar tipo
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo es invalido, tiene que ser uno de los siguentes: users, hospitals ó doctors',
        })
    }

    // Validar de que existe una archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha seleccionado ningun archivo',
        });
    }

    // Procesar imagen...
    const file = req.files.image;

    const fileParts = file.name.split('.');
    const fileExt = fileParts[fileParts.length - 1];

    // Validar extensión del archivo
    const validExtension = ['png', 'jpg', 'jpeg', 'gif'];

    if (!validExtension.includes(fileExt)) {
        return res.status(400).json({
            ok: false,
            msg: 'La extensión del archivo es invalida, tiene que ser una de las siguientes: png, jpg, jpeg, gif',
        });
    }

    // Generar nombre del archivo
    const fileName = `${uuidv4()}.${fileExt}`;

    // Mover archivo
    const path = `./uploads/${type}/${fileName}`;

    await updateImage(type, id, fileName);

    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo',
            })
        }

        res.json({
            ok: true,
            message: "Archivo subido correctamente"
        });
    })


}

const getImage = async (req, res = response) => {
    try {
        const { type, img } = req.params;

        const validTypes = ['users', 'hospitals', 'doctors'];

        // Validar tipo
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                ok: false,
                msg: 'El tipo es invalido, tiene que ser uno de los siguentes: users, hospitals ó doctors',
            })
        }

        const imgPath = path.join(__dirname, `../uploads/${type}/${img}`);

        if (fs.existsSync(imgPath)) {
            res.sendFile(imgPath);
        } else {
            res.sendFile(path.join(__dirname, `../uploads/no-image.jpg`));
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener la imagen',
        })
    }

}

module.exports = {
    fileUpload,
    getImage
}