import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user || !roles.includes(user.rol)) {
      throw new ForbiddenException('No autorizado');
    }

    return true;
  }
}
