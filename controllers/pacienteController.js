//importando el modelo paciente
const Paciente = require('../models/paciente');

//funcion para traer todos los pacientes
exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//para crear nuevo paciente (incluyendo todos los campos)
exports.addPaciente = async (req, res) => {
    const { nombre, telefono, email, direccion } = req.body;
    
    const paciente = new Paciente({
        nombre,
        telefono,
        email,
        direccion
    });

    try {
        await paciente.save();
        res.status(201).json(paciente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//funcion para actualizar el paciente (incluyendo todos los campos)
exports.updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email, direccion } = req.body;

    try {
        const paciente = await Paciente.findByIdAndUpdate(
            id, 
            { nombre, telefono, email, direccion }, 
            { new: true, runValidators: true }
        );
        
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        } else {
            res.status(200).json(paciente);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//funcion para eliminar paciente
exports.deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const pacienteEliminado = await Paciente.findByIdAndDelete(id);
        if (!pacienteEliminado) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(200).json({ message: 'Paciente eliminado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};