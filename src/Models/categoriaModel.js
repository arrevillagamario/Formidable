// models/categoriaModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearCategoria = async (data) => {
  return await prisma.categoria.create({ data });
};

export const obtenerCategoriaPorId = async (id) => {
  return await prisma.categoria.findUnique({ where: { id_categoria: id } });
};

export const actualizarCategoria = async (id, data) => {
  return await prisma.categoria.update({
    where: { id_categoria: id },
    data,
  });
};

export const eliminarCategoria = async (id) => {
  return await prisma.categoria.delete({ where: { id_categoria: id } });
};

export const obtenerTodasCategorias = async () => {
  return await prisma.categoria.findMany();
};

export const obtenerProductosPorCategoria = async (id_categoria) => {
  return await prisma.categoria.findUnique({
    where: { id_categoria },
    include: {
      productos: true, // Incluye los productos asociados a esta categoría
    },
  });
};
