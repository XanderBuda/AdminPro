require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear servidor de express
const app = express();

// Configurar cors
app.use(cors());

// Configurar express para leer datos en formato json desde el body
app.use(express.json());

// Base de datos
dbConnection();

// Carpetas publicas
app.use(express.static('public'));

// Rutas
app.use('/api/users', require('./routes/user.router'));
app.use('/api/hospitals', require('./routes/hospital.router'));
app.use('/api/doctors', require('./routes/doctor.router'));
app.use('/api/all', require('./routes/searches.router'));
app.use('/api/uploads', require('./routes/upload.router'));
app.use('/api/auth', require('./routes/auth.router'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
