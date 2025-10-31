import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import * as client from '@prisma/client';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll(): Promise<client.Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Post()
  create(@Body() data: client.Usuario): Promise<client.Usuario> {
    return this.usuarioService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: client.Usuario,
  ): Promise<client.Usuario> {
    return this.usuarioService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<client.Usuario> {
    return this.usuarioService.delete(Number(id));
  }
}
