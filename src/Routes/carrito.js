// routes/carritoRoutes.js
import express from "express";
import {
  obtenerCarrito,
  agregarProducto,
  actualizarCantidadProducto,
  eliminarProducto,
  vaciarCarrito,
} from "../Controllers/carritoController.js";

const router = express.Router();

router.get("/:id_usuario", obtenerCarrito); // Obtener el carrito de un usuario
router.post("/agregar", agregarProducto); // Agregar un producto al carrito
router.put("/actualizar", actualizarCantidadProducto); // Actualizar la cantidad de un producto en el carrito
router.delete("/eliminar", eliminarProducto); // Eliminar un producto del carrito
router.delete("/:id_usuario/vaciar", vaciarCarrito); // Vaciar el carrito de un usuario

export default router;
