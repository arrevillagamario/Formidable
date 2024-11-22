// routes/usuarioRoutes.js
import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  obtenerTodosUsuarios,
} from "../Controllers/usuarioController.js";

const router = express.Router();

router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);
router.get("/", obtenerTodosUsuarios);

export default router;
