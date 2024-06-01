import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_METADATA } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLE_METADATA,
      [context.getHandler(), context.getClass()],
    );
    console.log(requiredRoles);
    const req = context.switchToHttp().getRequest();
    const { tokenPayload } = req;

    if (!tokenPayload || !tokenPayload.role) {
      throw new BadRequestException('Função de usuário não encontrada!');
    }

    const hasPermission = requiredRoles.filter((role) => {
      return role == tokenPayload.role;
    });

    return hasPermission.length > 0;
  }
}
