import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { turno_estado } from '@prisma/client';

interface TurnoDto {
  fecha: string;
  hora: string;
  estado: string;
  usuario_id: number;
  servicio_id: number;
}

@Injectable()
export class TurnoService {
  turnoRepository: any;
  constructor(private prisma: PrismaService) {}

  // Crear turno
  async crearTurno(data: TurnoDto) {
    if (!data.fecha || isNaN(Date.parse(data.fecha)))
      throw new BadRequestException('Fecha inválida');
    if (!data.estado) throw new BadRequestException('Estado es requerido');

    const turnoEstado = turno_estado[data.estado as keyof typeof turno_estado];
    if (!turnoEstado) throw new BadRequestException('Estado inválido');

    return this.prisma.turno.create({
      data: {
        fecha: new Date(data.fecha),
        hora: data.hora,
        estado: turnoEstado,
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

    const turnoEstado = turno_estado[data.estado as keyof typeof turno_estado];
    if (!turnoEstado) throw new BadRequestException('Estado inválido');

    return this.prisma.turno.update({
      where: { id },
      data: {
        fecha: new Date(data.fecha),
        hora: data.hora,
        estado: turnoEstado,
        usuario_id: Number(data.usuario_id),
        servicio_id: Number(data.servicio_id),
      },
    });
  }

  // Eliminar turno
  async eliminarTurno(id: number) {
    return this.prisma.turno.delete({ where: { id } });
  }

  // ✅ Turnos activos del usuario
  async obtenerTurnosPorUsuario(id: number) {
    return this.prisma.turno.findMany({
      where: {
        usuario_id: id,
        estado: {
          in: ['Pendiente', 'Confirmado', 'Cancelado'], // o como lo nombres ('activo', 'reservado', etc.)
        },
      },
      include: {
        servicio: {
          select: {
            nombre: true,
          },
        },
      },
    });
  }

  // ✅ Historial de turnos completados
  async obtenerHistorialPorUsuario(id: number) {
    return this.prisma.turno.findMany({
      where: { usuario_id: id, estado: 'Completado' },
      include: {
        servicio: {
          select: {
            nombre: true,
          },
        },
      },
    });
  }
}
