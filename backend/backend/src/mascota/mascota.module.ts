import { Module } from '@nestjs/common';
import { MascotaService } from './mascota.service';
import { MascotaController } from './mascota.controller';

@Module({
  controllers: [MascotaController],
  providers: [MascotaService],
})
export class MascotaModule {}
