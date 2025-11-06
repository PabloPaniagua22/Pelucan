import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import * as client from '@prisma/client';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll(): Promise<client.usuario[]> {
    return this.usuarioService.findAll();
  }
  @Get('search')
  async search(@Query('nombre') nombre: string) {
    return this.usuarioService.searchByNombre(nombre);
  }

  @Post()
  create(@Body() data: client.usuario): Promise<client.usuario> {
    return this.usuarioService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: client.usuario,
  ): Promise<client.usuario> {
    return this.usuarioService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<client.usuario> {
    return this.usuarioService.delete(Number(id));
  }
}
