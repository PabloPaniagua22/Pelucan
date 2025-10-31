import { Module } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ServicioService, PrismaService],
  controllers: [ServicioController],
})
export class ServicioModule {}
