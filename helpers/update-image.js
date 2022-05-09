const fs = require('fs');

const User = require("../models/user.model");
const Hospital = require("../models/hospital.model");
const Doctor = require("../models/doctor.model");

const deleteImage = async (oldPath) => {
    if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
    }
}


const updateImage = async (type, id, fileName) => {

    try {
        let oldPath = '';

        switch (type) {
            case 'users':
                const user = await User.findById(id);
                if (!user) {
                    console.log('No existe el usuario');
                    return false;
                }

                oldPath = `./uploads/${type}/${user.img}`;

                deleteImage(oldPath);

                user.img = fileName;

                await user.save();

                return true;

                break;
            case 'hospitals':
                const hospital = await Hospital.findById(id);
                if (!hospital) {
                    console.log('No existe el hospital');
                    return false;
                }

                oldPath = `./uploads/${type}/${hospital.img}`;
                console.log(oldPath);
                deleteImage(oldPath);

                hospital.img = fileName;

                await hospital.save();

                return true;

                break;
            case 'doctors':
                const doctor = await Doctor.findById(id);
                if (!doctor) {
                    console.log('No existe el hospital');
                    return false;
                }

                oldPath = `./uploads/${type}/${doctor.img}`;

                deleteImage(oldPath);

                doctor.img = fileName;

                await doctor.save();

                return true;

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