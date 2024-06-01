import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDTO } from '../dtos/auth-login.dto';
import { AuthRegisterDTO } from '../dtos/auth-register.dto';
import { AuthForgetDTO } from '../dtos/auth.forget.dto';
import { AuthResetDTO } from '../dtos/auth-reset.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @Post('check-auth')
  async checkAuth(@Body() { token }: { token: string }) {
    return this.authService.testToken(token);
  }
}
