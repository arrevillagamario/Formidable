import express from "express";
import {
  crearNuevoPedido,
  obtenerPedido,
  listarTodosLosPedidos,
  listarPedidosDeUsuario,
  actualizarPedidoController,
  eliminarPedidoController,
  cambiarEstado,
  listarPedidosPendientesController,
} from "../Controllers/pedidoController.js";

const router = express.Router();

// Crear un nuevo pedido
router.post("/", crearNuevoPedido);

// Obtener un pedido por ID
router.get("/:id", obtenerPedido);

// Listar todos los pedidos
router.get("/", listarTodosLosPedidos);

// Listar pedidos por ID de usuario
router.get("/usuario/:idUsuario", listarPedidosDeUsuario); // Nueva ruta

// Actualizar un pedido
router.put("/:id", actualizarPedidoController);

// Eliminar un pedido
router.delete("/:id", eliminarPedidoController);

// Cambiar el estado de un pedido
router.patch("/:id/estado", cambiarEstado);

//Listar por estado pendiente
router.get("/estado/pendiente", listarPedidosPendientesController);

export default router;
