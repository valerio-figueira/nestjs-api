import { IsOptional, IsString, IsEmail, IsDateString } from 'class-validator';

export class UserQueriesDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;
}
