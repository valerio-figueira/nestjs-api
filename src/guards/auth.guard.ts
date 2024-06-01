import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const token = (authorization ?? '').split(' ')[1];

      if (!token) throw new BadRequestException('Token Inválido!');

      const payload = this.authService.testToken(token);

      request.tokenPayload = payload;

      return true;
    } catch (error) {
      return false;
    }
  }
}
