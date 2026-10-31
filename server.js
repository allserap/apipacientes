const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//servidor http
const app = express();

//conf al servidor http
app.use(bodyParser.json());
app.use(cors());

//conexion bd
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado exitosamente a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

//rutas de la api
//rutas auth
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//rutas paciente
const pacienteRoutes =  require('./routes/paciente');
app.use('/api/pacientes', pacienteRoutes)

//conf puerto para backend
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
}
);