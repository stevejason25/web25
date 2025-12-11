const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const spdy = require('spdy');
const fs = require('fs');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// --- TUS RUTAS ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));

const PORT = process.env.PORT || 3000;

// Configuración de Certificados (Igual que antes)
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

// 2. Creamos el servidor usando SPDY (HTTP/2)
spdy.createServer(options, app).listen(PORT, (error) => {
    if (error) {
        console.error(error);
        return process.exit(1);
    } else {
        console.log(`🚀 Servidor HTTP/2 seguro corriendo en el puerto ${PORT}`);
        console.log(`🍃 MongoDB conectado`);
    }
});