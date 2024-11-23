import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Registro de usuario
export const registrarUsuario = async (data) => {
  const { nombre, correo, password, rol } = data;

  return await prisma.usuario.create({
    data: {
      nombre,
      correo,
      password,
      rol,
    },
  });
};

// Login de usuario
export const loginUsuario = async (correo, password) => {
  const usuario = await prisma.usuario.findUnique({ where: { correo } });

  if (!usuario || usuario.password !== password) {
    throw new Error("Credenciales incorrectas");
  }

  return usuario;
};

export const obtenerTodosUsuarios = async () => {
  return await prisma.usuario.findMany();
};
