import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async create(data: Usuario): Promise<Usuario> {
    return this.prisma.usuario.create({ data });
  }

  async update(id: number, data: Usuario): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
