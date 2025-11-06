import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { pago } from '@prisma/client';

@Injectable()
export class PagoService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<pago[]> {
    return this.prisma.pago.findMany({
      include: { turno: true },
    });
  }

  async findOne(id: number): Promise<pago> {
    const pago = await this.prisma.pago.findUnique({
      where: { id },
      include: { turno: true },
    });
    if (!pago) throw new NotFoundException('Pago no encontrado');
    return pago;
  }

  async create(data: pago): Promise<pago> {
    if (!data.monto || !data.metodo) {
      throw new BadRequestException('Monto y método de pago son obligatorios');
    }

    return this.prisma.pago.create({ data });
  }

  async update(id: number, data: pago): Promise<pago> {
    const existe = await this.prisma.pago.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException('Pago no encontrado');

    return this.prisma.pago.update({ where: { id }, data });
  }

  async delete(id: number): Promise<pago> {
    const existe = await this.prisma.pago.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException('Pago no encontrado');

    return this.prisma.pago.delete({ where: { id } });
  }
}
