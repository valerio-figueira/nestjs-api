import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { PatchUserDTO } from '../dto/patch-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserQueriesDTO } from '../dto/user-queries.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        role: true,
        dateOfBirth: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async readAll(queries: UserQueriesDTO) {
    const where: UserQueriesDTO = {};

    if (queries.name) where.name = queries.name;
    if (queries.email) where.email = queries.email;
    if (queries.dateOfBirth) where.dateOfBirth = queries.dateOfBirth;

    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        role: true,
        dateOfBirth: true,
        createdAt: true,
        updatedAt: true,
      },
      where,
    });
  }

  async readOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        role: true,
        dateOfBirth: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async patch(id: number, data: PatchUserDTO) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        role: true,
        dateOfBirth: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: number, data: UpdateUserDTO) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        role: true,
        dateOfBirth: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async exists(id: number): Promise<number> {
    return this.prisma.user.count({
      where: { id },
    });
  }
}
