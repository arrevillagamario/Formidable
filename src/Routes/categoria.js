// routes/categoriaRoutes.js
import express from "express";
import {
  crearCategoria,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
  obtenerTodasCategorias,
  obtenerProductosPorCategoria,
} from "../Controllers/categoriaController.js";

const router = express.Router();

router.post("/", crearCategoria); // Crear una nueva categoría
router.get("/:id", obtenerCategoria); // Obtener una categoría por su ID
router.put("/:id", actualizarCategoria); // Actualizar una categoría
router.delete("/:id", eliminarCategoria); // Eliminar una categoría
router.get("/", obtenerTodasCategorias);
router.get("/:id/productos", obtenerProductosPorCategoria);
// Obtener todas las categorías

export default router;
