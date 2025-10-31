import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private readonly JWT_SECRET = 'clave_super_secreta'; // ⚠️ usa process.env.JWT_SECRET en producción

  async registrar(data: any) {
    const existe = await this.prisma.usuario.findUnique({
      where: { correo: data.correo },
    });
    if (existe) throw new BadRequestException('El correo ya está registrado');

    const hashed = await bcrypt.hash(data.contraseña, 10);
    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        telefono: data.telefono,
        contraseña: hashed,
        rol: data.rol || 'Cliente',
      },
    });
    return usuario;
  }

  async login(correo: string, contraseña: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { correo } });
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) throw new UnauthorizedException('Credenciales inválidas');

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre },
      this.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token, rol: usuario.rol, nombre: usuario.nombre };
  }

  async verificarToken(token: string) {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
