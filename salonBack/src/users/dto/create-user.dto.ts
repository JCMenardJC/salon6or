import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPostalCode,
  IsOptional,
  IsBoolean,
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
  @IsString()
  @IsNotEmpty()
  pseudo: string;

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
