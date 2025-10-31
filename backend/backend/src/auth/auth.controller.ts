import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registro')
  registrar(@Body() data: any) {
    return this.authService.registrar(data);
  }

  @Post('login')
  login(@Body() data: { correo: string; contraseña: string }) {
    return this.authService.login(data.correo, data.contraseña);
  }

  @Get('verificar')
  verificar(@Headers('authorization') auth: string) {
    const token = auth?.replace('Bearer ', '');
    return this.authService.verificarToken(token);
  }
}
