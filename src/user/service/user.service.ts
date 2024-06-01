import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { PatchUserDTO } from '../dto/patch-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserRepository } from '../repository/user.repository';
import { UserQueriesDTO } from '../dto/user-queries.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDTO) {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return this.userRepository.create(data);
  }

  async readAll(queries: UserQueriesDTO) {
    return this.userRepository.readAll(queries);
  }

  async readOne(id: number) {
    return this.userRepository.readOne(id);
  }

  async patch(id: number, data: PatchUserDTO) {
    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    return this.userRepository.patch(id, data);
  }

  async update(id: number, data: UpdateUserDTO) {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return this.userRepository.update(id, data);
  }

  async delete(id: number) {
    return this.userRepository.delete(id);
  }

  async exists(id: number): Promise<void | NotFoundException> {
    if (!(await this.userRepository.exists(id))) {
      throw new NotFoundException('Usuário não existe!');
    }
  }
}
