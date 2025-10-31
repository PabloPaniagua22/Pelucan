import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EstadoTurno } from '@prisma/client';

interface TurnoDto {
  fecha: string;
  hora: string;
  estado: string;
  usuario_id: number;
  servicio_id: number;
}

@Injectable()
export class TurnoService {
  constructor(private prisma: PrismaService) {}

  // Crear turno
  async crearTurno(data: TurnoDto) {
    if (!data.fecha || isNaN(Date.parse(data.fecha)))
      throw new BadRequestException('Fecha inválida');
    if (!data.estado) throw new BadRequestException('Estado es requerido');

    const estadoEnum = EstadoTurno[data.estado as keyof typeof EstadoTurno];
    if (!estadoEnum) throw new BadRequestException('Estado inválido');

    return this.prisma.turno.create({
      data: {
        fecha: new Date(data.fecha),
        hora: data.hora,
        estado: estadoEnum,
        usuario_id: Number(data.usuario_id),
        servicio_id: Number(data.servicio_id),
      },
    });
  }

  // Listar todos los turnos
  async listarTurnos() {
    return this.prisma.turno.findMany({
      include: { usuario: true, servicio: true },
    });
  }

  // Buscar por ID
  async buscarTurnoPorId(id: number) {
    return this.prisma.turno.findUnique({
      where: { id },
      include: { usuario: true, servicio: true },
    });
  }

  // Actualizar turno
  async actualizarTurno(id: number, data: TurnoDto) {
    if (!data.fecha || isNaN(Date.parse(data.fecha)))
      throw new BadRequestException('Fecha inválida');
    if (!data.estado) throw new BadRequestException('Estado es requerido');

    const estadoEnum = EstadoTurno[data.estado as keyof typeof EstadoTurno];
    if (!estadoEnum) throw new BadRequestException('Estado inválido');

    return this.prisma.turno.update({
      where: { id },
      data: {
        fecha: new Date(data.fecha),
        hora: data.hora,
        estado: estadoEnum,
        usuario_id: Number(data.usuario_id),
        servicio_id: Number(data.servicio_id),
      },
    });
  }

  // Eliminar turno
  async eliminarTurno(id: number) {
    return this.prisma.turno.delete({ where: { id } });
  }
}
