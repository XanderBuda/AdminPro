require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear servidor de express
const app = express();

// Configurar cors
app.use(cors());

// Base de datos
dbConnection();

app.use('/', (req, res) => {
    res.json({ ok: true, message: 'Hello World' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
