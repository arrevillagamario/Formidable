/*
  Warnings:

  - The primary key for the `Carrito` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_carrito` on the `Carrito` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarritoProducto" DROP CONSTRAINT "CarritoProducto_id_carrito_fkey";

-- DropIndex
DROP INDEX "Carrito_id_usuario_key";

-- AlterTable
ALTER TABLE "Carrito" DROP CONSTRAINT "Carrito_pkey",
DROP COLUMN "id_carrito",
ADD CONSTRAINT "Carrito_pkey" PRIMARY KEY ("id_usuario");

-- AddForeignKey
ALTER TABLE "CarritoProducto" ADD CONSTRAINT "CarritoProducto_id_carrito_fkey" FOREIGN KEY ("id_carrito") REFERENCES "Carrito"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
