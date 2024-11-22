import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearProducto = async (data) => {
  return await prisma.producto.create({ data });
};

export const obtenerProductoPorId = async (id) => {
  return await prisma.producto.findUnique({ where: { id_producto: id } });
};

export const actualizarProducto = async (id, data) => {
  return await prisma.producto.update({
    where: { id_producto: id },
    data,
  });
};

export const eliminarProducto = async (id) => {
  return await prisma.producto.delete({ where: { id_producto: id } });
};

export const obtenerTodosProductos = async () => {
  return await prisma.producto.findMany();
};

export const filtrarProductosPorCategoria = async (id_categoria) => {
  return await prisma.producto.findMany({
    where: {
      id_categoria: parseInt(id_categoria), // Asegúrate de convertir a número
    },
  });
};
