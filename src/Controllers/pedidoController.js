import {
  crearPedido,
  obtenerPedidoPorId,
  listarPedidos,
  listarPedidosPorUsuario, // Nueva función
  actualizarPedido,
  eliminarPedido,
  cambiarEstadoPedido,
  listarPedidosPendientes,
} from "../models/pedidoModel.js";

// Crear un nuevo pedido
export const crearNuevoPedido = async (req, res) => {
  const { id_usuario, DetallePedido } = req.body;

  try {
    const nuevoPedido = await crearPedido({ id_usuario, DetallePedido });
    res.status(201).json({
      message: "Pedido creado con éxito.",
      pedido: nuevoPedido,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el pedido", details: error.message });
  }
};

// Obtener un pedido por su ID
export const obtenerPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await obtenerPedidoPorId(parseInt(id));
    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el pedido", details: error.message });
  }
};

// Listar todos los pedidos
export const listarTodosLosPedidos = async (req, res) => {
  try {
    const pedidos = await listarPedidos();
    res.status(200).json(pedidos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al listar los pedidos", details: error.message });
  }
};

// Listar pedidos de un usuario por ID
export const listarPedidosDeUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const pedidos = await listarPedidosPorUsuario(parseInt(idUsuario));
    if (pedidos.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron pedidos para este usuario." });
    }
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({
      error: "Error al listar los pedidos del usuario",
      details: error.message,
    });
  }
};

// Actualizar un pedido
export const actualizarPedidoController = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const pedidoActualizado = await actualizarPedido(parseInt(id), data);
    res.status(200).json({
      message: "Pedido actualizado con éxito.",
      pedido: pedidoActualizado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar el pedido", details: error.message });
  }
};

// Eliminar un pedido
export const eliminarPedidoController = async (req, res) => {
  const { id } = req.params;

  try {
    await eliminarPedido(parseInt(id));
    res.status(200).json({ message: "Pedido eliminado con éxito." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el pedido", details: error.message });
  }
};

// Cambiar estado del pedido
export const cambiarEstado = async (req, res) => {
  const { id } = req.params;
  const { nuevoEstado } = req.body;

  try {
    const pedidoActualizado = await cambiarEstadoPedido(
      parseInt(id),
      nuevoEstado
    );
    res.status(200).json({
      message: `El estado del pedido se ha actualizado a '${nuevoEstado}'.`,
      pedido: pedidoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al cambiar el estado del pedido",
      details: error.message,
    });
  }
};
export const listarPedidosPendientesController = async (req, res) => {
  try {
    const pedidosPendientes = await listarPedidosPendientes();
    res.status(200).json(pedidosPendientes);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al listar los pedidos pendientes",
        details: error.message,
      });
  }
};
