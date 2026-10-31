const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        required: true
    },
    telefono: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    direccion: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Paciente', pacienteSchema);