import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicioService {
  constructor(private prisma: PrismaService) {}

  async crearServicio(data: Prisma.ServicioCreateInput) {
    return this.prisma.servicio.create({ data });
  }

  async listarServicios() {
    return this.prisma.servicio.findMany();
  }

  async buscarServicioPorId(id: number) {
    return this.prisma.servicio.findUnique({ where: { id } });
  }

  async actualizarServicio(id: number, data: Prisma.ServicioUpdateInput) {
    return this.prisma.servicio.update({
      where: { id },
      data,
    });
  }

  async eliminarServicio(id: number) {
    return this.prisma.servicio.delete({ where: { id } });
  }
}
