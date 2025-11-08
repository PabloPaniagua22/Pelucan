/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async obtenerPorId(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: {
        mascota: true,
        turno: true,
      },
    });
  }

  async validarUsuario(correo: string, password: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) return null;

    // Verifica contraseña encriptada
    const passwordValida = await bcrypt.compare(password, usuario.contrasena);
    if (!passwordValida) return null;

    return usuario;
  }

  async findAll(): Promise<usuario[]> {
    return this.prisma.usuario.findMany();
  }
  async searchByNombre(nombre: string) {
    return this.prisma.usuario.findMany({
      where: { nombre: { contains: nombre } },
      select: { id: true, nombre: true, apellido: true },
    });
  }

  async create(data: usuario): Promise<usuario> {
    // 1️⃣ Validación de correo
    const existeCorreo = await this.prisma.usuario.findUnique({
      where: { correo: data.correo },
    });
    if (existeCorreo) {
      throw new BadRequestException('El correo ya está registrado');
    }

    // 2️⃣ Validación de teléfono (opcional)
    if (data.telefono && !/^\+?\d{7,15}$/.test(data.telefono)) {
      throw new BadRequestException(
        'El teléfono debe tener entre 7 y 15 dígitos y solo números',
      );
    }

    // 3️⃣ Validación de contraseña
    if (!data.contrasena || data.contrasena.length < 8) {
      throw new BadRequestException(
        'La contraseña debe tener al menos 8 caracteres',
      );
    }

    // 4️⃣ Hashear contraseña
    const hashed = await bcrypt.hash(data.contrasena, 10);

    // 5️⃣ Crear usuario
    try {
      const usuario = await this.prisma.usuario.create({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
          telefono: data.telefono,
          contrasena: hashed,
        },
      });
      return usuario;
    } catch (error: any) {
      // Manejar errores de unicidad por si Prisma lanza P2002
      if (error.code === 'P2002' && error.meta?.target === 'correo') {
        throw new BadRequestException('El correo ya está registrado');
      }
      throw error;
    }
  }

  async update(id: number, data: usuario): Promise<usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<usuario> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
