const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nombreUsuario: {type: String, require: true, unique: true},
    contraseña: {type: String, require: true},
    rol: {type: String, require: true} //admin o user
});

//middleware para ejecutar contra antes de guardarla
/*UsuarioSchema.pre('save', async function (next) {
    if(!this.isModified('contraseña')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
});*/

module.exports = mongoose.model('Usuario', UsuarioSchema);