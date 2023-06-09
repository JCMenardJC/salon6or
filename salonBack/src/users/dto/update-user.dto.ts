import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsEmail,
  IsPostalCode,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  prenom: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nom: string;

  /*   @ApiProperty()
  @IsOptional()
  @IsString()
  pseudo: string; */

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  telephone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  adresse: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ville: string;

  @ApiProperty()
  @IsOptional()
  @IsPostalCode('any')
  codepostal: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  admin: boolean;
}
