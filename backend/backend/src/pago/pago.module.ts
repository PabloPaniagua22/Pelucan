import { Module } from '@nestjs/common';
import { PagoController } from './pago.controller';
import { PagoService } from './pago.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PagoController],
  providers: [PagoService, PrismaService],
})
export class PagoModule {}
