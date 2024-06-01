import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDTO } from '../../user/dto/create-user.dto';
import { UserService } from '../../user/service/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          sub: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        {
          expiresIn: '7 days',
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  testToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
        secret: String(process.env.JWT_SECRET),
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais incorretas!');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciais incorretas!');
    }

    // TO DO: Enviar e-mail...

    return this.createToken(user);
  }

  async forget(email: string) {
    //
  }

  async reset(password: string, token: string) {
    // TO DO: Validar o token...

    const id = 0;

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }

  async register(user: CreateUserDTO) {
    const exists = await this.userService.readAll({ email: user.email });

    if (exists.length > 0) {
      throw new BadRequestException('O e-mail já está registrado.');
    }

    return this.userService.create(user);
  }
}
