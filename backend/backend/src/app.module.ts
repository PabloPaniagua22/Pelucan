import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ServicioModule } from './servicio/servicio.module';
import { TurnoModule } from './turno/turno.module';
import { AuthModule } from './auth/auth.module';
import { PersonalService } from './personal/personal.service';
import { PersonalController } from './personal/personal.controller';
import { MascotaService } from './mascota/mascota.service';
import { MascotaController } from './mascota/mascota.controller';
import { PagoModule } from './pago/pago.module';
import { PrismaModule } from './prisma/prisma.module';
import { MascotaModule } from './mascota/mascota.module';

@Module({
  imports: [
    UsuarioModule,
    ServicioModule,
    TurnoModule,
    AuthModule,
    PagoModule,
    PrismaModule,
    MascotaModule,
  ],
  controllers: [AppController, PersonalController, MascotaController],
  providers: [AppService, PersonalService, MascotaService],
})
export class AppModule {}
