import * as productoModel from "../Models/productoModel.js";

export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, stock, id_categoria } = req.body;
    const imagen_url = req.file?.path || null;

    const nuevoProducto = await productoModel.crearProducto({
      nombre,
      precio: parseFloat(precio),
      descripcion,
      stock: parseInt(stock),
      id_categoria: parseInt(id_categoria),
      imagen_url,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const obtenerProducto = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const producto = await productoModel.obtenerProductoPorId(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { nombre, precio, descripcion, stock, id_categoria } = req.body;
    const imagen_url = req.file?.path || null;

    const productoActualizado = await productoModel.actualizarProducto(id, {
      nombre,
      precio: parseFloat(precio),
      descripcion,
      stock: parseInt(stock),
      id_categoria: parseInt(id_categoria),
      imagen_url,
    });

    res.json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await productoModel.eliminarProducto(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const obtenerTodosProductos = async (req, res) => {
  try {
    const productos = await productoModel.obtenerTodosProductos();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const filtrarProductosPorCategoria = async (req, res) => {
  const { categoria } = req.params;

  if (isNaN(categoria)) {
    return res
      .status(400)
      .json({ error: "El id de la categoría debe ser un número" });
  }

  try {
    const productos = await productoModel.filtrarProductosPorCategoria(
      categoria
    );
    if (productos.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron productos para esta categoría" });
    }
    res.json(productos);
  } catch (error) {
    console.error("Error al filtrar productos por categoría:", error);
    res
      .status(500)
      .json({ error: "Error al filtrar los productos por categoría" });
  }
};
