import { UserRepository } from '../repository/user.repository';
import { userMocks, userPatchMock } from './user.mocks';

export const userRepositoryMock = {
  provide: UserRepository,
  useValue: {
    create: jest.fn().mockResolvedValue(userMocks[0]),
    readAll: jest.fn().mockResolvedValue(userMocks),
    readOne: jest.fn().mockResolvedValue(userMocks[2]),
    patch: jest.fn().mockResolvedValue(userPatchMock),
    update: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  },
};
