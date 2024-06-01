import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './repository/user.repository';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check.middleware';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/service/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService, AuthService, AuthGuard],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
