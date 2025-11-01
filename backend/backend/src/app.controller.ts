import { Controller, Get, Res } from '@nestjs/common';
import express from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  getRoot(@Res() res: express.Response) {
    // Servir el login del admin como página principal
    return res.sendFile(join(process.cwd(), 'src', 'admin', 'login.html'));
  }
}
