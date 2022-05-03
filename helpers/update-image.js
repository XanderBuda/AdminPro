const fs = require('fs');

const User = require("../models/user.model");
const Hospital = require("../models/hospital.model");
const Doctor = require("../models/doctor.model");


const updateImage = async (type, id, fileName) => {

    try {

        switch (type) {
            case 'users':
                const user = await User.findById(id);
                if (!user) {
                    console.log('No existe el usuario');
                    return false;
                }

                const oldPath = `./uploads/${type}/${user.img}`;
                console.log(oldPath);

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }

                user.img = fileName;

                await user.save();
                return true;

                break;
            case 'hospital':
                const hospital = await Hospital.findById(id);
                break;
            case 'doctors':
                const doctor = await Doctor.findById(id);
                break;
        }


    } catch (e) {
        console.log(e);
        return false;
    }



}

module.exports = {
    updateImage
}