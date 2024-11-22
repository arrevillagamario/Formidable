// controllers/carritoController.js
import * as carritoModel from "../Models/carritoModel.js";

// Controlador para obtener el carrito de un usuario
export const obtenerCarrito = async (req, res) => {
  const id_usuario = parseInt(req.params.id_usuario);

  try {
    const carrito = await carritoModel.obtenerCarritoPorUsuarioId(id_usuario);
    if (!carrito) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

// Controlador para agregar un producto al carrito
export const agregarProducto = async (req, res) => {
  const { id_usuario, id_producto, cantidad } = req.body;

  try {
    let carrito = await carritoModel.obtenerCarritoPorUsuarioId(id_usuario);
    if (!carrito) {
      carrito = await carritoModel.crearCarrito(id_usuario);
    }

    const productoEnCarrito = await carritoModel.agregarProductoAlCarrito(
      carrito.id_usuario,
      id_producto,
      cantidad
    );

    res.status(201).json(productoEnCarrito);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
};

// Controlador para actualizar la cantidad de un producto en el carrito
export const actualizarCantidadProducto = async (req, res) => {
  const { id_usuario, id_producto, cantidad } = req.body;

  try {
    const carrito = await carritoModel.obtenerCarritoPorUsuarioId(id_usuario);
    if (!carrito) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const productoActualizado = await carritoModel.actualizarCantidadProducto(
      carrito.id_usuario,
      id_producto,
      cantidad
    );

    res.json(productoActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar la cantidad del producto" });
  }
};

// Controlador para eliminar un producto del carrito
export const eliminarProducto = async (req, res) => {
  const { id_usuario, id_producto } = req.body;

  try {
    const carrito = await carritoModel.obtenerCarritoPorUsuarioId(id_usuario);
    if (!carrito) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    await carritoModel.eliminarProductoDelCarrito(
      carrito.id_usuario,
      id_producto
    );
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el producto del carrito" });
  }
};

// Controlador para vaciar el carrito de un usuario
export const vaciarCarrito = async (req, res) => {
  const id_usuario = parseInt(req.params.id_usuario);

  try {
    const carrito = await carritoModel.obtenerCarritoPorUsuarioId(id_usuario);
    if (!carrito) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    await carritoModel.vaciarCarrito(carrito.id_usuario);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al vaciar el carrito" });
  }
};
