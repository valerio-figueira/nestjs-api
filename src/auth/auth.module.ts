import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './service/auth.service';
import { UserService } from '../user/service/user.service';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET),
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
