import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [TurnoService, PrismaService],
  controllers: [TurnoController],
})
export class TurnoModule {}
