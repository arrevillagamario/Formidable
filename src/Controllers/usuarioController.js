// controllers/usuarioController.js
import * as usuarioModel from "../Models/usuarioModel.js";

// Controlador para registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await usuarioModel.registrarUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

// Controlador para el login de usuario
export const loginUsuario = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await usuarioModel.loginUsuario(correo, password);
    res.json(usuario);
  } catch (error) {
    res.status(401).json({ error: "Credenciales incorrectas" });
  }
};

export const obtenerTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.obtenerTodosUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};
