// models/carritoModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un carrito para un usuario (si aún no tiene uno)
export const crearCarrito = async (id_usuario) => {
  return await prisma.carrito.create({
    data: { id_usuario },
  });
};

// Obtener el carrito de un usuario por su ID de usuario
export const obtenerCarritoPorUsuarioId = async (id_usuario) => {
  return await prisma.carrito.findUnique({
    where: { id_usuario },
    include: {
      productos: {
        include: {
          producto: true, // Incluye los detalles del producto
        },
      },
    },
  });
};

// Agregar un producto al carrito
export const agregarProductoAlCarrito = async (
  id_carrito,
  id_producto,
  cantidad
) => {
  return await prisma.carritoProducto.upsert({
    where: { id_carrito_id_producto: { id_carrito, id_producto } },
    update: { cantidad: { increment: cantidad } },
    create: { id_carrito, id_producto, cantidad },
  });
};

// Actualizar la cantidad de un producto en el carrito
export const actualizarCantidadProducto = async (
  id_carrito,
  id_producto,
  cantidad
) => {
  return await prisma.carritoProducto.update({
    where: { id_carrito_id_producto: { id_carrito, id_producto } },
    data: { cantidad },
  });
};

// Eliminar un producto del carrito
export const eliminarProductoDelCarrito = async (id_carrito, id_producto) => {
  return await prisma.carritoProducto.delete({
    where: { id_carrito_id_producto: { id_carrito, id_producto } },
  });
};

// Vaciar el carrito
export const vaciarCarrito = async (id_carrito) => {
  return await prisma.carritoProducto.deleteMany({
    where: { id_carrito },
  });
};
