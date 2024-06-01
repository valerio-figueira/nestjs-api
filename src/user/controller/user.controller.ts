import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserDTO } from '../dto/create-user.dto';
import { PatchUserDTO } from '../dto/patch-user.dto';
import { UserService } from '../service/user.service';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserQueriesDTO } from '../dto/user-queries.dto';
import { LogInterceptor } from '../../interceptors/log.interceptor';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs/promises';
import * as path from 'path';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.Admin, Role.User)
  async readAll(@Query() queries: UserQueriesDTO) {
    return this.userService.readAll(queries);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.readOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  async create(@Body() data: CreateUserDTO) {
    const exists = await this.readAll({ email: data.email });

    if (exists.length > 0) {
      throw new BadRequestException('O e-mail já está registrado.');
    }

    return this.userService.create(data);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  async patch(
    @Body() data: PatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.userService.exists(id);

    return this.userService.patch(id, data);
  }

  @Put(':id')
  @Roles(Role.Admin, Role.User)
  async update(
    @Body() data: UpdateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.userService.exists(id);

    return this.userService.update(id, data);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.userService.exists(id);

    return this.userService.delete(id);
  }

  @Post(':id/upload-photo')
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 50 }),
        ],
      }),
    )
    photo: Express.Multer.File,
  ) {
    try {
      const file = path.join(
        __dirname,
        '../../../',
        'storage',
        'photo',
        `photo-${id}.png`,
      );

      await writeFile(file, photo.buffer);

      return { message: 'File uploaded!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
