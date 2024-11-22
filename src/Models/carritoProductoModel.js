// models/carritoProductoModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const agregarProductoAlCarrito = async (data) => {
  return await prisma.carritoProducto.create({ data });
};

export const actualizarCantidadProductoEnCarrito = async (
  id_carrito,
  id_producto,
  cantidad
) => {
  return await prisma.carritoProducto.update({
    where: { id_carrito_id_producto: { id_carrito, id_producto } },
    data: { cantidad },
  });
};

export const eliminarProductoDelCarrito = async (id_carrito, id_producto) => {
  return await prisma.carritoProducto.delete({
    where: { id_carrito_id_producto: { id_carrito, id_producto } },
  });
};
