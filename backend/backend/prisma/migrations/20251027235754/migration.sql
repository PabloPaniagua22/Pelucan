/*
  Warnings:

  - You are about to alter the column `estado` on the `turno` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `turno` MODIFY `estado` ENUM('Pendiente', 'Confirmado', 'Cancelado', 'Completado') NOT NULL DEFAULT 'Pendiente';
