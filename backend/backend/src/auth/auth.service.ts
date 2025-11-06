import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface RegistrarDto {
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  contraseña: string;
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private readonly JWT_SECRET = 'clave_super_secreta'; // ⚠️ Cambiar por process.env.JWT_SECRET en producción

  // ✅ Registrar un nuevo usuario
  async registrar(data: RegistrarDto) {
    const existe = await this.prisma.usuario.findUnique({
      where: { correo: data.correo },
    });

    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const hashed = await bcrypt.hash(data.contraseña, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        telefono: data.telefono ?? null,
        contrasena: hashed,
      },
    });

    // No devolvemos la contraseña
    const { contrasena, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  }

  // ✅ Login de usuario
  async login(correo: string, contrasena: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!match) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre },
      this.JWT_SECRET,
      { expiresIn: '1h' },
    );

    return {
      token,
      nombre: usuario.nombre,
    };
  }

  // ✅ Verificar validez del token
  verificarToken(token: string) {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
