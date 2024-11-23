import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un nuevo pedido con cálculo de total
export const crearPedido = async (data) => {
  const total = data.DetallePedido.reduce(
    (sum, detalle) => sum + detalle.cantidad * detalle.precio_unitario,
    0
  );

  return await prisma.pedido.create({
    data: {
      id_usuario: data.id_usuario,
      total: total,
      DetallePedido: {
        create: data.DetallePedido,
      },
    },
    include: {
      DetallePedido: true,
    },
  });
};

// Obtener un pedido por su ID
export const obtenerPedidoPorId = async (id) => {
  return await prisma.pedido.findUnique({
    where: { id_pedido: id },
    include: {
      DetallePedido: {
        include: {
          Producto: true,
        },
      },
    },
  });
};

// Listar todos los pedidos
export const listarPedidos = async () => {
  return await prisma.pedido.findMany({
    include: {
      Usuario: true,
      DetallePedido: {
        include: {
          Producto: true,
        },
      },
    },
  });
};

// Listar todos los pedidos de un usuario por su ID
export const listarPedidosPorUsuario = async (idUsuario) => {
  return await prisma.pedido.findMany({
    where: { id_usuario: idUsuario },
    include: {
      DetallePedido: {
        include: {
          Producto: true,
        },
      },
    },
  });
};

// Actualizar un pedido
export const actualizarPedido = async (id, data) => {
  let total = data.total;
  if (data.DetallePedido) {
    total = data.DetallePedido.reduce(
      (sum, detalle) => sum + detalle.cantidad * detalle.precio_unitario,
      0
    );
  }

  return await prisma.pedido.update({
    where: { id_pedido: id },
    data: {
      ...data,
      total: total,
    },
    include: {
      DetallePedido: true,
    },
  });
};

// Eliminar un pedido por su ID
export const eliminarPedido = async (id) => {
  return await prisma.pedido.delete({
    where: { id_pedido: id },
  });
};

// Cambiar estado del pedido (por ejemplo, a "Entregado" o "Cancelado")
export const cambiarEstadoPedido = async (id, nuevoEstado) => {
  return await prisma.pedido.update({
    where: { id_pedido: id },
    data: { estado: nuevoEstado },
  });
};

export const listarPedidosPendientes = async () => {
  return await prisma.pedido.findMany({
    where: { estado: "Pendiente" },
    include: {
      Usuario: true, // Incluye los datos del usuario
      DetallePedido: {
        include: {
          Producto: true, // Incluye los productos
        },
      },
    },
  });
};
