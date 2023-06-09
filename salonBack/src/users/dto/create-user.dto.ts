import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPostalCode,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  telephone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  adresse: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ville: string;

  @ApiProperty()
  @IsPostalCode('any')
  @IsNotEmpty()
  codepostal: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  admin: boolean;

  @ApiProperty()
  @IsOptional()
  avatar: string;
}
