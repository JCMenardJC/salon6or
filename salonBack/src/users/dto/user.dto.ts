import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommandeDto } from '../../commande/dto/commande.dto';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  prenom: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nom: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telephone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  adresse: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ville: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codepostal: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  admin: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({ type: [CommandeDto] })
  @IsOptional()
  commandes: CommandeDto[];
}
