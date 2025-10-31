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

  @Get()
  obtenerTodos() {
    return this.turnoService.listarTurnos();
  }

  @Post()
  crear(@Body() data: any) {
    return this.turnoService.crearTurno(data);
  }

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
}
