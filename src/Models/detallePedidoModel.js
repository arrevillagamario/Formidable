// models/detallePedidoModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const agregarDetallePedido = async (data) => {
  return await prisma.detallePedido.create({ data });
};

export const obtenerDetallesPorPedido = async (id_pedido) => {
  return await prisma.detallePedido.findMany({
    where: { id_pedido },
    include: {
      producto: true,
    },
  });
};

export const eliminarDetallePedido = async (id_detalle) => {
  return await prisma.detallePedido.delete({ where: { id_detalle } });
};
