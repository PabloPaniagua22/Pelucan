import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { personal } from '@prisma/client';

@Injectable()
export class PersonalService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<personal[]> {
    return this.prisma.personal.findMany();
  }

  async create(data: personal): Promise<personal> {
    return this.prisma.personal.create({ data });
  }

  async update(id: number, data: personal): Promise<personal> {
    return this.prisma.personal.update({ where: { id }, data });
  }

  async delete(id: number): Promise<personal> {
    return this.prisma.personal.delete({ where: { id } });
  }
}
