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
import * as express from 'express';
import { Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { LoginUsuarioDto } from './login-usuario.dto';

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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usuarioService.obtenerPorId(Number(id));
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

  @Post('login')
  async loginUsuario(
    @Body() body: LoginUsuarioDto,
    @Res() res: express.Response,
  ) {
    const { correo, contrasena } = body;
    const usuario = await this.usuarioService.validarUsuario(
      correo,
      contrasena,
    );

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Guardar cookie de sesión
    res.cookie('usuario_auth', usuario.id, { httpOnly: true });
    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
    });
  }
}
