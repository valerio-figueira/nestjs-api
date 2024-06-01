import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userRepositoryMock } from '../mocks/user.repository.mock';
import { userMocks, userPatchMock } from '../mocks/user.mocks';
import { CreateUserDTO } from '../dto/create-user.dto';

describe('Test User Service', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  test('validate user service definition', () => {
    expect(userService).toBeDefined();
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

      const createdUser = await userService.create(body);

      expect(createdUser).toEqual(userMocks[0]);
    });
  });

  describe('read all users', () => {
    test('it should return all users', async () => {
      const users = await userService.readAll({
        name: '',
        dateOfBirth: '',
        email: '',
      });

      expect(users).toEqual(userMocks);
    });
  });

  describe('read one user', () => {
    test('it should return specific user', async () => {
      const user = await userService.readOne(3);
      expect(user).toEqual(userMocks[2]);
    });
  });

  describe('patch user', () => {
    test('it should patch specific user', async () => {
      const user = await userService.patch(2, {
        id: 3,
        email: 'clara.dos.anjos@email.com',
        name: 'Clara dos Anjos',
        role: 2,
      });

      expect(user).toEqual(userPatchMock);
    });
  });

  describe('update user', () => {
    //
  });

  describe('delete user', () => {
    //
  });
});
