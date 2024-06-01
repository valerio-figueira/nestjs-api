import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from '../../enums/role.enum';

export class CreateUserDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 4,
    minLowercase: 0,
    minNumbers: 2,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsEnum(Role)
  role: number;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
