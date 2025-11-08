import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { TurnoService } from './turno.service';

@Controller('turnos')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  // ✅ Obtener todos los turnos
  @Get()
  obtenerTodos() {
    return this.turnoService.listarTurnos();
  }
  // ✅ Crear un turno
  @Post()
  crear(@Body() data: any) {
    return this.turnoService.crearTurno(data);
  }
  // ✅ Obtener un turno por ID
  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.turnoService.buscarTurnoPorId(Number(id));
  }

  @Put(':id')
  async actualizar(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.turnoService.actualizarTurno(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.turnoService.eliminarTurno(Number(id));
  }

  // 🔹 Turnos activos de un usuario
  @Get('usuario/:id')
  async obtenerTurnosPorUsuario(@Param('id') id: string) {
    return this.turnoService.obtenerTurnosPorUsuario(Number(id));
  }

  // 🔹 Historial de turnos completados
  @Get('historial/:id')
  async obtenerHistorialPorUsuario(@Param('id') id: string) {
    return this.turnoService.obtenerHistorialPorUsuario(Number(id));
  }
}
