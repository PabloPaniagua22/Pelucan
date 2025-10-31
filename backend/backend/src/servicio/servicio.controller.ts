import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ServicioService } from './servicio.service';

@Controller('servicios')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @Get()
  obtenerTodos() {
    return this.servicioService.listarServicios();
  }

  @Post()
  crear(@Body() data: any) {
    return this.servicioService.crearServicio(data);
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.servicioService.buscarServicioPorId(Number(id));
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() data: any) {
    return this.servicioService.actualizarServicio(Number(id), data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.servicioService.eliminarServicio(Number(id));
  }
}
