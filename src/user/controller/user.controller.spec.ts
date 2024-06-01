import { Test, TestingModule } from '@nestjs/testing';
import { userMocks } from '../mocks/user.mocks';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserController } from './user.controller';
import { userServiceMock } from '../mocks/user.service.mock';
import { AuthService } from '../../auth/service/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

describe('Test User Service', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserController,
        AuthService,
        PrismaService,
        JwtService,
        userServiceMock,
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  test('validate user service definition', () => {
    expect(userController).toBeDefined();
  });

  describe('create user', () => {
    test('it should create user', async () => {
      const body: CreateUserDTO = {
        id: 1,
        name: 'João Maria',
        email: 'joao.maria@email.com',
        dateOfBirth: '23/12/1999',
        password: '123456',
        role: 1,
      };

      const createdUser = await userController.create(body);

      expect(createdUser).toEqual(userMocks[0]);
    });
  });

  describe('read all users', () => {
    test('it should return all users', async () => {
      const users = await userController.readAll({
        name: '',
        dateOfBirth: '',
        email: '',
      });

      expect(users).toEqual(userMocks);
    });
  });

  describe('read one user', () => {
    test('it should return specific user', async () => {
      const user = await userController.readOne(3);
      expect(user).toEqual(userMocks[2]);
    });
  });

  describe('patch user', () => {
    test('it should patch specific user', async () => {
      //
    });
  });

  describe('update user', () => {
    //
  });

  describe('delete user', () => {
    //
  });
});
