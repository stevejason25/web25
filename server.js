const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
// Importamos las librerías para seguridad y archivos
const https = require('https');
const fs = require('fs');

dotenv.config();

// Conectar a la Base de Datos
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// --- TUS RUTAS ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));

const PORT = process.env.PORT || 3000;

// Configuración de los certificados que acabas de crear
const httpsOptions = {
    key: fs.readFileSync('server.key'),  // La llave privada
    cert: fs.readFileSync('server.cert') // El certificado público
};

// Arrancar el servidor en modo HTTPS
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`🔒 Servidor HTTPS seguro corriendo en el puerto ${PORT}`);
    console.log(`🍃 MongoDB conectado`);
});