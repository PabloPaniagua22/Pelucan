import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // ✅ Usa cookie-parser correctamente tipado
  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://127.0.0.1:5500',
      'http://localhost:5500',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // ✅ Middleware tipado y seguro para proteger /admin/*
  app.use('/admin', (req: Request, res: Response, next: NextFunction): void => {
    if (req.cookies?.admin_auth === 'true' || req.path === '/login.html') {
      next();
    } else {
      res.redirect('/admin/login.html');
    }
  });

  // ✅ Servir archivos estáticos desde la carpeta /admin
  app.use('/admin', express.static(join(process.cwd(), 'src', 'admin')));

  await app.listen(3000);
  console.log('🚀 Servidor corriendo en http://localhost:3000');
}

bootstrap();
