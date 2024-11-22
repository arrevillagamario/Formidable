import express from "express";
import {
  crearProducto,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerTodosProductos,
  filtrarProductosPorCategoria,
} from "../Controllers/productoController.js";
import upload from "../Config/multerConfig.js";

const router = express.Router();

router.get("/filter/:categoria", filtrarProductosPorCategoria); // Mueve esta ruta antes de ":id"
router.get("/:id", obtenerProducto);
router.get("/", obtenerTodosProductos);
router.post("/", upload.single("imagen"), crearProducto);
router.put("/:id", upload.single("imagen"), actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;
