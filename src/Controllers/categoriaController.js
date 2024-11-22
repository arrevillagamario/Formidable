// controllers/categoriaController.js
import * as categoriaModel from "../Models/categoriaModel.js";

// Controlador para crear una nueva categoría
export const crearCategoria = async (req, res) => {
  try {
    const nuevaCategoria = await categoriaModel.crearCategoria(req.body);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

// Controlador para obtener una categoría por su ID
export const obtenerCategoria = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const categoria = await categoriaModel.obtenerCategoriaPorId(id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

export const obtenerProductosPorCategoria = async (req, res) => {
  const id_categoria = parseInt(req.params.id);

  try {
    const categoriaConProductos =
      await categoriaModel.obtenerProductosPorCategoria(id_categoria);

    if (!categoriaConProductos) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(categoriaConProductos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los productos de la categoría" });
  }
};

// Controlador para actualizar una categoría
export const actualizarCategoria = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const categoriaActualizada = await categoriaModel.actualizarCategoria(
      id,
      req.body
    );
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

// Controlador para eliminar una categoría
export const eliminarCategoria = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await categoriaModel.eliminarCategoria(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

// Controlador para obtener todas las categorías
export const obtenerTodasCategorias = async (req, res) => {
  try {
    const categorias = await categoriaModel.obtenerTodasCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};
