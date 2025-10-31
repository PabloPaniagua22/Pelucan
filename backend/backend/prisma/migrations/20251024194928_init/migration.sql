-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `contraseña` VARCHAR(191) NOT NULL,
    `rol` ENUM('admin', 'cliente') NOT NULL DEFAULT 'cliente',
    `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servicio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `duracion` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `hora` VARCHAR(191) NOT NULL,
    `estado` ENUM('pendiente', 'confirmado', 'cancelado', 'completado') NOT NULL DEFAULT 'pendiente',
    `usuario_id` INTEGER NOT NULL,
    `servicio_id` INTEGER NOT NULL,
    `creado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monto` DOUBLE NOT NULL,
    `metodo` ENUM('efectivo', 'tarjeta', 'transferencia') NOT NULL,
    `fecha_pago` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `turno_id` INTEGER NOT NULL,

    UNIQUE INDEX `Pago_turno_id_key`(`turno_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Turno` ADD CONSTRAINT `Turno_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turno` ADD CONSTRAINT `Turno_servicio_id_fkey` FOREIGN KEY (`servicio_id`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_turno_id_fkey` FOREIGN KEY (`turno_id`) REFERENCES `Turno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
