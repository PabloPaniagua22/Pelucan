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

  async findAll(): Promise<mascota[]> {
    try {
      return await this.prisma.mascota.findMany({
        include: { usuario: true },
      });
    } catch (error: unknown) {
      // Puedes loguear el error si quieres
      console.error(error);
      throw new InternalServerErrorException('Error al obtener mascotas');
    }
  }

  async create(data: MascotaDto): Promise<mascota> {
    if (!data.nombre || !data.especie || !data.dueno_id) {
      throw new BadRequestException('Faltan datos obligatorios');
    }
    try {
      return await this.prisma.mascota.create({ data });
    } catch {
      throw new InternalServerErrorException('Error al crear mascota');
    }
  }

  async update(id: number, data: Partial<MascotaDto>): Promise<mascota> {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('Datos vacíos');
    }
    try {
      return await this.prisma.mascota.update({ where: { id }, data });
    } catch {
      throw new InternalServerErrorException('Error al actualizar mascota');
    }
  }

  async delete(id: number): Promise<mascota> {
    try {
      return await this.prisma.mascota.delete({ where: { id } });
    } catch {
      throw new InternalServerErrorException('Error al eliminar mascota');
    }
  }
}
