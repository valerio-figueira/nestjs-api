import { CreateUserDTO } from '../dto/create-user.dto';
import { PatchUserDTO } from '../dto/patch-user.dto';

export const userMocks: CreateUserDTO[] = [
  {
    id: 1,
    name: 'João Maria',
    email: 'joao.maria@email.com',
    dateOfBirth: '23/12/1999',
    password: '$2b$10$ewTpVxT2b76COVlA1yF2mOz0BHKoS2WKRWCBuG0wz0IcX72q99c8C',
    role: 1,
  },
  {
    id: 2,
    name: 'João Alves',
    email: 'joao.alves@email.com',
    dateOfBirth: '23/12/2010',
    password: '123456',
    role: 1,
  },
  {
    id: 3,
    name: 'Clara dos Anjos',
    email: 'clara@email.com',
    dateOfBirth: '23/10/205',
    password: '123456',
    role: 2,
  },
];

export const userPatchMock: PatchUserDTO = {
  id: 3,
  email: 'clara.dos.anjos@email.com',
  name: 'Clara dos Anjos',
  role: 2,
  dateOfBirth: null,
  createdAt: '2024-05-29T22:08:30.000Z',
  updatedAt: '2024-05-29T22:08:30.000Z',
};
