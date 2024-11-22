// models/pedidoModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearPedido = async (data) => {
  return await prisma.pedido.create({ data });
};

export const obtenerPedidoPorId = async (id) => {
  return await prisma.pedido.findUnique({ where: { id_pedido: id } });
};

export const actualizarPedido = async (id, data) => {
  return await prisma.pedido.update({
    where: { id_pedido: id },
    data,
  });
};

export const eliminarPedido = async (id) => {
  return await prisma.pedido.delete({ where: { id_pedido: id } });
};
