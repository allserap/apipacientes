const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const login = async (req, res) => {
  try {
    const { nombreUsuario, contraseña } = req.body;

    const usuario = await Usuario.findOne({ nombreUsuario });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    const esCoincidente = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!esCoincidente) {
      return res.status(400).json({
        mensaje: "Credenciales invalidas",
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol,
      },
      "claveSecreta",
      {
        expiresIn: "1h",
      },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { nombreUsuario, contraseña, rol } = req.body;
    const usuarioExistente = await Usuario.findOne({ nombreUsuario });

    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      nombreUsuario,
      contraseña: contraseñaEncriptada,
      rol,
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario regsitrado exitosamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

module.exports = { login, register };
