import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { mascota } from '@prisma/client';
import { MascotaDto } from './mascota.dto';

@Injectable()
export class MascotaService {
  constructor(private prisma: PrismaService) {}

  // Traer todas las mascotas con el dueño incluido
  async findAll(): Promise<mascota[]> {
    try {
      return await this.prisma.mascota.findMany({
        include: { usuario: true },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al obtener mascotas');
    }
  }

  // Crear mascota conectando al dueño
  async create(data: MascotaDto): Promise<mascota> {
    if (!data.nombre || !data.especie || !data.dueno_id) {
      throw new BadRequestException('Faltan datos obligatorios');
    }
    try {
      return await this.prisma.mascota.create({
        data: {
          nombre: data.nombre,
          especie: data.especie,
          raza: data.raza ?? null,
          edad: data.edad ?? null,
          dueno_id: data.dueno_id,
        },
        include: { usuario: true },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al crear mascota');
    }
  }

  // Actualizar mascota
  async update(id: number, data: Partial<MascotaDto>): Promise<mascota> {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('Datos vacíos');
    }
    try {
      return await this.prisma.mascota.update({
        where: { id },
        data: {
          ...data,
          dueno_id: data.dueno_id ?? undefined, // usar el campo directo
        },
        include: { usuario: true },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al actualizar mascota');
    }
  }

  // Eliminar mascota
  async delete(id: number): Promise<mascota> {
    try {
      return await this.prisma.mascota.delete({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar mascota');
    }
  }

  // Obtener mascotas de un usuario
  async obtenerPorUsuario(dueno_id: number): Promise<mascota[]> {
    try {
      return await this.prisma.mascota.findMany({
        where: { dueno_id },
        include: { usuario: true },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error al obtener mascotas del usuario',
      );
    }
  }
}
