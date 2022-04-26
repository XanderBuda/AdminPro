const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database is connected');

    } catch (e) {
        console.log(e);
        throw new Error('Error connecting to database');
    }
}

module.exports = {
    dbConnection
}