import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly JWT_SECRET = 'clave_super_secreta';

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'];

    if (!auth) throw new UnauthorizedException('Token requerido');
    const token = auth.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      req.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
