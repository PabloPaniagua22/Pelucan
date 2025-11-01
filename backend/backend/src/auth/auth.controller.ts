import { Controller, Post, Body, Res } from '@nestjs/common';
import express from 'express';

interface LoginDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  private readonly adminUser = {
    username: 'adminPelu',
    password: 'adminPelucan', // 🔐 Podés mover esto a .env más adelante
  };

  @Post('login')
  login(@Body() body: LoginDto, @Res() res: express.Response) {
    const { username, password } = body;

    if (
      username === this.adminUser.username &&
      password === this.adminUser.password
    ) {
      // ✅ Guardamos cookie segura
      res.cookie('admin_auth', 'true', { httpOnly: true });
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  }

  @Post('logout')
  logout(@Res() res: express.Response) {
    res.clearCookie('admin_auth');
    return res.status(200).json({ message: 'Sesión cerrada' });
  }
}
